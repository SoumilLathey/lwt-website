import express from 'express';
import bcrypt from 'bcryptjs';
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
      SELECT c.*, u.name as userName, u.email as userEmail, u.phone as userPhone,
             e.name as assignedEmployeeName, e.id as assignedEmployeeId
      FROM complaints c
      JOIN users u ON c.userId = u.id
      LEFT JOIN employees e ON c.assignedTo = e.id
      ORDER BY c.createdAt DESC
    `);

        // Get images for each complaint
        for (let complaint of complaints) {
            const images = await allQuery(
                'SELECT * FROM complaint_images WHERE complaintId = ? ORDER BY createdAt DESC',
                [complaint.id]
            );
            complaint.images = images;
        }

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

// Create complaint (admin)
router.post('/admin', authenticateToken, isAdmin, async (req, res) => {
    try {
        console.log('Admin creating complaint:', req.body);
        const { clientName, clientPhone, clientAddress, subject, description } = req.body;

        if (!clientName || !clientPhone || !subject || !description) {
            return res.status(400).json({ error: 'Client Name, Phone, Subject and Description are required' });
        }

        // Find or Create User
        let user = await getQuery('SELECT id FROM users WHERE phone = ?', [clientPhone]);

        if (!user) {
            const email = `${clientPhone.replace(/\D/g, '')}@lwt-client.com`;
            const hashedPassword = await bcrypt.hash('123456', 10); // Default password

            try {
                const result = await runQuery(
                    'INSERT INTO users (email, password, name, phone, address) VALUES (?, ?, ?, ?, ?)',
                    [email, hashedPassword, clientName, clientPhone, clientAddress || '']
                );
                user = { id: result.id };
            } catch (err) {
                // Fallback if email collision but phone didn't match (e.g. manual edit)
                // Try finding by email
                user = await getQuery('SELECT id FROM users WHERE email = ?', [email]);
                if (!user) throw err;
            }
        } else {
            // Optional: Update address if provided
            if (clientAddress) {
                await runQuery('UPDATE users SET address = ?, name = ? WHERE id = ?', [clientAddress, clientName, user.id]);
            }
        }

        const result = await runQuery(
            'INSERT INTO complaints (userId, subject, description, createdBy) VALUES (?, ?, ?, ?)',
            [user.id, subject, description, req.user.userId]
        );

        res.status(201).json({
            message: 'Complaint created successfully',
            complaintId: result.id
        });
    } catch (error) {
        console.error('Admin create complaint error:', error);
        res.status(500).json({ error: 'Failed to create complaint' });
    }
});

export default router;
