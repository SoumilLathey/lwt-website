# New Features Guide - Projects & Enhanced Employee System

## Overview
This guide covers the new features added to the LWT employee management system:
1. Single photo upload for complaints/enquiries (photo with client)
2. Admin can create complaints and enquiries directly
3. Project management system with team assignments and daily progress tracking

---

## 1. Single Photo Upload for Complaints/Enquiries

### What Changed
- **Before**: Employees could upload multiple "before" and "after" images
- **Now**: Employees upload only ONE photo with the client

### How It Works

#### For Employees:
When uploading an image for a complaint or enquiry:
```javascript
POST /api/employees/complaints/:id/images
POST /api/employees/enquiries/:id/images

Body (FormData):
- image: File (required)
- description: String (optional, defaults to "Photo with client")
```

**Important**: Only ONE image can be uploaded per complaint/enquiry. If you try to upload a second image, you'll get an error.

#### API Response:
```json
{
  "message": "Image uploaded successfully",
  "imagePath": "/uploads/image-1234567890.jpg"
}
```

---

## 2. Admin Can Create Complaints & Enquiries

### Admin Create Complaint
Admins can now create complaints on behalf of users.

**Endpoint**: `POST /api/projects/complaints`

**Request Body**:
```json
{
  "userId": 1,
  "subject": "Equipment malfunction",
  "description": "The weighing scale is showing incorrect readings"
}
```

**Response**:
```json
{
  "message": "Complaint created successfully",
  "complaintId": 5
}
```

### Admin Create Enquiry
Admins can create enquiries directly in the system.

**Endpoint**: `POST /api/projects/enquiries`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "service": "Solar EPC",
  "message": "Interested in 5kW solar installation"
}
```

**Response**:
```json
{
  "message": "Enquiry created successfully",
  "enquiryId": 12
}
```

---

## 3. Project Management System

### Overview
The project system allows admins to:
- Create projects with name and description
- Assign multiple employees to a project team
- Track daily progress through images uploaded by team members
- Mark final completion images

### For Admins

#### Create a Project
**Endpoint**: `POST /api/projects`

**Request Body**:
```json
{
  "name": "Solar Installation - ABC Factory",
  "description": "10kW rooftop solar installation project",
  "startDate": "2025-01-01",
  "endDate": "2025-01-15",
  "employeeIds": [1, 2, 3]
}
```

**Response**:
```json
{
  "message": "Project created successfully",
  "projectId": 1
}
```

#### Get All Projects
**Endpoint**: `GET /api/projects`

Returns all projects with team members and images.

#### Get Single Project
**Endpoint**: `GET /api/projects/:id`

Returns detailed project information including:
- Project details
- Team members
- All uploaded images (sorted by day number)

#### Update Project
**Endpoint**: `PATCH /api/projects/:id`

**Request Body**:
```json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "Completed",
  "startDate": "2025-01-01",
  "endDate": "2025-01-20"
}
```

#### Assign Team Members
**Endpoint**: `POST /api/projects/:id/assign`

**Request Body**:
```json
{
  "employeeIds": [1, 2, 3, 4]
}
```

This replaces all existing team members with the new list.

---

### For Employees

#### View Assigned Projects
**Endpoint**: `GET /api/employees/projects`

Returns all projects assigned to the logged-in employee, including:
- Project details
- Team members
- All progress images

**Response**:
```json
[
  {
    "id": 1,
    "name": "Solar Installation - ABC Factory",
    "description": "10kW rooftop solar installation",
    "status": "In Progress",
    "creatorName": "Admin User",
    "teamMembers": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "department": "Installation"
      }
    ],
    "images": [
      {
        "id": 1,
        "dayNumber": 1,
        "imagePath": "/uploads/projects/project-123.jpg",
        "uploaderName": "John Doe",
        "isFinal": 0,
        "description": "Foundation work completed"
      }
    ]
  }
]
```

#### Upload Daily Progress Image
**Endpoint**: `POST /api/employees/projects/:id/images`

**Request Body (FormData)**:
```javascript
{
  image: File (required),
  dayNumber: "1" (required - must be a positive integer),
  isFinal: "false" (optional - "true" or "false"),
  description: "Foundation work completed" (optional)
}
```

**Example Usage**:
```javascript
const formData = new FormData();
formData.append('image', imageFile);
formData.append('dayNumber', '1');
formData.append('description', 'Day 1: Site preparation completed');
formData.append('isFinal', 'false');

fetch('/api/employees/projects/1/images', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

**Response**:
```json
{
  "message": "Project image uploaded successfully",
  "imagePath": "/uploads/projects/project-1234567890.jpg",
  "dayNumber": 1,
  "isFinal": false
}
```

#### Upload Final Image
Same as daily progress, but set `isFinal: "true"`:

```javascript
formData.append('isFinal', 'true');
formData.append('description', 'Project completed - final installation');
```

#### Get Project Images
**Endpoint**: `GET /api/employees/projects/:id/images`

Returns all images for a specific project, sorted by day number.

---

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
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
```

### Project Team Members Table
```sql
CREATE TABLE project_team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  projectId INTEGER NOT NULL,
  employeeId INTEGER NOT NULL,
  role TEXT,
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
  dayNumber INTEGER NOT NULL,
  isFinal INTEGER DEFAULT 0,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projectId) REFERENCES projects(id),
  FOREIGN KEY (uploadedBy) REFERENCES employees(id)
)
```

---

## Testing the Features

### 1. Test Single Photo Upload
1. Login as an employee
2. View assigned complaint/enquiry
3. Upload one photo
4. Try to upload another - should get error

### 2. Test Admin Create Complaint/Enquiry
1. Login as admin
2. Use admin panel to create complaint for a user
3. Create enquiry directly
4. Verify they appear in the system

### 3. Test Project Management
1. **As Admin**:
   - Create a new project
   - Assign 2-3 employees to it
   - View project details

2. **As Employee**:
   - Login as assigned employee
   - View projects list
   - Upload Day 1 image
   - Upload Day 2 image
   - Upload final image with isFinal=true
   - View all project images

---

## API Endpoints Summary

### Admin Routes (require admin authentication)
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `PATCH /api/projects/:id` - Update project
- `POST /api/projects/:id/assign` - Assign team members
- `POST /api/projects/complaints` - Create complaint
- `POST /api/projects/enquiries` - Create enquiry

### Employee Routes (require employee authentication)
- `GET /api/employees/projects` - Get assigned projects
- `POST /api/employees/projects/:id/images` - Upload progress image
- `GET /api/employees/projects/:id/images` - Get project images
- `POST /api/employees/complaints/:id/images` - Upload single photo
- `POST /api/employees/enquiries/:id/images` - Upload single photo

---

## Notes

1. **Image Limits**:
   - Complaints/Enquiries: 1 photo maximum
   - Projects: Unlimited daily progress photos
   - File size limit: 5MB per image
   - Allowed formats: JPEG, JPG, PNG, GIF, WEBP

2. **Day Numbers**:
   - Must be positive integers (1, 2, 3, ...)
   - Multiple images can have the same day number
   - Images are sorted by day number, then by upload time

3. **Final Images**:
   - Mark with `isFinal: true`
   - Can have multiple final images if needed
   - Typically uploaded on the last day

4. **Permissions**:
   - Only assigned employees can upload to their projects
   - Only admins can create/modify projects
   - Employees can only view their assigned projects
