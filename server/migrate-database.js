import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
        process.exit(1);
    } else {
        console.log('Connected to SQLite database for migration');
        runMigration();
    }
});

function runMigration() {
    console.log('Starting database migration...\n');

    // Add createdBy column to complaints table
    db.run(`ALTER TABLE complaints ADD COLUMN createdBy INTEGER`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Error adding createdBy to complaints:', err.message);
        } else {
            console.log('✓ Added createdBy column to complaints table');
        }
    });

    // Add createdBy column to enquiries table
    db.run(`ALTER TABLE enquiries ADD COLUMN createdBy INTEGER`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Error adding createdBy to enquiries:', err.message);
        } else {
            console.log('✓ Added createdBy column to enquiries table');
        }
    });

    // Create projects table
    db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'In Progress',
      createdBy INTEGER NOT NULL,
      startDate DATE,
      endDate DATE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (createdBy) REFERENCES users(id)
    )
  `, (err) => {
        if (err) {
            console.error('Error creating projects table:', err.message);
        } else {
            console.log('✓ Created projects table');
        }
    });

    // Create project_team_members table
    db.run(`
    CREATE TABLE IF NOT EXISTS project_team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER NOT NULL,
      employeeId INTEGER NOT NULL,
      role TEXT,
      assignedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES projects(id),
      FOREIGN KEY (employeeId) REFERENCES employees(id),
      UNIQUE(projectId, employeeId)
    )
  `, (err) => {
        if (err) {
            console.error('Error creating project_team_members table:', err.message);
        } else {
            console.log('✓ Created project_team_members table');
        }
    });

    // Create project_images table
    db.run(`
    CREATE TABLE IF NOT EXISTS project_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER NOT NULL,
      uploadedBy INTEGER NOT NULL,
      imagePath TEXT NOT NULL,
      dayNumber INTEGER NOT NULL,
      isFinal INTEGER DEFAULT 0,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES projects(id),
      FOREIGN KEY (uploadedBy) REFERENCES employees(id)
    )
  `, (err) => {
        if (err) {
            console.error('Error creating project_images table:', err.message);
        } else {
            console.log('✓ Created project_images table');
        }
    });

    // Wait a bit for all operations to complete
    setTimeout(() => {
        console.log('\n✅ Migration completed successfully!');
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            }
            process.exit(0);
        });
    }, 1000);
}
