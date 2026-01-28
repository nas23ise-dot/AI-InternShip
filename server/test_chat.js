const axios = require('axios');

async function test() {
    try {
        console.log('Testing AI Chat endpoint...');
        // Mocking the failing history (starting with model)
        const chatHistory = [
            { role: 'model', parts: [{ text: "Hey! I'm your AI Career Coach. How can I help you today?" }] }
        ];

        const res = await axios.post('http://localhost:5000/api/ai/chat',
            {
                message: 'hi',
                chatHistory: chatHistory
            },
            { headers: { 'X-User-ID': 'test_user_id' } }
        );
        console.log('Success:', res.data.text);
    } catch (err) {
        console.error('Error Status:', err.response?.status);
        console.error('Error Data:', JSON.stringify(err.response?.data, null, 2));
    }
}

test();
