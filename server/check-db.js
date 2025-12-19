import { allQuery } from './database.js';

console.log('\n=== DATABASE DIAGNOSTIC ===\n');

async function checkDatabase() {
    try {
        // Check all users
        console.log('📊 ALL USERS:');
        const users = await allQuery('SELECT id, name, email, isAdmin FROM users');
        console.table(users);

        // Check all complaints
        console.log('\n📋 ALL COMPLAINTS:');
        const complaints = await allQuery('SELECT * FROM complaints');
        if (complaints.length === 0) {
            console.log('❌ No complaints found in database');
        } else {
            console.table(complaints);
        }

        // Check all enquiries
        console.log('\n📧 ALL ENQUIRIES:');
        const enquiries = await allQuery('SELECT * FROM enquiries');
        if (enquiries.length === 0) {
            console.log('❌ No enquiries found in database');
        } else {
            console.table(enquiries);
        }

        // Check specific admin user
        console.log('\n👤 CHECKING soumil.lathey@gmail.com:');
        const adminUser = await allQuery('SELECT * FROM users WHERE email = ?', ['soumil.lathey@gmail.com']);
        if (adminUser.length > 0) {
            const user = adminUser[0];
            console.log('✅ User found:');
            console.log('   ID:', user.id);
            console.log('   Name:', user.name);
            console.log('   Email:', user.email);
            console.log('   isAdmin:', user.isAdmin, user.isAdmin === 1 ? '(YES - IS ADMIN)' : '(NO - NOT ADMIN)');
            console.log('   Has password:', user.password ? 'Yes' : 'No');
            console.log('   Created:', user.createdAt);
        } else {
            console.log('❌ User NOT found in database');
            console.log('   This email might not be registered yet.');
        }

        console.log('\n=== END DIAGNOSTIC ===\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkDatabase();
