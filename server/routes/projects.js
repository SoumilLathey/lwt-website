import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { runQuery, getQuery, allQuery } from '../database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for project image uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/projects'));
    },
    filename(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter(req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Create new project (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { name, description, startDate, endDate, employeeIds } = req.body;

        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        // Create project
        const result = await runQuery(
            'INSERT INTO projects (name, description, createdBy, startDate, endDate) VALUES (?, ?, ?, ?, ?)',
            [name, description, req.user.userId, startDate || null, endDate || null]
        );

        const projectId = result.id;

        // Assign employees to project if provided
        if (employeeIds && Array.isArray(employeeIds) && employeeIds.length > 0) {
            for (const employeeId of employeeIds) {
                try {
                    await runQuery(
                        'INSERT INTO project_team_members (projectId, employeeId) VALUES (?, ?)',
                        [projectId, employeeId]
                    );
                } catch (err) {
                    console.error(`Error assigning employee ${employeeId}:`, err);
                }
            }
        }

        res.status(201).json({
            message: 'Project created successfully',
            projectId
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Get all projects (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const projects = await allQuery(`
      SELECT p.*, u.name as creatorName
      FROM projects p
      JOIN users u ON p.createdBy = u.id
      ORDER BY p.createdAt DESC
    `);

        // Get team members and images for each project
        for (let project of projects) {
            const teamMembers = await allQuery(`
        SELECT e.id, e.name, e.email, e.department, ptm.role, ptm.assignedAt
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
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Get single project details (admin only)
router.get('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const project = await getQuery(`
      SELECT p.*, u.name as creatorName
      FROM projects p
      JOIN users u ON p.createdBy = u.id
      WHERE p.id = ?
    `, [id]);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Get team members
        const teamMembers = await allQuery(`
      SELECT e.id, e.name, e.email, e.department, ptm.role, ptm.assignedAt
      FROM project_team_members ptm
      JOIN employees e ON ptm.employeeId = e.id
      WHERE ptm.projectId = ?
      ORDER BY ptm.assignedAt ASC
    `, [id]);

        // Get images
        const images = await allQuery(`
      SELECT pi.*, e.name as uploaderName
      FROM project_images pi
      JOIN employees e ON pi.uploadedBy = e.id
      WHERE pi.projectId = ?
      ORDER BY pi.dayNumber ASC, pi.createdAt DESC
    `, [id]);

        project.teamMembers = teamMembers;
        project.images = images;

        res.json(project);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// Update project (admin only)
router.patch('/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status, startDate, endDate } = req.body;

        const project = await getQuery('SELECT * FROM projects WHERE id = ?', [id]);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const newName = name !== undefined ? name : project.name;
        const newDescription = description !== undefined ? description : project.description;
        const newStatus = status !== undefined ? status : project.status;
        const newStartDate = startDate !== undefined ? startDate : project.startDate;
        const newEndDate = endDate !== undefined ? endDate : project.endDate;

        await runQuery(
            'UPDATE projects SET name = ?, description = ?, status = ?, startDate = ?, endDate = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            [newName, newDescription, newStatus, newStartDate, newEndDate, id]
        );

        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Assign employees to project (admin only)
router.post('/:id/assign', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { employeeIds } = req.body;

        if (!employeeIds || !Array.isArray(employeeIds) || employeeIds.length === 0) {
            return res.status(400).json({ error: 'Employee IDs array is required' });
        }

        const project = await getQuery('SELECT id FROM projects WHERE id = ?', [id]);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Remove existing assignments
        await runQuery('DELETE FROM project_team_members WHERE projectId = ?', [id]);

        // Add new assignments
        for (const employeeId of employeeIds) {
            const employee = await getQuery('SELECT id FROM employees WHERE id = ? AND isActive = 1', [employeeId]);
            if (employee) {
                await runQuery(
                    'INSERT INTO project_team_members (projectId, employeeId) VALUES (?, ?)',
                    [id, employeeId]
                );
            }
        }

        res.json({ message: 'Team members assigned successfully' });
    } catch (error) {
        console.error('Assign team members error:', error);
        res.status(500).json({ error: 'Failed to assign team members' });
    }
});

// Admin creates complaint for a user
router.post('/complaints', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { userId, subject, description } = req.body;

        if (!userId || !subject || !description) {
            return res.status(400).json({ error: 'User ID, subject, and description are required' });
        }

        // Verify user exists
        const user = await getQuery('SELECT id FROM users WHERE id = ?', [userId]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await runQuery(
            'INSERT INTO complaints (userId, subject, description, createdBy) VALUES (?, ?, ?, ?)',
            [userId, subject, description, req.user.userId]
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

// Admin creates enquiry
router.post('/enquiries', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const result = await runQuery(
            'INSERT INTO enquiries (name, email, phone, service, message, createdBy) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, phone, service, message, req.user.userId]
        );

        res.status(201).json({
            message: 'Enquiry created successfully',
            enquiryId: result.id
        });
    } catch (error) {
        console.error('Admin create enquiry error:', error);
        res.status(500).json({ error: 'Failed to create enquiry' });
    }
});

export default router;
