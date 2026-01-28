# AI-Assisted Internship & Job Application Tracker

A modern, production-ready MERN stack application designed to help students track their internship and job applications with AI-powered insights.

## 🚀 Features

- **Centralized Tracker**: Manage all your applications (Applied, Interview, Offer, Rejected) in one place.
- **AI Job Analyzer**: Paste any job description to extract key skills and see your matching percentage.
- **Interactive Dashboard**: Visualize your application progress with beautiful charts.
- **Mobile Support (PWA)**: Installable on your mobile device for on-the-go tracking.
- **Secure Auth**: JWT-based authentication for students and admins.

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS (v4), Lucide Icons, Chart.js, Framer Motion.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose.
- **AI/NLP**: NLP-based text analysis using Compromise.

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### Backend Setup
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your `MONGODB_URI` and `JWT_SECRET`.
4. (Optional) Seed the database: `node seed.js`
5. Start the server: `npm start` (or `npm run dev` with nodemon)

### Frontend Setup
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## 📱 Mobile Installation (PWA)
1. Open the website in your mobile browser.
2. Tap "Add to Home Screen" when prompted or via the browser menu.
3. The app will be available on your home screen with offline capabilities.

## 📂 Folder Structure
- `server/`: Express API, Mongoose models, AI logic.
- `client/`: React application, Tailwind styles, PWA config.

## 🎓 CSE Major Project
This project is designed for CSE final year students, focusing on scalability, clean code, and real-world utility.
