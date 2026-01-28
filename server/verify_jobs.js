const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Adjust path for models since we are now in server/
const Job = require('./models/Job');

dotenv.config();

async function verify() {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI not found in .env');
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const testJobs = [
            {
                title: 'Remote Job', company: 'TestCorpLocation', location: 'Anywhere',
                description: 'Work from anywhere', type: 'job', workMode: 'Remote', isPaid: true
            },
            {
                title: 'On-site Maharashtra', company: 'TestCorpLocation', location: 'Maharashtra',
                description: 'Office in Mumbai', type: 'job', workMode: 'On-site', isPaid: true
            },
            {
                title: 'Hybrid Maharashtra', company: 'TestCorpLocation', location: 'Maharashtra',
                description: 'Hybrid Mumbai', type: 'job', workMode: 'Hybrid', isPaid: false
            },
            {
                title: 'On-site Karnataka', company: 'TestCorpLocation', location: 'Karnataka',
                description: 'Office in Bangalore', type: 'job', workMode: 'On-site', isPaid: true
            },
        ];

        console.log('Seeding test jobs...');
        await Job.insertMany(testJobs);

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

        // Cleanup
        await Job.deleteMany({ company: 'TestCorpLocation' });
        console.log('Cleaned up test jobs.');

    } catch (err) {
        console.error('Error during verification:', err);
    } finally {
        await mongoose.connection.close();
    }
}

verify();
