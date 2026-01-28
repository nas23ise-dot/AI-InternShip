
const Groq = require('groq-sdk');
require('dotenv').config();

async function testGroq() {
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    try {
        console.log('Testing Groq with Llama 3.3 70B...');
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'user', content: 'Say "Hello, Groq is working!" in one sentence.' }
            ],
            max_tokens: 50
        });
        console.log('SUCCESS:', completion.choices[0]?.message?.content);
    } catch (e) {
        console.error('ERROR:', e.message);
    }
}

testGroq();
