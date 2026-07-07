# CineBook

CineBook is a full-stack movie booking application built with the MERN stack. It lets users browse movies, view showtimes, choose seats, make bookings, and manage favorites, while admins can manage shows and bookings.

## Features

- User authentication and profile flow
- Browse movies and show listings
- Select seats and book tickets
- Favorites and booking history
- Admin dashboard for managing shows and bookings
- Payment integration support and email notifications

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Auth: Clerk
- Payments: Stripe
- Media: Cloudinary
- Emails: Nodemailer

## Project Structure

- client/: React frontend
- server/: Express backend

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/TheSatwiksss/CineBook.git
cd CineBook
```

### 2. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder with the required values for:

- MongoDB connection string
- Clerk keys
- Stripe keys
- Cloudinary credentials
- SMTP / email settings

### 4. Run the app

Start the backend:

```bash
cd server
npm run start
```

Start the frontend:

```bash
cd client
npm run dev
```

Open the frontend URL shown by Vite in your browser.

## License

This project is licensed under the MIT License.
