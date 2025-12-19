import express from 'express';
import { runQuery, getQuery } from '../database.js';

const router = express.Router();

// Secret key for admin promotion (change this to something secure!)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'lwt-admin-secret-2024-change-me';

// Promote user to admin
router.post('/promote', async (req, res) => {
    try {
        const { email, secret } = req.body;

        // Verify secret key
        if (secret !== ADMIN_SECRET) {
            return res.status(403).json({ error: 'Invalid secret key' });
        }

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if user exists
        const user = await getQuery('SELECT id, email, name, isAdmin FROM users WHERE email = ?', [email]);

        if (!user) {
            return res.status(404).json({ error: 'User not found with this email' });
        }

        if (user.isAdmin === 1) {
            return res.status(200).json({
                message: 'User is already an admin',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: true
                }
            });
        }

        // Promote to admin
        await runQuery('UPDATE users SET isAdmin = 1 WHERE email = ?', [email]);

        res.json({
            message: 'User successfully promoted to admin',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: true
            }
        });
    } catch (error) {
        console.error('Admin promotion error:', error);
        res.status(500).json({ error: 'Failed to promote user to admin' });
    }
});

// Demote admin to regular user
router.post('/demote', async (req, res) => {
    try {
        const { email, secret } = req.body;

        // Verify secret key
        if (secret !== ADMIN_SECRET) {
            return res.status(403).json({ error: 'Invalid secret key' });
        }

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if user exists
        const user = await getQuery('SELECT id, email, name, isAdmin FROM users WHERE email = ?', [email]);

        if (!user) {
            return res.status(404).json({ error: 'User not found with this email' });
        }

        if (user.isAdmin === 0) {
            return res.status(200).json({
                message: 'User is already a regular user',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: false
                }
            });
        }

        // Demote from admin
        await runQuery('UPDATE users SET isAdmin = 0 WHERE email = ?', [email]);

        res.json({
            message: 'Admin successfully demoted to regular user',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: false
            }
        });
    } catch (error) {
        console.error('Admin demotion error:', error);
        res.status(500).json({ error: 'Failed to demote admin' });
    }
});

// Check admin status
router.get('/check/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { secret } = req.query;

        // Verify secret key
        if (secret !== ADMIN_SECRET) {
            return res.status(403).json({ error: 'Invalid secret key' });
        }

        const user = await getQuery('SELECT id, email, name, isAdmin FROM users WHERE email = ?', [email]);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin === 1
            }
        });
    } catch (error) {
        console.error('Admin check error:', error);
        res.status(500).json({ error: 'Failed to check admin status' });
    }
});

export default router;
