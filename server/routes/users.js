import express from 'express';
import { getQuery, allQuery, runQuery } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await getQuery(
            'SELECT id, email, name, phone, address, pincode, createdAt FROM users WHERE id = ?',
            [req.user.userId]
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Get user's solar installations
router.get('/installations', authenticateToken, async (req, res) => {
    try {
        const installations = await allQuery(
            'SELECT * FROM solar_installations WHERE userId = ? ORDER BY installationDate DESC',
            [req.user.userId]
        );

        res.json(installations);
    } catch (error) {
        console.error('Get installations error:', error);
        res.status(500).json({ error: 'Failed to fetch installations' });
    }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { name, phone, address, pincode } = req.body;

        await runQuery(
            'UPDATE users SET name = ?, phone = ?, address = ?, pincode = ? WHERE id = ?',
            [name, phone, address, pincode, req.user.userId]
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

export default router;
