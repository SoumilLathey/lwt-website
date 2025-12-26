# Weighing Equipment Feature - Admin Only

## Overview
Weighing equipment management has been moved to **admin-only access**. Only administrators can add, view, and manage weighing equipment for clients through the Admin Dashboard.

## Changes Made

### Access Control
- ❌ **Removed** from Client Dashboard - Clients can no longer add their own equipment
- ✅ **Added** to Admin Dashboard - Admins manage equipment for all clients
- ✅ **Admin-only API routes** - All equipment endpoints require admin authentication

## Features

### 1. Database Schema
The `weighing_equipment` table stores:
- `userId`: Foreign key to users table (which client owns the equipment)
- `equipmentType`: Type of weighing equipment
- `model`: Equipment model number
- `capacity`: Weight capacity
- `serialNumber`: Serial number (optional)
- `installationDate`: Date of installation (optional)
- `location`: Installation location (optional)
- `status`: Equipment status (Active/Maintenance/Inactive)
- `notes`: Additional notes (optional)
- Timestamps for created and updated dates

### 2. Admin API Endpoints
Located in `/api/admin/weighing-equipment`:

#### GET `/api/admin/weighing-equipment/user/:userId`
- Fetches all weighing equipment for a specific user
- **Admin only**

#### POST `/api/admin/weighing-equipment`
- Adds new weighing equipment for a user
- Required fields: `userId`, `equipmentType`, `model`, `capacity`
- **Admin only**

#### DELETE `/api/admin/weighing-equipment/:id`
- Deletes equipment
- **Admin only**

### 3. Admin Dashboard Features

#### Equipment Button
- Located in the **Users** tab of Admin Dashboard
- Each user row has an "Equipment" button (blue)
- Click to open the equipment management modal

#### Equipment Modal
- **View existing equipment** in a table format showing:
  - Equipment type, model, capacity
  - Serial number, location, status
  - Delete button for each item
- **Add new equipment** form with fields for:
  - Equipment type (dropdown with predefined options)
  - Model, capacity, serial number
  - Installation date, location
  - Status (Active/Maintenance/Inactive)
  - Notes

## How to Use (Admin Only)

1. Log in as an **admin**
2. Go to **Admin Dashboard**
3. Click on the **Users** tab
4. Find the client you want to manage
5. Click the blue **"Equipment"** button
6. In the modal:
   - View all existing equipment for that client
   - Add new equipment using the form
   - Delete equipment if needed

## Equipment Types Available
- Platform Scale
- Weighbridge
- Bench Scale
- Crane Scale
- Counting Scale
- Analytical Balance
- Other

## Security
- ✅ All routes require admin authentication
- ✅ Only admins can view/add/delete equipment
- ✅ Clients can no longer self-manage equipment
- ✅ Equipment is associated with specific users

## Files Modified

### Backend:
1. **server/routes/admin.js** - Added admin-only equipment routes
2. **server/routes/users.js** - Removed client equipment routes
3. **server/database.js** - Table already exists from previous implementation

### Frontend:
1. **src/pages/AdminDashboard.jsx** - Added equipment button and modal
2. **src/pages/UserDashboard.jsx** - Removed equipment tab and functionality
3. **src/pages/UserDashboard.css** - Equipment styles remain (unused, can be cleaned up)

## Deployment
Changes have been deployed to:
- **Frontend**: https://lwt-website-lake.vercel.app
- **Backend**: https://lwt-backend.onrender.com

## Testing
1. Log in as admin
2. Navigate to Admin Dashboard → Users tab
3. Click "Equipment" button for any user
4. Add/view/delete equipment
5. Verify clients cannot access equipment management

## Rationale for Admin-Only Access
This change ensures:
- **Data accuracy** - Admins verify equipment details
- **Quality control** - Prevents incorrect or duplicate entries
- **Centralized management** - Single source of truth
- **Professional workflow** - Matches solar installation management pattern
