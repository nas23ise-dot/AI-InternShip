const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const mongoose = require('mongoose');

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Model to use - Llama 3.3 70B is fast and capable
const MODEL = 'llama-3.3-70b-versatile';

const extractJson = (text) => {
    try {
        // Find the first { and last } to extract JSON block
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}');
        if (start === -1 || end === -1) throw new Error('No JSON block found');
        const jsonStr = text.substring(start, end + 1);
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error('--- JSON Extraction Failure ---');
        console.error('Raw Response:', text);
        throw new Error('Failed to parse AI response: ' + e.message);
    }
};

// Helper function to call Groq
const callGroq = async (systemPrompt, userPrompt, jsonMode = false) => {
    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
    ];

    const completion = await groq.chat.completions.create({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
        response_format: jsonMode ? { type: 'json_object' } : undefined
    });

    return completion.choices[0]?.message?.content || '';
};

// AI Job Description Analyzer (Eligibility Check)
router.post('/analyze', auth, async (req, res) => {
    try {
        const { jdText } = req.body;
        console.log('Starting Groq Analysis for user:', req.user.id);

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
            console.error('GROQ_API_KEY is not configured correctly in .env');
            return res.status(500).json({ message: 'AI Service configuration error. Please set GROQ_API_KEY in .env' });
        }

        if (!jdText) return res.status(400).json({ message: 'JD text is required' });

        let user = null;
        if (mongoose.Types.ObjectId.isValid(req.user.id)) {
            user = await User.findById(req.user.id);
        }
        if (!user && req.user.id) {
            user = await User.findOne({ uid: req.user.id });
        }

        let userSkills = ['React', 'JavaScript', 'Node.js', 'Web Technologies'];
        if (user && Array.isArray(user.skills) && user.skills.length > 0) {
            userSkills = user.skills;
        }

        const userProfile = {
            name: user?.name || 'Guest User',
            skills: userSkills,
            experience: user?.experience || [],
            projects: user?.projects || []
        };

        const systemPrompt = `You are an expert career advisor. Analyze job descriptions and compare them against candidate profiles. Always respond with valid JSON only.`;

        const userPrompt = `
Analyze the following job description and compare it against the user's profile.

USER PROFILE:
${JSON.stringify(userProfile)}

JOB DESCRIPTION:
${jdText}

Respond with this exact JSON structure:
{
    "title": "Job Title from JD",
    "company": "Company Name from JD",
    "location": "Location from JD",
    "matchPercentage": 75,
    "matchedSkills": ["skill1", "skill2"],
    "missingSkills": ["skill1", "skill2"],
    "isEligible": true,
    "advice": "Short professional advice for the candidate"
}`;

        const response = await callGroq(systemPrompt, userPrompt, true);
        console.log('Groq Raw Response (Analyze):', response);

        let analysis;
        try {
            analysis = JSON.parse(response);
        } catch (e) {
            analysis = extractJson(response);
        }

        res.json(analysis);

    } catch (err) {
        console.error('Groq Analysis Error:', err);
        res.status(500).json({ message: 'AI Analysis error', error: err.message });
    }
});

// AI Job Eligibility Checker - Compares user skills with job requirements
router.post('/eligibility', auth, async (req, res) => {
    try {
        const { job, userSkills } = req.body;
        console.log('Checking eligibility for user:', req.user.id, 'Job:', job?.title);

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
            return res.status(500).json({ message: 'AI Service configuration error' });
        }

        if (!job || !job.title) {
            return res.status(400).json({ message: 'Job details are required' });
        }

        const systemPrompt = `You are a career advisor AI that analyzes job requirements and candidate qualifications.
You must respond ONLY with valid JSON, no other text.`;

        const userPrompt = `Analyze if this candidate is eligible for the job position.

JOB DETAILS:
- Title: ${job.title}
- Company: ${job.company || 'Not specified'}
- Description: ${job.description || 'Not provided'}
- Location: ${job.location || 'Not specified'}

CANDIDATE'S CURRENT SKILLS:
${userSkills && userSkills.length > 0 ? userSkills.join(', ') : 'No skills listed'}

Respond with this exact JSON structure:
{
    "eligibilityScore": 75,
    "isEligible": true,
    "matchedSkills": ["skill1", "skill2"],
    "missingSkills": ["skill1", "skill2"],
    "requiredSkills": ["all skills needed for this job"],
    "summary": "Brief eligibility analysis",
    "interviewQuestions": [
        {
            "question": "Previously asked interview question",
            "category": "Technical/Behavioral/HR",
            "difficulty": "Easy/Medium/Hard",
            "tips": "How to answer this question"
        }
    ],
    "roadmap": {
        "title": "Path to becoming eligible",
        "duration": "X weeks/months",
        "steps": [
            {
                "phase": "Phase 1: Foundation",
                "skills": ["skill to learn"],
                "tasks": ["specific task to do"],
                "youtubePlaylist": {"name": "Playlist Name", "url": "https://youtube.com/playlist?list=..."},
                "resources": [
                    {"name": "Resource Name", "url": "https://actual-url.com"}
                ],
                "certifications": [
                    {"name": "Certification Name", "provider": "Google/AWS/etc", "url": "https://...", "isFree": true}
                ]
            }
        ]
    }
}

IMPORTANT:
- eligibilityScore: 0-100 based on skill match
- isEligible: true if score >= 70
- If candidate has NO skills listed, set eligibilityScore to 10 and provide comprehensive roadmap
- interviewQuestions: ALWAYS include 5-8 commonly asked interview questions for this company and role. Include a mix of technical, behavioral, and HR questions. These should be realistic questions that ${job.company || 'companies in this industry'} typically ask.
- roadmap: ALWAYS include a roadmap, even if the user is eligible. It helps them improve further.
- For EACH phase, include:
  * phase: Clear phase name
  * skills: Array of skills to learn
  * tasks: Array of specific tasks to do
  * certifications: At least one free AND one paid certification from providers like Google, AWS, Microsoft, Coursera, Udemy, LinkedIn Learning`;

        const response = await callGroq(systemPrompt, userPrompt, true);
        console.log('Groq Raw Response (Eligibility):', response);

        let result;
        try {
            result = JSON.parse(response);
        } catch (e) {
            result = extractJson(response);
        }

        res.json(result);

    } catch (err) {
        console.error('Groq Eligibility Error:', err);
        res.status(500).json({ message: 'AI Eligibility check error', error: err.message });
    }
});

// AI Career Roadmap Generator
router.post('/roadmap', auth, async (req, res) => {
    try {
        const { dreamJob } = req.body;
        console.log('Generating Roadmap for user:', req.user.id, 'Dream Job:', dreamJob);

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
            console.error('GROQ_API_KEY is not configured correctly in .env');
            return res.status(500).json({ message: 'AI Service configuration error. Please set GROQ_API_KEY in .env' });
        }

        if (!dreamJob) return res.status(400).json({ message: 'Dream job title is required' });

        let user = null;
        if (mongoose.Types.ObjectId.isValid(req.user.id)) {
            user = await User.findById(req.user.id);
        }
        if (!user && req.user.id) {
            user = await User.findOne({ uid: req.user.id });
        }

        let userSkills = ['Software Development', 'Problem Solving', 'Communication'];
        if (user && Array.isArray(user.skills) && user.skills.length > 0) {
            userSkills = user.skills;
        } else if (user && typeof user.skills === 'string' && user.skills.trim()) {
            userSkills = user.skills.split(',').map(s => s.trim());
        }

        const systemPrompt = `You are an expert career coach. Create detailed, actionable career roadmaps. Always respond with valid JSON only.`;

        const userPrompt = `
Create a detailed 6-month career roadmap for a student to become a ${dreamJob}.
Current User Skills: ${userSkills.join(', ')}

Respond with this exact JSON structure:
{
    "dreamJob": "${dreamJob}",
    "phases": [
        {
            "month": "Month 1-2: Foundations",
            "topics": ["topic1", "topic2", "topic3"],
            "actionItems": ["action1", "action2", "action3"]
        },
        {
            "month": "Month 3-4: Building Skills",
            "topics": ["topic1", "topic2", "topic3"],
            "actionItems": ["action1", "action2", "action3"]
        },
        {
            "month": "Month 5-6: Advanced & Job Ready",
            "topics": ["topic1", "topic2", "topic3"],
            "actionItems": ["action1", "action2", "action3"]
        }
    ],
    "recommendedResources": [
        {"name": "Resource Name", "url": "https://actual-link-to-resource.com"},
        {"name": "Course/Tutorial Name", "url": "https://course-url.com"},
        {"name": "Documentation", "url": "https://docs-url.com"},
        {"name": "YouTube Channel/Video", "url": "https://youtube.com/video"}
    ]
}

IMPORTANT: For recommendedResources, provide helpful learning resources. The frontend will automatically map topics to verified YouTube playlists for visual learning. Provide 3-5 high-quality links to platforms like:
- freeCodeCamp (freecodecamp.org)
- Coursera/Udemy/LinkedIn Learning (for certifications)
- Official Documentation (MDN, w3schools, etc.)
- GitHub repositories for project examples
`;

        const response = await callGroq(systemPrompt, userPrompt, true);
        console.log('Groq Raw Response (Roadmap):', response);

        let roadmap;
        try {
            roadmap = JSON.parse(response);
        } catch (e) {
            roadmap = extractJson(response);
        }

        res.json(roadmap);

    } catch (err) {
        console.error('Groq Roadmap Error:', err);
        res.status(500).json({ message: 'AI Roadmap generation error', error: err.message });
    }
});

// General AI Chat for Career Guidance
router.post('/chat', auth, async (req, res) => {
    try {
        const { message, chatHistory } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required' });

        if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
            return res.status(500).json({ message: 'AI Service configuration error. Please set GROQ_API_KEY in .env' });
        }

        const systemPrompt = `You are an elite AI Career Coach and Architect. Your goal is to provide helpful, professional, and encouraging career advice.

GUIDELINES:
- For general conversation (greetings, small talk), be friendly and concise.
- For career advice, be professional and insightful.
- If the user explicitly asks for a "Roadmap" or "Job Analysis", guide them to use the specific UI buttons for those features.
- Keep responses natural and engaging.
- Be encouraging and supportive.`;

        // Convert chat history to Groq format
        const messages = [{ role: 'system', content: systemPrompt }];

        if (chatHistory && Array.isArray(chatHistory)) {
            chatHistory.forEach(msg => {
                if (msg.role === 'user' || msg.role === 'model') {
                    messages.push({
                        role: msg.role === 'model' ? 'assistant' : 'user',
                        content: msg.parts?.[0]?.text || msg.content || ''
                    });
                }
            });
        }

        messages.push({ role: 'user', content: message });

        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: messages,
            temperature: 0.8,
            max_tokens: 500
        });

        const responseText = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        res.json({ text: responseText });

    } catch (err) {
        console.error('Groq Chat Error:', err);
        res.status(500).json({ message: 'AI Chat error', error: err.message });
    }
});

module.exports = router;
