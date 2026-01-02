import jwt from 'jsonwebtoken';

import { getQuery } from '../database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // console.log('Auth Middleware: Access token required.');
        // console.log('Headers received:', JSON.stringify(req.headers));
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

export const isAdmin = async (req, res, next) => {
    // Optimistic check from token
    if (req.user.isAdmin) {
        return next();
    }

    // Fallback: Check database for latest status (handles stale tokens)
    try {
        const user = await getQuery('SELECT isAdmin FROM users WHERE id = ?', [req.user.userId]);
        if (user && user.isAdmin === 1) {
            req.user.isAdmin = 1; // Update for subsequent use
            return next();
        }
    } catch (error) {
        console.error('isAdmin middleware DB check failed:', error);
    }

    return res.status(403).json({ error: 'Admin access required' });
};
