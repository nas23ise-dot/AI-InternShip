const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary_min: { type: Number },
    salary_max: { type: Number },
    description: { type: String, required: true },
    type: { type: String, enum: ['internship', 'job'], required: true },
    workMode: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], required: true, default: 'On-site' },
    isPaid: { type: Boolean, default: false },
    requiredSkills: [{ type: String }],
    experienceLevel: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
