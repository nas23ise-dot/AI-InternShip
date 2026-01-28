const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { auth } = require('../middleware/auth');

// Create Application
router.post('/', auth, async (req, res) => {
    try {
        const application = new Application({ ...req.body, student: req.user.id });
        await application.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get All Applications for logged in student
router.get('/', auth, async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user.id }).populate('job').sort({ appliedDate: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update Application
router.put('/:id', auth, async (req, res) => {
    try {
        const application = await Application.findOneAndUpdate(
            { _id: req.params.id, student: req.user.id },
            req.body,
            { new: true }
        );
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete Application
router.delete('/:id', auth, async (req, res) => {
    try {
        const application = await Application.findOneAndDelete({ _id: req.params.id, student: req.user.id });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json({ message: 'Application deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get Analytics
router.get('/analytics', auth, async (req, res) => {
    try {
        const studentId = req.user.id;
        const stats = await Application.aggregate([
            { $match: { student: new (require('mongoose').Types.ObjectId)(studentId) } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const total = await Application.countDocuments({ student: studentId });

        res.json({ stats, total });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
