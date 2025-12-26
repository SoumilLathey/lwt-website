const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./server/database.db');

db.all('SELECT id, name, email, isAdmin FROM users WHERE isAdmin = 1', [], (err, rows) => {
    if (err) {
        console.error('Error:', err);
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
            console.log(`Is Admin: ${row.isAdmin}`);
        });
    }
    console.log('\n=====================\n');

    db.close();
});
