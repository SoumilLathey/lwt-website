
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

const resetAdmin = async () => {
    const email = 'admin@lwt.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error('Error finding user:', err);
            return;
        }

        if (row) {
            console.log('Admin user found. Resetting password...');
            db.run('UPDATE users SET password = ?, isAdmin = 1, isVerified = 1 WHERE email = ?', [hashedPassword, email], (err) => {
                if (err) console.error('Error updating admin:', err);
                else console.log('Admin password reset to: password123');
            });
        } else {
            console.log('Admin user NOT found. Creating...');
            db.run(
                'INSERT INTO users (email, password, name, phone, isAdmin, isVerified) VALUES (?, ?, ?, ?, 1, 1)',
                [email, hashedPassword, 'Admin User', '1234567890'],
                (err) => {
                    if (err) console.error('Error creating admin:', err);
                    else console.log('Admin user created with password: password123');
                }
            );
        }
    });
};

resetAdmin();
