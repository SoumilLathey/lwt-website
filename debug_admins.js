
import sqlite3 from 'sqlite3';
import { open } from 'sqlite3';

const dbPath = './server/database.sqlite';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        checkAdmins();
    }
});

function checkAdmins() {
    db.all("SELECT id, email, name, isAdmin FROM users", [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log("All Users:");
        rows.forEach((row) => {
            console.log(`${row.id}: ${row.email} - isAdmin: ${row.isAdmin} (Type: ${typeof row.isAdmin})`);
        });

        // Check specifically for soumil
        const soumil = rows.find(r => r.email === 'soumil.lathey@gmail.com');
        if (soumil) {
            console.log("\nDetails for Soumil:");
            console.log(soumil);
        } else {
            console.log("\nSoumil not found in DB");
        }
    });
}
