🚀 AI-Powered Internship & Job Application Platform

A production-ready MERN stack application that helps students find internships, track applications, and receive AI-powered career guidance — all in one place.

🔗 Live Demo (Frontend):
👉 https://ai-internship-frontend.onrender.com

🔗 Backend API:
👉 https://ai-internship.onrender.com

🎯 Problem Statement

Students apply to multiple internships across platforms but struggle with:

Tracking application status

Understanding skill gaps from job descriptions

Getting personalized career guidance

This platform solves all three using AI + analytics + modern UI.

✨ Features
🔍 Live Job Search

Real-time job listings via RapidAPI (JSearch)

Filter by title, location, employment type

Save & track applied jobs

🤖 AI Job Analyzer

Paste any job description

Get skill match percentage

Identify missing skills

Download AI-generated PDF report

💬 AI Career Bot

Personalized career advice using Llama 3.3 (70B)

Career roadmap suggestions

Natural conversational guidance

📊 Application Tracker

Track applications in one dashboard

Status: Applied | Interview | Offer | Rejected

Visual insights with charts

🎨 Modern UI / UX

Dark / Light mode

Fully responsive design

Smooth animations (Framer Motion)

Glassmorphism UI

🛠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Framer Motion

Chart.js

Lucide React

Firebase Authentication & Storage

Backend

Node.js

Express.js

MongoDB Atlas + Mongoose

JWT Authentication

Groq AI (Llama 3.3 – 70B)

RapidAPI (JSearch)

AI Capabilities

Job description analysis

Skill extraction

Career advice generation

Personalized learning roadmaps

🏗 Project Architecture
AI-InternShip
│
├── client/                 # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
│
├── server/                 # Express backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & security
│   └── utils/              # AI & helper functions
│
└── README.md

⚙️ Environment Variables
Backend (server/.env)
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=jsearch.p.rapidapi.com

Frontend (client/.env)
VITE_API_BASE_URL=https://ai-internship.onrender.com
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

📦 Local Setup
Prerequisites

Node.js v18+

MongoDB Atlas

Firebase Project

Groq AI API key

RapidAPI key

Installation
git clone https://github.com/nas23ise-dot/AI-InternShip.git
cd AI-InternShip

Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev

🔐 Authentication Flow

Firebase handles login/signup

JWT secures backend APIs

Role-based access ready for future expansion

📈 Future Enhancements

Resume upload & AI resume scoring

Company-wise application analytics

Email notifications for status updates

Admin dashboard

ATS-style resume matching

🧠 Why This Project Stands Out

✔ Real AI usage (not dummy logic)
✔ Production deployment
✔ Clean architecture
✔ Resume-worthy MERN + AI integration

👨‍💻 Author

Naveen S
CSE Student | MERN Stack Developer | AI Enthusiast
