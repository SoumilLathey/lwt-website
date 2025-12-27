import express from 'express';
import bcrypt from 'bcryptjs';
import { runQuery, allQuery, getQuery } from '../database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'latheysoumil@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

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
        const complaints = await allQuery(`
            SELECT c.*, 
                   e.name as assignedEmployeeName, 
                   e.phone as assignedEmployeePhone, 
                   e.photoPath as assignedEmployeePhoto
            FROM complaints c
            LEFT JOIN employees e ON c.assignedTo = e.id
            WHERE c.userId = ? 
            ORDER BY c.createdAt DESC
        `, [req.user.userId]);

        // Get visit schedule for each complaint
        for (let complaint of complaints) {
            const schedule = await getQuery(
                'SELECT * FROM visit_schedules WHERE complaintId = ?',
                [complaint.id]
            );
            complaint.visitSchedule = schedule || null;
        }

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
             e.name as assignedEmployeeName, e.id as assignedEmployeeId, 
             e.phone as assignedEmployeePhone, e.photoPath as assignedEmployeePhoto
      FROM complaints c
      JOIN users u ON c.userId = u.id
      LEFT JOIN employees e ON c.assignedTo = e.id
      ORDER BY c.createdAt DESC
    `);

        // Get images and visit schedule for each complaint
        for (let complaint of complaints) {
            const images = await allQuery(
                'SELECT * FROM complaint_images WHERE complaintId = ? ORDER BY createdAt DESC',
                [complaint.id]
            );
            complaint.images = images;

            const schedule = await getQuery(
                'SELECT * FROM visit_schedules WHERE complaintId = ?',
                [complaint.id]
            );
            complaint.visitSchedule = schedule || null;
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
        const { clientName, clientPhone, clientEmail, clientAddress, subject, description } = req.body;

        if (!clientName || !clientPhone || !subject || !description) {
            return res.status(400).json({ error: 'Client Name, Phone, Subject and Description are required' });
        }

        // Find or Create User
        let user = await getQuery('SELECT id, email FROM users WHERE phone = ?', [clientPhone]);

        if (!user) {
            const email = clientEmail || `${clientPhone.replace(/\D/g, '')}@lwt-client.com`;
            // Check if email already taken by another user
            const existingEmail = await getQuery('SELECT id FROM users WHERE email = ?', [email]);
            if (existingEmail) {
                // Link to existing user by email if phone didn't match
                user = existingEmail;
                // Update phone number for this user
                await runQuery('UPDATE users SET phone = ? WHERE id = ?', [clientPhone, user.id]);
            } else {
                const hashedPassword = await bcrypt.hash('123456', 10); // Default password
                const result = await runQuery(
                    'INSERT INTO users (email, password, name, phone, address) VALUES (?, ?, ?, ?, ?)',
                    [email, hashedPassword, clientName, clientPhone, clientAddress || '']
                );
                user = { id: result.id };
            }
        } else {
            // Optional: Update address or email if provided
            const updates = [];
            const values = [];

            if (clientAddress) {
                updates.push('address = ?');
                values.push(clientAddress);
            }
            if (clientEmail && clientEmail !== user.email) {
                updates.push('email = ?');
                values.push(clientEmail);
            }

            if (updates.length > 0) {
                values.push(user.id);
                await runQuery(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
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

// Admin Upload complaint image
router.post('/admin/:id/images', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { type, description } = req.body; // 'before' or 'after'

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        await runQuery(
            'INSERT INTO complaint_images (complaintId, imageType, imagePath, uploadedBy) VALUES (?, ?, ?, ?)',
            [id, type || 'before', imagePath, req.user.userId]
        );

        res.status(201).json({
            message: 'Image uploaded successfully',
            imagePath
        });
    } catch (error) {
        console.error('Admin upload complaint image error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});



export default router;
