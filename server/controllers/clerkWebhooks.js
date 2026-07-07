import { Webhook } from "svix";
import { inngest } from "../inngest/index.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const signingSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!signingSecret) {
            return res.status(500).json({
                success: false,
                message: "CLERK_WEBHOOK_SECRET is not configured"
            });
        }

        const svixId = req.headers["svix-id"];
        const svixTimestamp = req.headers["svix-timestamp"];
        const svixSignature = req.headers["svix-signature"];

        if (!svixId || !svixTimestamp || !svixSignature) {
            return res.status(400).json({
                success: false,
                message: "Missing svix headers"
            });
        }

        const wh = new Webhook(signingSecret);
        const payload = req.body.toString("utf8");

        const evt = wh.verify(payload, {
            "svix-id": Array.isArray(svixId) ? svixId[0] : svixId,
            "svix-timestamp": Array.isArray(svixTimestamp) ? svixTimestamp[0] : svixTimestamp,
            "svix-signature": Array.isArray(svixSignature) ? svixSignature[0] : svixSignature,
        });

        const { type, data } = evt;
        const eventMap = {
            "user.created": "clerk/user.created",
            "user.deleted": "clerk/user.deleted",
            "user.updated": "clerk/user.updated"
        };

        const eventName = eventMap[type];

        if (!eventName) {
            return res.status(200).json({ success: true, message: `Ignored event: ${type}` });
        }

        await inngest.send({
            name: eventName,
            data: {
                id: data.id,
                first_name: data.first_name ?? "",
                last_name: data.last_name ?? "",
                email_addresses: data.email_addresses ?? [],
                image_url: data.image_url ?? ""
            }
        });

        return res.status(200).json({ success: true, message: `Processed ${type}` });
    } catch (error) {
        console.error("Clerk webhook error:", error.message);
        return res.status(400).json({ success: false, message: error.message });
    }
};
