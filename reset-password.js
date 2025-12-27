const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./server/database.sqlite');

const email = 'soumil.lathey@gmail.com';
const newPassword = 'Soumil@2024'; // Your new password

async function resetPassword() {
    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in database
        db.run(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, email],
            function (err) {
                if (err) {
                    console.error('Error updating password:', err);
                    return;
                }

                if (this.changes === 0) {
                    console.log('\n❌ No user found with email:', email);
                } else {
                    console.log('\n✅ Password reset successful!');
                    console.log('\n=== LOGIN CREDENTIALS ===');
                    console.log('Email:', email);
                    console.log('Password:', newPassword);
                    console.log('========================\n');
                    console.log('⚠️  IMPORTANT: Change this password after logging in!\n');
                }

                db.close();
            }
        );
    } catch (error) {
        console.error('Error:', error);
        db.close();
    }
}

resetPassword();
