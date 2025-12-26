import express from 'express';
import { getQuery, allQuery, runQuery } from '../database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/all', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await allQuery(
            'SELECT id, name, email FROM users ORDER BY name ASC'
        );
        res.json(users);
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

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

// Get user's weighing equipment
router.get('/weighing-equipment', authenticateToken, async (req, res) => {
    try {
        const equipment = await allQuery(
            'SELECT * FROM weighing_equipment WHERE userId = ? ORDER BY createdAt DESC',
            [req.user.userId]
        );

        res.json(equipment);
    } catch (error) {
        console.error('Get weighing equipment error:', error);
        res.status(500).json({ error: 'Failed to fetch weighing equipment' });
    }
});

// Add new weighing equipment
router.post('/weighing-equipment', authenticateToken, async (req, res) => {
    try {
        const { equipmentType, model, capacity, serialNumber, installationDate, location, notes } = req.body;

        const result = await runQuery(
            `INSERT INTO weighing_equipment 
            (userId, equipmentType, model, capacity, serialNumber, installationDate, location, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.user.userId, equipmentType, model, capacity, serialNumber, installationDate, location, notes]
        );

        res.status(201).json({
            message: 'Weighing equipment added successfully',
            id: result.id
        });
    } catch (error) {
        console.error('Add weighing equipment error:', error);
        res.status(500).json({ error: 'Failed to add weighing equipment' });
    }
});

// Update weighing equipment
router.put('/weighing-equipment/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { equipmentType, model, capacity, serialNumber, installationDate, location, status, notes } = req.body;

        // Verify ownership
        const equipment = await getQuery(
            'SELECT userId FROM weighing_equipment WHERE id = ?',
            [id]
        );

        if (!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }

        if (equipment.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await runQuery(
            `UPDATE weighing_equipment 
            SET equipmentType = ?, model = ?, capacity = ?, serialNumber = ?, 
                installationDate = ?, location = ?, status = ?, notes = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?`,
            [equipmentType, model, capacity, serialNumber, installationDate, location, status, notes, id]
        );

        res.json({ message: 'Weighing equipment updated successfully' });
    } catch (error) {
        console.error('Update weighing equipment error:', error);
        res.status(500).json({ error: 'Failed to update weighing equipment' });
    }
});

// Delete weighing equipment
router.delete('/weighing-equipment/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Verify ownership
        const equipment = await getQuery(
            'SELECT userId FROM weighing_equipment WHERE id = ?',
            [id]
        );

        if (!equipment) {
            return res.status(404).json({ error: 'Equipment not found' });
        }

        if (equipment.userId !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await runQuery('DELETE FROM weighing_equipment WHERE id = ?', [id]);

        res.json({ message: 'Weighing equipment deleted successfully' });
    } catch (error) {
        console.error('Delete weighing equipment error:', error);
        res.status(500).json({ error: 'Failed to delete weighing equipment' });
    }
});

export default router;
