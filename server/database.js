import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      pincode TEXT,
      isAdmin INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Employees table
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      department TEXT,
      isActive INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Solar Installations table
  db.run(`
    CREATE TABLE IF NOT EXISTS solar_installations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      capacity TEXT NOT NULL,
      installationDate DATE NOT NULL,
      address TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Complaints table
  db.run(`
    CREATE TABLE IF NOT EXISTS complaints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      assignedTo INTEGER,
      createdBy INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (assignedTo) REFERENCES employees(id),
      FOREIGN KEY (createdBy) REFERENCES users(id)
    )
  `);

  // Complaint Images table
  db.run(`
    CREATE TABLE IF NOT EXISTS complaint_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      complaintId INTEGER NOT NULL,
      imageType TEXT NOT NULL,
      imagePath TEXT NOT NULL,
      uploadedBy INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (complaintId) REFERENCES complaints(id),
      FOREIGN KEY (uploadedBy) REFERENCES employees(id)
    )
  `);

  // Enquiries table
  db.run(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      message TEXT NOT NULL,
      assignedTo INTEGER,
      status TEXT DEFAULT 'Pending',
      createdBy INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assignedTo) REFERENCES employees(id),
      FOREIGN KEY (createdBy) REFERENCES users(id)
    )
  `);

  // Enquiry Images table
  db.run(`
    CREATE TABLE IF NOT EXISTS enquiry_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiryId INTEGER NOT NULL,
      imageType TEXT NOT NULL,
      imagePath TEXT NOT NULL,
      uploadedBy INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (enquiryId) REFERENCES enquiries(id),
      FOREIGN KEY (uploadedBy) REFERENCES employees(id)
    )
  `);

  // Projects table
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
  `);

  // Project Team Members table
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
  `);

  // Project Images table
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
  `);

  console.log('Database tables initialized');
}

// Helper functions
export const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export default db;
