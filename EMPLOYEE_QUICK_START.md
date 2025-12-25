# Quick Start Guide - Employee System

## ✅ System is Running!

Your frontend is running at: **http://localhost:5173/**
Your backend is running at: **http://localhost:5000/**

## 🚀 Quick Start Steps

### Step 1: Create Your First Employee (As Admin)

1. **Login as Admin**
   - Go to http://localhost:5173/login
   - Login with your admin account

2. **Navigate to Admin Dashboard**
   - After login, go to http://localhost:5173/admin
   - You should see the admin dashboard

3. **Create an Employee**
   - Click on the "**Employees**" tab
   - Click the "**Add Employee**" button
   - Fill in the form:
     - **Name**: John Doe
     - **Email**: john@latheyweightrix.com
     - **Password**: employee123
     - **Phone**: 1234567890
     - **Department**: Technical Support
   - Click "**Create Employee**"

### Step 2: Assign a Complaint/Query to the Employee

1. **Go to Complaints Tab**
   - Click on the "**Complaints**" tab
   - Find a complaint you want to assign

2. **Assign to Employee**
   - Look for the "**Assign to Employee**" dropdown
   - Select "John Doe (Technical Support)"
   - The assignment is saved automatically

3. **Repeat for Queries** (if needed)
   - Go to "**Enquiries**" tab
   - Use the same dropdown to assign queries

### Step 3: Test Employee Login

1. **Open Employee Login Page**
   - Go to http://localhost:5173/employee/login
   - Or click the link at the bottom of the customer login page

2. **Login as Employee**
   - **Email**: john@latheyweightrix.com
   - **Password**: employee123
   - Click "**Login**"

3. **View Employee Dashboard**
   - You should see the employee dashboard
   - Assigned complaints and queries will be visible

### Step 4: Test Image Upload

1. **In Employee Dashboard**
   - Click on a complaint or query
   - Find the "**Before Repair/Installation**" section
   - Click "**Upload**" button
   - Select an image from your computer
   - Wait for upload confirmation

2. **Upload After Image**
   - Click "**Upload**" under "**After Repair/Installation**"
   - Select another image
   - Wait for upload confirmation

3. **View Images**
   - After upload, you'll see "**View Image**" buttons
   - Click to open images in a new tab

### Step 5: Update Status

1. **In Employee Dashboard**
   - Scroll to the bottom of a complaint/query card
   - You'll see status buttons:
     - **Pending**
     - **In Progress**
     - **Resolved/Completed**
   - Click the appropriate status

2. **Verify in Admin Panel**
   - Go back to admin dashboard
   - Check if the status updated
   - Check if images are visible

## 📋 Testing Checklist

- [ ] Admin can create employees
- [ ] Admin can assign complaints to employees
- [ ] Admin can assign queries to employees
- [ ] Employee can login
- [ ] Employee can see assigned tasks
- [ ] Employee can upload before images
- [ ] Employee can upload after images
- [ ] Employee can update status
- [ ] Admin can view uploaded images
- [ ] Admin can see assignment information

## 🎯 Key URLs

| Purpose | URL |
|---------|-----|
| Customer Login | http://localhost:5173/login |
| Employee Login | http://localhost:5173/employee/login |
| Admin Dashboard | http://localhost:5173/admin |
| Employee Dashboard | http://localhost:5173/employee/dashboard |
| User Dashboard | http://localhost:5173/dashboard |

## 💡 Tips

1. **Creating Multiple Employees**
   - Create employees for different departments
   - Examples: Technical Support, Installation Team, Customer Service

2. **Testing Workflow**
   - Create a test complaint as a customer
   - Assign it to an employee as admin
   - Login as employee and upload images
   - Update status
   - Check admin panel to see updates

3. **Image Requirements**
   - Max size: 5MB
   - Formats: JPEG, JPG, PNG, GIF
   - Recommended: Take clear photos showing the issue/installation

## 🔧 Troubleshooting

### Employee Can't See Assigned Tasks
- Make sure the employee is **Active** (check admin panel)
- Verify the assignment was saved (refresh admin page)
- Check that you're logged in as the correct employee

### Image Upload Fails
- Check file size (must be under 5MB)
- Verify file format (JPEG, JPG, PNG, GIF)
- Make sure the task is assigned to you
- Check browser console for errors

### Can't Login as Employee
- Verify email and password are correct
- Check that employee is **Active** in admin panel
- Clear browser cache and try again

## 🎉 Success!

Once you've completed all the steps above, your employee management system is fully functional!

Employees can now:
- ✅ Login to their dashboard
- ✅ View assigned complaints and queries
- ✅ Upload before/after images
- ✅ Update task status

Admins can now:
- ✅ Create and manage employees
- ✅ Assign tasks to employees
- ✅ View employee work and images
- ✅ Monitor progress

---

**Need Help?** Check the `EMPLOYEE_SYSTEM_GUIDE.md` for detailed documentation.
