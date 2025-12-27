import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

const email = 'soumil.lathey@gmail.com';
const newPassword = 'Soumil@2024';

async function resetPassword() {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        db.run(
            'UPDATE users SET password = ?, isAdmin = 1, isVerified = 1 WHERE email = ?',
            [hashedPassword, email],
            function (err) {
                if (err) {
                    console.error('❌ Error updating password:', err);
                    db.close();
                    return;
                }

                if (this.changes === 0) {
                    console.log('\n❌ No user found with email:', email);
                    console.log('Creating new admin user...\n');

                    db.run(
                        'INSERT INTO users (email, password, name, phone, isAdmin, isVerified) VALUES (?, ?, ?, ?, 1, 1)',
                        [email, hashedPassword, 'Soumil Lathey', '1234567890'],
                        function (err) {
                            if (err) {
                                console.error('❌ Error creating user:', err);
                            } else {
                                console.log('✅ Admin user created successfully!');
                                console.log('\n=== LOGIN CREDENTIALS ===');
                                console.log('Email:', email);
                                console.log('Password:', newPassword);
                                console.log('========================\n');
                            }
                            db.close();
                        }
                    );
                } else {
                    console.log('\n✅ Password reset successful!');
                    console.log('\n=== LOGIN CREDENTIALS ===');
                    console.log('Email:', email);
                    console.log('Password:', newPassword);
                    console.log('========================\n');
                    db.close();
                }
            }
        );
    } catch (error) {
        console.error('❌ Error:', error);
        db.close();
    }
}

resetPassword();
