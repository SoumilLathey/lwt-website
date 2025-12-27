import express from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { runQuery, getQuery, allQuery } from '../database.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configure multer for employee photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'employee-' + uniqueSuffix + path.extname(file.originalname));
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

// Force create admin account (creates if doesn't exist, resets password if exists)
router.post('/force-create-admin', async (req, res) => {
    try {
        const { email, password, secret } = req.body;

        // Verify secret key
        if (secret !== ADMIN_SECRET) {
            return res.status(403).json({ error: 'Invalid secret key' });
        }

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user exists
        const user = await getQuery('SELECT id, email, name FROM users WHERE email = ?', [email]);

        const hashedPassword = await bcrypt.hash(password, 10);

        if (user) {
            // User exists - reset password and make admin
            await runQuery(
                'UPDATE users SET password = ?, isAdmin = 1, isVerified = 1 WHERE email = ?',
                [hashedPassword, email]
            );

            return res.json({
                message: 'Admin account updated successfully',
                user: {
                    id: user.id,
                    email: email,
                    name: user.name,
                    isAdmin: true,
                    isVerified: true
                },
                action: 'updated'
            });
        } else {
            // User doesn't exist - create new admin
            const result = await runQuery(
                'INSERT INTO users (email, password, name, phone, isAdmin, isVerified) VALUES (?, ?, ?, ?, 1, 1)',
                [email, hashedPassword, 'Soumil Lathey', '1234567890']
            );

            return res.json({
                message: 'Admin account created successfully',
                user: {
                    id: result.lastID,
                    email: email,
                    name: 'Soumil Lathey',
                    isAdmin: true,
                    isVerified: true
                },
                action: 'created'
            });
        }
    } catch (error) {
        console.error('Force create admin error:', error);
        res.status(500).json({ error: 'Failed to create admin account', details: error.message });
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

// Create new employee (admin only)
router.post('/employees', authenticateToken, isAdmin, upload.single('photo'), async (req, res) => {
    try {
        const { email, password, name, phone, department } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        // Check if employee already exists
        const existingEmployee = await getQuery('SELECT id FROM employees WHERE email = ?', [email]);
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get photo path if uploaded
        const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

        // Create employee
        const result = await runQuery(
            'INSERT INTO employees (email, password, name, phone, department, photoPath) VALUES (?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, name, phone, department, photoPath]
        );

        res.status(201).json({
            message: 'Employee created successfully',
            employeeId: result.id,
            photoPath
        });
    } catch (error) {
        console.error('Create employee error:', error);
        res.status(500).json({ error: 'Failed to create employee' });
    }
});

// Get all employees (admin only)
router.get('/employees', authenticateToken, isAdmin, async (req, res) => {
    try {
        const employees = await allQuery(
            'SELECT id, email, name, phone, department, photoPath, isActive, createdAt FROM employees ORDER BY name ASC'
        );

        res.json(employees);
    } catch (error) {
        console.error('Get employees error:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// Assign complaint to employee (admin only)
router.post('/complaints/:id/assign', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { employeeId } = req.body;

        // Verify complaint exists
        const complaint = await getQuery('SELECT id FROM complaints WHERE id = ?', [id]);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        if (employeeId) {
            // Verify employee exists and is active
            const employee = await getQuery('SELECT id FROM employees WHERE id = ? AND isActive = 1', [employeeId]);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found or inactive' });
            }
        }

        await runQuery(
            'UPDATE complaints SET assignedTo = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            [employeeId || null, id]
        );

        res.json({ message: employeeId ? 'Complaint assigned successfully' : 'Complaint unassigned successfully' });
    } catch (error) {
        console.error('Assign complaint error:', error);
        res.status(500).json({ error: 'Failed to assign complaint' });
    }
});

// Assign enquiry to employee (admin only)
router.post('/enquiries/:id/assign', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { employeeId } = req.body;

        // Verify enquiry exists
        const enquiry = await getQuery('SELECT id FROM enquiries WHERE id = ?', [id]);
        if (!enquiry) {
            return res.status(404).json({ error: 'Enquiry not found' });
        }

        if (employeeId) {
            // Verify employee exists and is active
            const employee = await getQuery('SELECT id FROM employees WHERE id = ? AND isActive = 1', [employeeId]);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found or inactive' });
            }
        }

        await runQuery(
            'UPDATE enquiries SET assignedTo = ? WHERE id = ?',
            [employeeId || null, id]
        );

        res.json({ message: employeeId ? 'Enquiry assigned successfully' : 'Enquiry unassigned successfully' });
    } catch (error) {
        console.error('Assign enquiry error:', error);
        res.status(500).json({ error: 'Failed to assign enquiry' });
    }
});

// Toggle employee active status (admin only)
router.patch('/employees/:id/toggle', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await getQuery('SELECT isActive FROM employees WHERE id = ?', [id]);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const newStatus = employee.isActive === 1 ? 0 : 1;
        await runQuery('UPDATE employees SET isActive = ? WHERE id = ?', [newStatus, id]);

        res.json({
            message: `Employee ${newStatus === 1 ? 'activated' : 'deactivated'} successfully`,
            isActive: newStatus === 1
        });
    } catch (error) {
        console.error('Toggle employee status error:', error);
        res.status(500).json({ error: 'Failed to update employee status' });
    }
});

// Reset employee password (admin only)
router.patch('/employees/:id/reset-password', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'New password is required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await runQuery('UPDATE employees SET password = ? WHERE id = ?', [hashedPassword, id]);

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset employee password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

// Get all users (admin only)
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { status } = req.query;
        let query = 'SELECT id, email, name, phone, isAdmin, isVerified, createdAt FROM users WHERE isAdmin = 0';
        const params = [];

        if (status === 'pending') {
            query += ' AND isVerified = 0';
        } else if (status === 'verified') {
            query += ' AND isVerified = 1';
        }

        query += ' ORDER BY createdAt DESC';

        const users = await allQuery(query, params);
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Verify user (admin only)
router.patch('/users/:id/verify', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerified } = req.body; // Expect boolean or 1/0

        const user = await getQuery('SELECT id FROM users WHERE id = ?', [id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await runQuery('UPDATE users SET isVerified = ? WHERE id = ?', [isVerified ? 1 : 0, id]);

        res.json({
            message: `User ${isVerified ? 'verified' : 'unverified'} successfully`,
            isVerified: !!isVerified
        });
    } catch (error) {
        console.error('Verify user error:', error);
        res.status(500).json({ error: 'Failed to update verification status' });
    }
});

// Update user details (admin only)
router.put('/users/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, pincode } = req.body;

        const user = await getQuery('SELECT id FROM users WHERE id = ?', [id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await runQuery(
            'UPDATE users SET name = ?, email = ?, phone = ?, address = ?, pincode = ? WHERE id = ?',
            [name, email, phone, address, pincode, id]
        );

        res.json({ id, name, email, phone, address, pincode });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Get solar installations for a specific user (admin only)
router.get('/solar-installations/user/:userId', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const installations = await allQuery(
            'SELECT * FROM solar_installations WHERE userId = ? ORDER BY installationDate DESC',
            [userId]
        );
        res.json(installations);
    } catch (error) {
        console.error('Get user solar installations error:', error);
        res.status(500).json({ error: 'Failed to fetch solar installations' });
    }
});

// Add solar installation (admin only)
router.post('/solar-installations', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { userId, capacity, installationDate, address, status } = req.body;

        if (!userId || !capacity || !installationDate || !address) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await runQuery(
            'INSERT INTO solar_installations (userId, capacity, installationDate, address, status) VALUES (?, ?, ?, ?, ?)',
            [userId, capacity, installationDate, address, status || 'Active']
        );

        const newInstallation = await getQuery('SELECT * FROM solar_installations WHERE id = ?', [result.id]);
        res.status(201).json(newInstallation);
    } catch (error) {
        console.error('Add solar installation error:', error);
        res.status(500).json({ error: 'Failed to add solar installation' });
    }
});

// Delete solar installation (admin only)
router.delete('/solar-installations/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await runQuery('DELETE FROM solar_installations WHERE id = ?', [id]);
        res.json({ message: 'Installation deleted successfully' });
    } catch (error) {
        console.error('Delete solar installation error:', error);
        res.status(500).json({ error: 'Failed to delete installation' });
    }
});

// Get weighing equipment for a specific user (admin only)
router.get('/weighing-equipment/user/:userId', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const equipment = await allQuery(
            'SELECT * FROM weighing_equipment WHERE userId = ? ORDER BY createdAt DESC',
            [userId]
        );
        res.json(equipment);
    } catch (error) {
        console.error('Get user weighing equipment error:', error);
        res.status(500).json({ error: 'Failed to fetch weighing equipment' });
    }
});

// Add weighing equipment (admin only)
router.post('/weighing-equipment', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { userId, equipmentType, model, capacity, serialNumber, installationDate, location, status, notes } = req.body;

        if (!userId || !equipmentType || !model || !capacity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await runQuery(
            `INSERT INTO weighing_equipment 
            (userId, equipmentType, model, capacity, serialNumber, installationDate, location, status, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, equipmentType, model, capacity, serialNumber, installationDate, location, status || 'Active', notes]
        );

        const newEquipment = await getQuery('SELECT * FROM weighing_equipment WHERE id = ?', [result.id]);
        res.status(201).json(newEquipment);
    } catch (error) {
        console.error('Add weighing equipment error:', error);
        res.status(500).json({ error: 'Failed to add weighing equipment' });
    }
});

// Delete weighing equipment (admin only)
router.delete('/weighing-equipment/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await runQuery('DELETE FROM weighing_equipment WHERE id = ?', [id]);
        res.json({ message: 'Equipment deleted successfully' });
    } catch (error) {
        console.error('Delete weighing equipment error:', error);
        res.status(500).json({ error: 'Failed to delete equipment' });
    }
});

export default router;


