import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { runQuery, getQuery } from '../database.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name, phone, address, pincode } = req.body;

        // Validate required fields
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        // Check if user already exists
        const existingUser = await getQuery('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await runQuery(
            'INSERT INTO users (email, password, name, phone, address, pincode) VALUES (?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, name, phone, address, pincode]
        );

        res.status(201).json({
            message: 'User created successfully',
            userId: result.id
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user
        const user = await getQuery('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check verification status (skip for known admins)
        const allowedEmails = ['admin@lwt.com', 'soumil.lathey@gmail.com'];
        if (user.isVerified !== 1 && !allowedEmails.includes(user.email)) {
            return res.status(403).json({ error: 'Account pending verification by admin' });
        }

        // Auto-grant Admin to Soumil
        if (email === 'soumil.lathey@gmail.com' && user.isAdmin !== 1) {
            await runQuery('UPDATE users SET isAdmin = 1 WHERE id = ?', [user.id]);
            user.isAdmin = 1;
            console.log('Auto-upgraded Soumil to Admin on login');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Verify token
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await getQuery('SELECT id, email, name, isAdmin FROM users WHERE id = ?', [decoded.userId]);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
});

export default router;
