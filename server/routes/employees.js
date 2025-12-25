import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { runQuery, getQuery, allQuery } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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

// Employee Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find employee
        const employee = await getQuery('SELECT * FROM employees WHERE email = ? AND isActive = 1', [email]);
        if (!employee) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, employee.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { employeeId: employee.id, email: employee.email, isEmployee: true },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            employee: {
                id: employee.id,
                email: employee.email,
                name: employee.name,
                department: employee.department,
                isEmployee: true
            }
        });
    } catch (error) {
        console.error('Employee login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get assigned complaints for employee
router.get('/complaints', authenticateToken, async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const complaints = await allQuery(`
            SELECT c.*, u.name as userName, u.email as userEmail, u.phone as userPhone
            FROM complaints c
            JOIN users u ON c.userId = u.id
            WHERE c.assignedTo = ?
            ORDER BY c.createdAt DESC
        `, [req.user.employeeId]);

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
        console.error('Get employee complaints error:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Get assigned enquiries for employee
router.get('/enquiries', authenticateToken, async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const enquiries = await allQuery(`
            SELECT * FROM enquiries
            WHERE assignedTo = ?
            ORDER BY createdAt DESC
        `, [req.user.employeeId]);

        // Get images for each enquiry
        for (let enquiry of enquiries) {
            const images = await allQuery(
                'SELECT * FROM enquiry_images WHERE enquiryId = ? ORDER BY createdAt DESC',
                [enquiry.id]
            );
            enquiry.images = images;
        }

        res.json(enquiries);
    } catch (error) {
        console.error('Get employee enquiries error:', error);
        res.status(500).json({ error: 'Failed to fetch enquiries' });
    }
});

// Upload complaint image (single photo with client)
router.post('/complaints/:id/images', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const { id } = req.params;
        const { description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Verify complaint is assigned to this employee
        const complaint = await getQuery('SELECT * FROM complaints WHERE id = ? AND assignedTo = ?', [id, req.user.employeeId]);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found or not assigned to you' });
        }

        // Check if image already uploaded (only one allowed)
        const existingImage = await getQuery('SELECT id FROM complaint_images WHERE complaintId = ?', [id]);
        if (existingImage) {
            return res.status(400).json({ error: 'Image already uploaded for this complaint. Only one photo allowed.' });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        await runQuery(
            'INSERT INTO complaint_images (complaintId, imageType, imagePath, uploadedBy) VALUES (?, ?, ?, ?)',
            [id, description || 'Photo with client', imagePath, req.user.employeeId]
        );

        res.status(201).json({
            message: 'Image uploaded successfully',
            imagePath
        });
    } catch (error) {
        console.error('Upload complaint image error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Upload enquiry image (single photo with client)
router.post('/enquiries/:id/images', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const { id } = req.params;
        const { description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Verify enquiry is assigned to this employee
        const enquiry = await getQuery('SELECT * FROM enquiries WHERE id = ? AND assignedTo = ?', [id, req.user.employeeId]);
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found or not assigned to you' });
        }

        // Check if image already uploaded (only one allowed)
        const existingImage = await getQuery('SELECT id FROM enquiry_images WHERE enquiryId = ?', [id]);
        if (existingImage) {
            return res.status(400).json({ error: 'Image already uploaded for this enquiry. Only one photo allowed.' });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        await runQuery(
            'INSERT INTO enquiry_images (enquiryId, imageType, imagePath, uploadedBy) VALUES (?, ?, ?, ?)',
            [id, description || 'Photo with client', imagePath, req.user.employeeId]
        );

        res.status(201).json({
            message: 'Image uploaded successfully',
            imagePath
        });
    } catch (error) {
        console.error('Upload enquiry image error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Update complaint status by employee
router.patch('/complaints/:id/status', authenticateToken, async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const { id } = req.params;
        const { status } = req.body;

        // Verify complaint is assigned to this employee
        const complaint = await getQuery('SELECT * FROM complaints WHERE id = ? AND assignedTo = ?', [id, req.user.employeeId]);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found or not assigned to you' });
        }

        await runQuery(
            'UPDATE complaints SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            [status, id]
        );

        res.json({ message: 'Complaint status updated successfully' });
    } catch (error) {
        console.error('Update complaint status error:', error);
        res.status(500).json({ error: 'Failed to update complaint status' });
    }
});

// Update enquiry status by employee
router.patch('/enquiries/:id/status', authenticateToken, async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const { id } = req.params;
        const { status } = req.body;

        // Verify enquiry is assigned to this employee
        const enquiry = await getQuery('SELECT * FROM enquiries WHERE id = ? AND assignedTo = ?', [id, req.user.employeeId]);
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found or not assigned to you' });
        }

        await runQuery(
            'UPDATE enquiries SET status = ? WHERE id = ?',
            [status, id]
        );

        res.json({ message: 'Enquiry status updated successfully' });
    } catch (error) {
        console.error('Update enquiry status error:', error);
        res.status(500).json({ error: 'Failed to update enquiry status' });
    }
});

// Get assigned projects for employee
router.get('/projects', authenticateToken, async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const projects = await allQuery(`
            SELECT p.*, u.name as creatorName
            FROM projects p
            JOIN project_team_members ptm ON p.id = ptm.projectId
            JOIN users u ON p.createdBy = u.id
            WHERE ptm.employeeId = ?
            ORDER BY p.createdAt DESC
        `, [req.user.employeeId]);

        // Get team members and images for each project
        for (let project of projects) {
            const teamMembers = await allQuery(`
                SELECT e.id, e.name, e.email, e.department, ptm.role
                FROM project_team_members ptm
                JOIN employees e ON ptm.employeeId = e.id
                WHERE ptm.projectId = ?
                ORDER BY ptm.assignedAt ASC
            `, [project.id]);

            const images = await allQuery(`
                SELECT pi.*, e.name as uploaderName
                FROM project_images pi
                JOIN employees e ON pi.uploadedBy = e.id
                WHERE pi.projectId = ?
                ORDER BY pi.dayNumber ASC, pi.createdAt DESC
            `, [project.id]);

            project.teamMembers = teamMembers;
            project.images = images;
        }

        res.json(projects);
    } catch (error) {
        console.error('Get employee projects error:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Upload project progress image
router.post('/projects/:id/images', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const { id } = req.params;
        const { dayNumber, isFinal, description } = req.body;
        console.log('Upload Request Body:', req.body);
        console.log('isFinal value:', isFinal, 'Type:', typeof isFinal);

        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        if (!dayNumber || isNaN(parseInt(dayNumber)) || parseInt(dayNumber) < 1) {
            return res.status(400).json({ error: 'Valid day number is required (e.g., 1, 2, 3...)' });
        }

        // Verify employee is assigned to this project
        const assignment = await getQuery(
            'SELECT * FROM project_team_members WHERE projectId = ? AND employeeId = ?',
            [id, req.user.employeeId]
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Project not found or you are not assigned to it' });
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const finalFlag = (String(isFinal).toLowerCase() === 'true' || isFinal === true || String(isFinal) === '1') ? 1 : 0;

        await runQuery(
            'INSERT INTO project_images (projectId, uploadedBy, imagePath, dayNumber, isFinal, description) VALUES (?, ?, ?, ?, ?, ?)',
            [id, req.user.employeeId, imagePath, parseInt(dayNumber), finalFlag, description || null]
        );

        // If this is the final image, update project status to Completed
        if (finalFlag === 1) {
            await runQuery(
                'UPDATE projects SET status = ? WHERE id = ?',
                ['Completed', id]
            );
        }

        res.status(201).json({
            message: 'Project image uploaded successfully',
            imagePath,
            dayNumber: parseInt(dayNumber),
            isFinal: finalFlag === 1
        });
    } catch (error) {
        console.error('Upload project image error:', error);
        res.status(500).json({ error: 'Failed to upload project image' });
    }
});

// Update project status by employee
router.patch('/projects/:id/status', authenticateToken, async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const { id } = req.params;
        const { status } = req.body;

        // Verify employee is assigned to this project
        const assignment = await getQuery(
            'SELECT * FROM project_team_members WHERE projectId = ? AND employeeId = ?',
            [id, req.user.employeeId]
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Project not found or you are not assigned to it' });
        }

        await runQuery(
            'UPDATE projects SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            [status, id]
        );

        res.json({ message: 'Project status updated successfully' });
    } catch (error) {
        console.error('Update project status error:', error);
        res.status(500).json({ error: 'Failed to update project status' });
    }
});

// Get project images for a specific project
router.get('/projects/:id/images', authenticateToken, async (req, res) => {
    try {
        if (!req.user.isEmployee) {
            return res.status(403).json({ error: 'Employee access required' });
        }

        const { id } = req.params;

        // Verify employee is assigned to this project
        const assignment = await getQuery(
            'SELECT * FROM project_team_members WHERE projectId = ? AND employeeId = ?',
            [id, req.user.employeeId]
        );
        if (!assignment) {
            return res.status(404).json({ error: 'Project not found or you are not assigned to it' });
        }

        const images = await allQuery(`
            SELECT pi.*, e.name as uploaderName
            FROM project_images pi
            JOIN employees e ON pi.uploadedBy = e.id
            WHERE pi.projectId = ?
            ORDER BY pi.dayNumber ASC, pi.createdAt DESC
        `, [id]);

        res.json(images);
    } catch (error) {
        console.error('Get project images error:', error);
        res.status(500).json({ error: 'Failed to fetch project images' });
    }
});

export default router;
