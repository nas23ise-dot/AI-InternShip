const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // Optional if manually added
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    notes: { type: String },
    followUpDate: { type: Date },
    appliedDate: { type: Date, default: Date.now },
    matchPercentage: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
