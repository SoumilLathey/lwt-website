import express from 'express';
import nodemailer from 'nodemailer';
import { runQuery, allQuery } from '../database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'latheysoumil@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

// Submit enquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        // Save to database
        const result = await runQuery(
            'INSERT INTO enquiries (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, service, message]
        );

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'latheysoumil@gmail.com',
            to: 'latheysoumil@gmail.com',
            subject: `New Enquiry from ${name} - ${service || 'General'}`,
            html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Enquiry email sent successfully');
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the request if email fails, enquiry is still saved
        }

        res.status(201).json({
            message: 'Enquiry submitted successfully',
            enquiryId: result.id
        });
    } catch (error) {
        console.error('Submit enquiry error:', error);
        res.status(500).json({ error: 'Failed to submit enquiry' });
    }
});

// Get all enquiries (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const enquiries = await allQuery(
            'SELECT * FROM enquiries ORDER BY createdAt DESC'
        );

        res.json(enquiries);
    } catch (error) {
        console.error('Get enquiries error:', error);
        res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
});

export default router;
