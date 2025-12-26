# Weighing Equipment Feature

## Overview
A new **Weighing Equipment** tab has been added to the client dashboard, allowing clients to add, view, and manage their weighing equipment details.

## Features Implemented

### 1. Database Schema
- Created `weighing_equipment` table in the database with the following fields:
  - `id`: Primary key
  - `userId`: Foreign key to users table
  - `equipmentType`: Type of weighing equipment (Platform Scale, Weighbridge, etc.)
  - `model`: Equipment model number
  - `capacity`: Weight capacity (e.g., "5000 kg")
  - `serialNumber`: Serial number (optional)
  - `installationDate`: Date of installation (optional)
  - `location`: Installation location (optional)
  - `status`: Equipment status (Active/Inactive)
  - `notes`: Additional notes or specifications (optional)
  - `createdAt`: Timestamp when record was created
  - `updatedAt`: Timestamp when record was last updated

### 2. Backend API Endpoints
Added the following routes in `/api/users/weighing-equipment`:

#### GET `/api/users/weighing-equipment`
- Fetches all weighing equipment for the authenticated user
- Returns array of equipment records

#### POST `/api/users/weighing-equipment`
- Adds new weighing equipment for the authenticated user
- Required fields: `equipmentType`, `model`, `capacity`
- Optional fields: `serialNumber`, `installationDate`, `location`, `notes`

#### PUT `/api/users/weighing-equipment/:id`
- Updates existing equipment (ownership verified)
- Can update all fields including status

#### DELETE `/api/users/weighing-equipment/:id`
- Deletes equipment (ownership verified)
- Requires confirmation from user

### 3. Frontend Features

#### New Dashboard Tab
- Added "Weighing Equipment" tab to the User Dashboard
- Icon: Scale icon from lucide-react

#### Add Equipment Form
- Dropdown for equipment type with predefined options:
  - Platform Scale
  - Weighbridge
  - Bench Scale
  - Crane Scale
  - Counting Scale
  - Analytical Balance
  - Other
- Input fields for model, capacity, serial number
- Date picker for installation date
- Location input field
- Notes textarea for additional specifications
- Form validation for required fields
- Success/error message display

#### Equipment List Display
- Grid layout showing all equipment cards
- Each card displays:
  - Equipment type and status badge
  - Model and capacity
  - Serial number (if provided)
  - Installation date (if provided)
  - Location (if provided)
  - Notes (if provided)
  - Creation date
  - Delete button
- Empty state when no equipment is registered
- Hover effects for better UX

### 4. Styling
- Consistent design with existing dashboard sections
- Responsive layout for mobile devices
- Form rows for better organization
- Card-based equipment display
- Status badges for equipment status
- Delete button with confirmation

## User Permissions
- ✅ Clients can add their own weighing equipment
- ✅ Clients can view their own equipment
- ✅ Clients can delete their own equipment
- ✅ Clients can update their own equipment
- ✅ Ownership verification on all operations

## How to Use

### For Clients:
1. Log in to your account
2. Navigate to the User Dashboard
3. Click on the "Weighing Equipment" tab
4. Fill out the form to add new equipment:
   - Select equipment type
   - Enter model and capacity (required)
   - Optionally add serial number, installation date, location, and notes
5. Click "Add Equipment" to save
6. View all your equipment in the list below
7. Delete equipment using the trash icon if needed

## Technical Details

### Files Modified:
1. **Backend:**
   - `server/database.js` - Added weighing_equipment table
   - `server/routes/users.js` - Added CRUD endpoints

2. **Frontend:**
   - `src/pages/UserDashboard.jsx` - Added equipment tab and functionality
   - `src/pages/UserDashboard.css` - Added styling for equipment section

### Dependencies:
- No new dependencies required
- Uses existing authentication middleware
- Uses existing database connection

## Testing
To test the feature:
1. Start the backend server: `cd server && node server.js`
2. Start the frontend: `npm run dev`
3. Log in as a client
4. Navigate to the Weighing Equipment tab
5. Add, view, and delete equipment

## Future Enhancements (Optional)
- Edit functionality for existing equipment
- Equipment maintenance history
- Equipment images/photos
- Export equipment list to PDF/Excel
- Equipment warranty tracking
- Service reminder notifications
