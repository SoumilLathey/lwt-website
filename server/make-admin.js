// Quick script to make a user admin
// Usage: node make-admin.js <email>

const email = process.argv[2];

if (!email) {
    console.log('❌ Please provide an email address');
    console.log('Usage: node make-admin.js <email>');
    process.exit(1);
}

const ADMIN_SECRET = 'lwt-admin-secret-2024-change-me';
const API_URL = 'http://localhost:5000';

async function makeAdmin() {
    try {
        const response = await fetch(`${API_URL}/api/admin/promote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                secret: ADMIN_SECRET
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Success!');
            console.log('📋 User Details:');
            console.log('   Name:', data.user.name);
            console.log('   Email:', data.user.email);
            console.log('   Is Admin:', data.user.isAdmin);
            console.log('\n🎉', data.message);
        } else {
            console.log('❌ Error:', data.error);
        }
    } catch (error) {
        console.error('❌ Failed to connect to server:', error.message);
        console.log('\n💡 Make sure the backend server is running on port 5000');
    }
}

makeAdmin();
