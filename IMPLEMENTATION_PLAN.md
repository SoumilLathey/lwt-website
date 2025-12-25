# Implementation Plan: Enhanced Employee & Project Management System

## Overview
This plan outlines the implementation of new features for the LWT employee management system.

## Changes Required

### 1. Database Schema Updates

#### New Tables:
- **projects**: Store project information
- **project_team_members**: Many-to-many relationship between projects and employees
- **project_images**: Daily progress images uploaded by team members

#### Modified Tables:
- **complaint_images**: Change to single image upload (remove imageType, add description)
- **enquiry_images**: Change to single image upload (remove imageType, add description)
- **complaints**: Add createdBy field to track if admin created it
- **enquiries**: Add createdBy field to track if admin created it

### 2. Backend API Routes

#### New Routes:
- `POST /api/admin/projects` - Create new project
- `GET /api/admin/projects` - Get all projects
- `GET /api/admin/projects/:id` - Get project details
- `PATCH /api/admin/projects/:id` - Update project
- `POST /api/admin/projects/:id/assign` - Assign employees to project
- `POST /api/admin/complaints` - Admin creates complaint
- `POST /api/admin/enquiries` - Admin creates enquiry

- `GET /api/employees/projects` - Get assigned projects
- `POST /api/employees/projects/:id/images` - Upload daily progress image
- `GET /api/employees/projects/:id/images` - Get project images

#### Modified Routes:
- `POST /api/employees/complaints/:id/images` - Single image upload
- `POST /api/employees/enquiries/:id/images` - Single image upload

### 3. Frontend Components

#### New Components:
- **ProjectManagement.jsx** - Admin project management interface
- **CreateProject.jsx** - Form to create new project
- **ProjectDetails.jsx** - View project details and team
- **EmployeeProjects.jsx** - Employee view of assigned projects
- **ProjectProgress.jsx** - Upload daily progress images

#### Modified Components:
- **AdminPanel.jsx** - Add project management tab
- **EmployeeDashboard.jsx** - Add projects section
- Update image upload components for single photo

## Implementation Steps

1. ✅ Create database migration script
2. ✅ Update database.js with new schema
3. ✅ Create projects API routes
4. ✅ Update admin routes for creating complaints/enquiries
5. ✅ Update employee routes for single image upload
6. ✅ Create frontend components for project management
7. ✅ Update admin panel UI
8. ✅ Update employee dashboard UI
9. ✅ Test all functionality

## Database Schema Details

### Projects Table
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'In Progress', -- 'In Progress', 'Completed', 'On Hold'
  createdBy INTEGER NOT NULL, -- Admin who created it
  startDate DATE,
  endDate DATE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES users(id)
)
```

### Project Team Members Table
```sql
CREATE TABLE project_team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  projectId INTEGER NOT NULL,
  employeeId INTEGER NOT NULL,
  role TEXT, -- Optional: 'Lead', 'Member', etc.
  assignedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id),
  FOREIGN KEY (employeeId) REFERENCES employees(id),
  UNIQUE(projectId, employeeId)
)
```

### Project Images Table
```sql
CREATE TABLE project_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  projectId INTEGER NOT NULL,
  uploadedBy INTEGER NOT NULL,
  imagePath TEXT NOT NULL,
  dayNumber INTEGER NOT NULL, -- Day 1, Day 2, etc.
  isFinal INTEGER DEFAULT 0, -- 1 if this is the final image
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id),
  FOREIGN KEY (uploadedBy) REFERENCES employees(id)
)
```
