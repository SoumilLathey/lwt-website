# Implementation Plan: Employee Photo Upload & Visit Scheduling

## Overview
Adding employee photo upload during creation, displaying employee info to clients, and allowing employees to schedule visits.

## Database Changes

### 1. Add photo column to employees table
- Add `photoPath TEXT` column to store employee photo
- Migration script to add column to existing database

### 2. Create visit_schedules table
```sql
CREATE TABLE visit_schedules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  complaintId INTEGER,
  enquiryId INTEGER,
  employeeId INTEGER NOT NULL,
  scheduledDate DATE NOT NULL,
  scheduledTime TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'Scheduled',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (complaintId) REFERENCES complaints(id),
  FOREIGN KEY (enquiryId) REFERENCES enquiries(id),
  FOREIGN KEY (employeeId) REFERENCES employees(id)
)
```

## Backend Changes

### 1. Admin Routes (`server/routes/admin.js`)
- **Modify POST /employees**: Add multer middleware to accept photo upload
- Store photo in `/uploads` directory
- Save photo path in database

### 2. Employee Routes (`server/routes/employees.js`)
- **Add POST /complaints/:id/schedule**: Create/update visit schedule for complaint
- **Add POST /enquiries/:id/schedule**: Create/update visit schedule for enquiry
- **Add GET /complaints/:id/schedule**: Get visit schedule for complaint
- **Add GET /enquiries/:id/schedule**: Get visit schedule for enquiry

### 3. Complaints Routes (`server/routes/complaints.js`)
- **Modify GET /user**: Include assigned employee details (name, phone, photo) and visit schedule
- **Modify GET /all**: Include employee photo in response

### 4. Enquiries Routes (`server/routes/enquiries.js`)
- **Modify GET /user**: Include assigned employee details (name, phone, photo) and visit schedule
- **Modify GET /all**: Include employee photo in response

## Frontend Changes

### 1. Admin Dashboard - Employee Creation
- Add file input for employee photo upload
- Preview uploaded photo before submission
- Update form submission to include photo file

### 2. Client Portal - Complaints/Enquiries View
- Display assigned employee card with:
  - Employee photo
  - Employee name
  - Employee phone number
  - Scheduled visit date and time (if scheduled)
- Show "Visit Scheduled" badge when visit is scheduled

### 3. Employee Portal - Task Management
- Add "Schedule Visit" button for each complaint/enquiry
- Modal/form to select date and time
- Display scheduled visits in task list
- Allow updating scheduled visit

## Implementation Steps

1. **Database Migration**
   - Add photoPath column to employees table
   - Create visit_schedules table

2. **Backend Implementation**
   - Update admin employee creation endpoint
   - Add visit scheduling endpoints
   - Update complaint/enquiry endpoints to include employee details

3. **Frontend Implementation**
   - Update admin employee form
   - Update client complaint/enquiry views
   - Add employee visit scheduling UI

4. **Testing**
   - Test employee creation with photo
   - Test visit scheduling
   - Test client view of employee details
   - Test photo display

## Files to Modify

### Backend
- `server/database.js` - Add migration for new column and table
- `server/routes/admin.js` - Update employee creation
- `server/routes/employees.js` - Add scheduling endpoints
- `server/routes/complaints.js` - Include employee details
- `server/routes/enquiries.js` - Include employee details

### Frontend
- Admin dashboard employee form component
- Client portal complaints view
- Client portal enquiries view
- Employee portal task management
