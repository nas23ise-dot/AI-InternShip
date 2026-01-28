
const axios = require('axios');

async function testRoadmap() {
    try {
        console.log('Testing Roadmap with "web Developer"...');
        const response = await axios.post('http://localhost:5000/api/ai/roadmap', {
            dreamJob: 'web Developer'
        }, {
            headers: {
                'X-User-ID': 'test-user-123'
            }
        });
        console.log('Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error Status:', error.response?.status);
        console.error('Error Data:', JSON.stringify(error.response?.data, null, 2));
    }
}

testRoadmap();
