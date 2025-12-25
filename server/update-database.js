import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

console.log('🔧 Updating database schema...\n');

// Add assignedTo column to complaints table
db.run('ALTER TABLE complaints ADD COLUMN assignedTo INTEGER', (err) => {
    if (err) {
        if (err.message.includes('duplicate column name')) {
            console.log('✓ complaints.assignedTo already exists');
        } else {
            console.error('❌ Error adding complaints.assignedTo:', err.message);
        }
    } else {
        console.log('✅ Added assignedTo column to complaints table');
    }
});

// Add assignedTo column to enquiries table
db.run('ALTER TABLE enquiries ADD COLUMN assignedTo INTEGER', (err) => {
    if (err) {
        if (err.message.includes('duplicate column name')) {
            console.log('✓ enquiries.assignedTo already exists');
        } else {
            console.error('❌ Error adding enquiries.assignedTo:', err.message);
        }
    } else {
        console.log('✅ Added assignedTo column to enquiries table');
    }
});

// Add status column to enquiries table
db.run('ALTER TABLE enquiries ADD COLUMN status TEXT DEFAULT "Pending"', (err) => {
    if (err) {
        if (err.message.includes('duplicate column name')) {
            console.log('✓ enquiries.status already exists');
        } else {
            console.error('❌ Error adding enquiries.status:', err.message);
        }
    } else {
        console.log('✅ Added status column to enquiries table');
    }

    // Close database after all operations
    setTimeout(() => {
        db.close();
        console.log('\n✅ Database schema update complete!');
        console.log('📝 Please refresh your admin dashboard to see complaints and enquiries.');
    }, 500);
});
