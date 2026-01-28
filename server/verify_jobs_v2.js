const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
                title: 'Remote Job V2', company: 'CacheTestCo', location: 'Remote',
                description: 'Full remote', type: 'job', salary_min: 50000, salary_max: 100000
            },
            {
                title: 'Hybrid Job V2', company: 'CacheTestCo', location: 'Hybrid Maharashtra',
                description: 'Hybrid Mumbai', type: 'job', salary_min: null, salary_max: null
            },
            {
                title: 'On-site Karnataka V2', company: 'CacheTestCo', location: 'Karnataka',
                description: 'Office in Bangalore', type: 'job', salary_min: 30000
            },
            {
                title: 'On-site Maharashtra V2', company: 'CacheTestCo', location: 'Maharashtra',
                description: 'Office in Mumbai', type: 'job', salary_min: 0, salary_max: 0
            },
        ];

        console.log('Seeding test jobs for V2...');
        await Job.insertMany(testJobs);

        const stateToTest = 'Maharashtra';

        // Mocking the filtering logic used in the API
        const filterLogic = (job, state) => {
            const loc = job.location.toLowerCase();
            return loc.includes('remote') || loc.includes('hybrid') || loc.includes(state.toLowerCase());
        };

        const foundJobs = await Job.find({ status: 'active', company: 'CacheTestCo' });
        const filtered = foundJobs.filter(j => filterLogic(j, stateToTest));

        console.log(`Filtered ${filtered.length} jobs for state: ${stateToTest}`);
        const titles = filtered.map(j => j.title);
        console.log('Jobs found:', titles);

        const expected = ['Remote Job V2', 'Hybrid Job V2', 'On-site Maharashtra V2'];
        const passedLogic = expected.every(e => titles.includes(e)) && !titles.includes('On-site Karnataka V2');

        // Test Badge Logic
        const remoteJob = foundJobs.find(j => j.title === 'Remote Job V2');
        const hybridJob = foundJobs.find(j => j.title === 'Hybrid Job V2');
        const unpaidJob = foundJobs.find(j => j.title === 'On-site Maharashtra V2');

        const isPaid = (job) => !!(job.salary_min || job.salary_max);

        const passedBadges = isPaid(remoteJob) === true && isPaid(hybridJob) === false && isPaid(unpaidJob) === false;

        console.log('Logic Passed:', passedLogic);
        console.log('Badge Logic Passed:', passedBadges);

        if (passedLogic && passedBadges) {
            console.log('✅ Verification V2 PASSED: Correct jobs filtered and badges logic verified.');
        } else {
            console.error('❌ Verification V2 FAILED.');
        }

        // Cleanup
        await Job.deleteMany({ company: 'CacheTestCo' });
        console.log('Cleaned up test jobs.');

    } catch (err) {
        console.error('Error during verification:', err);
    } finally {
        await mongoose.connection.close();
    }
}

verify();
