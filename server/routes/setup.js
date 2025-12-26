import express from 'express';
import bcrypt from 'bcryptjs';
import { runQuery, getQuery } from '../database.js';

const router = express.Router();
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'lwt-admin-secret-2024';

// One-time admin setup endpoint
router.post('/create-admin', async (req, res) => {
    try {
        const { secret } = req.body;

        // Verify admin secret
        if (secret !== ADMIN_SECRET) {
            return res.status(403).json({ error: 'Invalid admin secret' });
        }

        const adminEmail = 'soumil.lathey@gmail.com';
        const adminPassword = 'Admin@123';
        const adminName = 'Soumil Lathey';

        // Check if admin already exists
        const existingAdmin = await getQuery('SELECT id FROM users WHERE email = ?', [adminEmail]);

        if (existingAdmin) {
            // Update existing user to admin
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await runQuery(
                'UPDATE users SET password = ?, isAdmin = 1, isVerified = 1 WHERE email = ?',
                [hashedPassword, adminEmail]
            );
            return res.json({
                message: 'Admin account updated successfully',
                email: adminEmail,
                password: adminPassword
            });
        }

        // Create new admin user
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await runQuery(
            'INSERT INTO users (email, password, name, isAdmin, isVerified) VALUES (?, ?, ?, 1, 1)',
            [adminEmail, hashedPassword, adminName]
        );

        res.json({
            message: 'Admin account created successfully',
            email: adminEmail,
            password: adminPassword
        });
    } catch (error) {
        console.error('Create admin error:', error);
        res.status(500).json({ error: 'Failed to create admin account' });
    }
});

export default router;
