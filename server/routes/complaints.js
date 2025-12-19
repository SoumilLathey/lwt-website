import express from 'express';
import { runQuery, allQuery, getQuery } from '../database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create new complaint
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { subject, description } = req.body;

        if (!subject || !description) {
            return res.status(400).json({ error: 'Subject and description are required' });
        }

        const result = await runQuery(
            'INSERT INTO complaints (userId, subject, description) VALUES (?, ?, ?)',
            [req.user.userId, subject, description]
        );

        res.status(201).json({
            message: 'Complaint submitted successfully',
            complaintId: result.id
        });
    } catch (error) {
        console.error('Create complaint error:', error);
        res.status(500).json({ error: 'Failed to submit complaint' });
    }
});

// Get user's complaints
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const complaints = await allQuery(
            'SELECT * FROM complaints WHERE userId = ? ORDER BY createdAt DESC',
            [req.user.userId]
        );

        res.json(complaints);
    } catch (error) {
        console.error('Get user complaints error:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Get all complaints (admin only)
router.get('/all', authenticateToken, isAdmin, async (req, res) => {
    try {
        const complaints = await allQuery(`
      SELECT c.*, u.name as userName, u.email as userEmail, u.phone as userPhone
      FROM complaints c
      JOIN users u ON c.userId = u.id
      ORDER BY c.createdAt DESC
    `);

        res.json(complaints);
    } catch (error) {
        console.error('Get all complaints error:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Update complaint status (admin only)
router.patch('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        await runQuery(
            'UPDATE complaints SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            [status, id]
        );

        res.json({ message: 'Complaint status updated successfully' });
    } catch (error) {
        console.error('Update complaint error:', error);
        res.status(500).json({ error: 'Failed to update complaint' });
    }
});

export default router;
