const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./server/models/Job');

dotenv.config({ path: './server/.env' });

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing test jobs (optional, but good for clean run)
        // await Job.deleteMany({ company: 'TestCorp' });

        const testJobs = [
            {
                title: 'Remote Job', company: 'TestCorp', location: 'Anywhere',
                description: 'Work from anywhere', type: 'job', workMode: 'Remote', isPaid: true
            },
            {
                title: 'On-site Maharashtra', company: 'TestCorp', location: 'Maharashtra',
                description: 'Office in Mumbai', type: 'job', workMode: 'On-site', isPaid: true
            },
            {
                title: 'Hybrid Maharashtra', company: 'TestCorp', location: 'Maharashtra',
                description: 'Hybrid Mumbai', type: 'job', workMode: 'Hybrid', isPaid: false
            },
            {
                title: 'On-site Karnataka', company: 'TestCorp', location: 'Karnataka',
                description: 'Office in Bangalore', type: 'job', workMode: 'On-site', isPaid: true
            },
        ];

        console.log('Seeding test jobs...');
        await Job.insertMany(testJobs);

        // Verification logic would normally be via API call, but we can test the aggregation logic directly here
        const stateToTest = 'Maharashtra';
        const query = {
            status: 'active',
            $or: [
                { workMode: 'Remote' },
                {
                    workMode: { $in: ['On-site', 'Hybrid'] },
                    location: { $regex: stateToTest, $options: 'i' }
                }
            ]
        };

        const foundJobs = await Job.find(query);
        console.log(`Found ${foundJobs.length} jobs for state: ${stateToTest}`);

        const titles = foundJobs.map(j => j.title);
        console.log('Jobs found:', titles);

        const expected = ['Remote Job', 'On-site Maharashtra', 'Hybrid Maharashtra'];
        const passed = expected.every(e => titles.includes(e)) && !titles.includes('On-site Karnataka');

        if (passed) {
            console.log('✅ Verification PASSED: Correct jobs filtered based on state and work mode.');
        } else {
            console.error('❌ Verification FAILED: Incorrect jobs returned.');
        }

    } catch (err) {
        console.error('Error during verification:', err);
    } finally {
        await mongoose.connection.close();
    }
}

verify();
