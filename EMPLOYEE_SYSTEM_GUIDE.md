# Employee Management System - Implementation Guide

## Overview
A comprehensive employee management system has been added to your LWT website, allowing company employees to log in, view assigned complaints/queries, and upload before/after images.

## Features Implemented

### 1. **Employee Login System**
- **URL**: `/employee/login`
- Separate login portal for company employees
- Secure authentication with JWT tokens
- Modern, premium UI design

### 2. **Employee Dashboard**
- **URL**: `/employee/dashboard`
- View all assigned complaints and queries
- Upload before/after images for:
  - **Complaints**: Before repair & After repair photos
  - **Queries**: Before installation & After installation photos
- Update status of assigned tasks
- Clean, intuitive interface

### 3. **Admin Panel Enhancements**
The admin panel now includes:
- **Employee Management Tab**
  - Create new employees
  - View all employees
  - Activate/deactivate employees
  - See employee details (name, email, phone, department)
  
- **Assignment Features**
  - Assign complaints to specific employees
  - Assign queries to specific employees
  - Dropdown selection for easy assignment
  - View who is assigned to each task
  
- **Image Viewing**
  - View all uploaded images by employees
  - See before/after repair photos for complaints
  - See before/after installation photos for queries

## Database Schema

### New Tables Created:

1. **employees**
   - id, email, password, name, phone, department
   - isActive (to enable/disable employees)
   - createdAt

2. **complaint_images**
   - id, complaintId, imageType (before/after)
   - imagePath, uploadedBy (employeeId)
   - createdAt

3. **enquiry_images**
   - id, enquiryId, imageType (before/after)
   - imagePath, uploadedBy (employeeId)
   - createdAt

### Updated Tables:

1. **complaints**
   - Added: assignedTo (foreign key to employees)

2. **enquiries**
   - Added: assignedTo (foreign key to employees)
   - Added: status field

## API Endpoints

### Employee Routes (`/api/employees`)
- `POST /login` - Employee login
- `GET /complaints` - Get assigned complaints
- `GET /enquiries` - Get assigned queries
- `POST /complaints/:id/images` - Upload complaint image
- `POST /enquiries/:id/images` - Upload enquiry image
- `PATCH /complaints/:id/status` - Update complaint status
- `PATCH /enquiries/:id/status` - Update enquiry status

### Admin Routes (`/api/admin`)
- `POST /employees` - Create new employee
- `GET /employees` - List all employees
- `POST /complaints/:id/assign` - Assign complaint to employee
- `POST /enquiries/:id/assign` - Assign enquiry to employee
- `PATCH /employees/:id/toggle` - Activate/deactivate employee

## How to Use

### For Admins:

1. **Create an Employee**
   - Go to Admin Dashboard → Employees tab
   - Click "Add Employee" button
   - Fill in: Name, Email, Password, Phone, Department
   - Click "Create Employee"

2. **Assign Complaints/Queries**
   - Go to Complaints or Enquiries tab
   - Find the complaint/query you want to assign
   - Use the "Assign to Employee" dropdown
   - Select an employee from the list
   - Assignment is saved automatically

3. **View Employee Work**
   - See uploaded images in the "Uploaded Images" section
   - Click on image links to view full-size photos
   - Monitor employee progress

4. **Manage Employees**
   - View all employees in the Employees tab
   - Toggle Active/Inactive status
   - See employee details and join date

### For Employees:

1. **Login**
   - Navigate to `/employee/login`
   - Enter your email and password
   - Click "Login"

2. **View Assigned Tasks**
   - Dashboard shows all complaints and queries assigned to you
   - Switch between tabs to see different task types

3. **Upload Images**
   - For each complaint/query, you'll see upload buttons
   - Click "Upload" under "Before Repair/Installation"
   - Select and upload the image
   - Repeat for "After Repair/Installation"
   - Once uploaded, images can be viewed by clicking "View Image"

4. **Update Status**
   - Use the status buttons at the bottom of each task
   - Options: Pending, In Progress, Resolved/Completed
   - Click the appropriate status to update

## File Structure

### Backend Files:
```
server/
├── routes/
│   ├── employees.js (NEW)
│   ├── admin.js (UPDATED)
│   ├── complaints.js (UPDATED)
│   └── enquiries.js (UPDATED)
├── database.js (UPDATED)
└── server.js (UPDATED)
```

### Frontend Files:
```
src/
├── pages/
│   ├── EmployeeLogin.jsx (NEW)
│   ├── EmployeeLogin.css (NEW)
│   ├── EmployeeDashboard.jsx (NEW)
│   ├── EmployeeDashboard.css (NEW)
│   ├── AdminDashboard.jsx (UPDATED)
│   └── AdminDashboard.css (UPDATED)
└── App.jsx (UPDATED)
```

## Image Upload Details

- **Supported Formats**: JPEG, JPG, PNG, GIF
- **Maximum Size**: 5MB per image
- **Storage**: Images are stored in `server/uploads/` directory
- **Access**: Images are served via `/uploads/` endpoint

## Security Features

- Employee authentication with JWT tokens
- Password hashing with bcrypt
- Employee-specific access control
- Only assigned tasks are visible to employees
- Only active employees can log in
- Admin-only routes for employee management

## Next Steps

1. **Create Your First Employee**
   - Log in as admin
   - Go to Employees tab
   - Add an employee account

2. **Test the System**
   - Log in as the employee
   - Verify they can see their dashboard
   - Test image uploads

3. **Assign Tasks**
   - As admin, assign some complaints/queries
   - Verify employee can see assigned tasks

## Troubleshooting

### Employee Can't Log In
- Verify employee account is active (green status in admin panel)
- Check email and password are correct
- Ensure employee was created through admin panel

### Images Not Uploading
- Check file size (must be under 5MB)
- Verify file format (JPEG, JPG, PNG, GIF only)
- Ensure employee is assigned to the task

### Assignment Not Working
- Refresh the page after assigning
- Verify employee is active
- Check browser console for errors

## Support

For any issues or questions, check:
1. Browser console for error messages
2. Server logs for backend errors
3. Database tables for data integrity

---

**Congratulations!** Your employee management system is now fully operational. Employees can log in, view their assigned tasks, upload images, and update statuses, while admins have full control over employee management and task assignments.
