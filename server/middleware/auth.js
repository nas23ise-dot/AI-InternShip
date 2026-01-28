const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const xUserId = req.header('X-User-ID');

    if (!token && !xUserId) {
        return res.status(401).json({ message: 'No token or User ID, authorization denied' });
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (err) {
            if (!xUserId) return res.status(401).json({ message: 'Token is not valid' });
        }
    }

    if (xUserId) {
        req.user = { id: xUserId, isFirebase: true };
        return next();
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};

module.exports = { auth, admin };
