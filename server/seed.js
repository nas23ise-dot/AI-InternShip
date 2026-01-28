const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');

dotenv.config();

const jobs = [
    {
        title: "Software Engineering Intern",
        company: "Google",
        location: "Mountain View, CA",
        description: "Work on large-scale distributed systems and innovative products.",
        type: "internship",
        requiredSkills: ["Java", "Python", "Go", "C++", "Distributed Systems"],
        experienceLevel: "Entry Level",
        status: "active"
    },
    {
        title: "Frontend Developer",
        company: "Meta",
        location: "Menlo Park, CA",
        description: "Build the next generation of social experiences using React.",
        type: "job",
        requiredSkills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"],
        experienceLevel: "Junior",
        status: "active"
    },
    {
        title: "Full Stack Developer",
        company: "Amazon",
        location: "Seattle, WA",
        description: "Design and implement customer-facing features on Amazon.com.",
        type: "job",
        requiredSkills: ["Node.js", "Express", "React", "AWS", "SQL"],
        experienceLevel: "Junior",
        status: "active"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        await Job.deleteMany({});
        await Job.insertMany(jobs);

        console.log("Database seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();
