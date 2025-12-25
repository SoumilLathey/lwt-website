import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

async function createTestEmployee() {
    const testEmployee = {
        email: 'test@latheyweightrix.com',
        password: 'employee123',
        name: 'Test Employee',
        phone: '1234567890',
        department: 'Technical Support'
    };

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(testEmployee.password, 10);

        // Insert employee
        db.run(
            'INSERT INTO employees (email, password, name, phone, department, isActive) VALUES (?, ?, ?, ?, ?, 1)',
            [testEmployee.email, hashedPassword, testEmployee.name, testEmployee.phone, testEmployee.department],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        console.log('❌ Employee already exists with this email!');
                    } else {
                        console.error('❌ Error creating employee:', err.message);
                    }
                } else {
                    console.log('✅ Test employee created successfully!');
                    console.log('\n📋 Employee Details:');
                    console.log('   Email:', testEmployee.email);
                    console.log('   Password:', testEmployee.password);
                    console.log('   Name:', testEmployee.name);
                    console.log('   Department:', testEmployee.department);
                    console.log('\n🔗 Login at: http://localhost:5173/employee/login');
                }
                db.close();
            }
        );
    } catch (error) {
        console.error('❌ Error:', error.message);
        db.close();
    }
}

createTestEmployee();
