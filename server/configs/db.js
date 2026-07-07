import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database connected'));
        mongoose.connection.on('error', (error) => console.error('Database connection error:', error.message));

        const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quickshow';

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });
    } catch (error) {
        console.error('MongoDB connection failed.');
        console.error(error.message);
        console.error('If you are using MongoDB Atlas, allow your current IP address in Atlas Network Access or switch MONGODB_URI to a reachable MongoDB instance.');
    }
};

export default connectDB;