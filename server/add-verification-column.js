
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
    addVerificationColumn();
});

function addVerificationColumn() {
    db.serialize(() => {
        // Check if column exists strictly speaking is hard in sqlite simply, but we can try to add it and ignore error or check table info.
        // Easiest is to try adding it.

        console.log('Adding isVerified column to users table...');

        db.run(`ALTER TABLE users ADD COLUMN isVerified INTEGER DEFAULT 0`, (err) => {
            if (err) {
                if (err.message.includes('duplicate column name')) {
                    console.log('Column isVerified already exists.');
                } else {
                    console.error('Error adding column:', err);
                    process.exit(1);
                }
            } else {
                console.log('Column isVerified added successfully.');
            }

            // Update existing users to be verified
            console.log('Updating existing users to be verified...');
            db.run(`UPDATE users SET isVerified = 1`, (err) => {
                if (err) {
                    console.error('Error updating existing users:', err);
                } else {
                    console.log('All existing users set to verified.');
                }
                db.close();
            });
        });
    });
}
