import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./server/database.db');

db.all('SELECT id, name, email, isAdmin FROM users WHERE isAdmin = 1', [], (err, rows) => {
    if (err) {
        console.error('Error:', err);
        db.close();
        return;
    }

    console.log('\n=== ADMIN ACCOUNTS ===');
    if (rows.length === 0) {
        console.log('No admin accounts found!');
    } else {
        rows.forEach(row => {
            console.log(`\nID: ${row.id}`);
            console.log(`Name: ${row.name}`);
            console.log(`Email: ${row.email}`);
        });
    }
    console.log('\n=====================\n');
    console.log('Note: Passwords are hashed and cannot be retrieved.');
    console.log('If you forgot your password, you can reset it or create a new admin account.\n');

    db.close();
});
