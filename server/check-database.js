import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.sqlite'));

console.log('\n=== DATABASE DIAGNOSTIC ===\n');

// Check all users
console.log('📊 ALL USERS:');
const users = db.prepare('SELECT id, name, email, isAdmin FROM users').all();
console.table(users);

// Check all complaints
console.log('\n📋 ALL COMPLAINTS:');
const complaints = db.prepare('SELECT * FROM complaints').all();
console.table(complaints);

// Check all enquiries
console.log('\n📧 ALL ENQUIRIES:');
const enquiries = db.prepare('SELECT * FROM enquiries').all();
console.table(enquiries);

// Check specific admin user
console.log('\n👤 CHECKING soumil.lathey@gmail.com:');
const adminUser = db.prepare('SELECT * FROM users WHERE email = ?').get('soumil.lathey@gmail.com');
if (adminUser) {
    console.log('✅ User found:');
    console.log('   Name:', adminUser.name);
    console.log('   Email:', adminUser.email);
    console.log('   isAdmin:', adminUser.isAdmin);
    console.log('   Has password:', adminUser.password ? 'Yes' : 'No');
} else {
    console.log('❌ User NOT found in database');
}

db.close();
console.log('\n=== END DIAGNOSTIC ===\n');
