# LWT Backend Server Setup

## Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Create a `.env` file in the `server` directory with the following content:

```env
# JWT Secret (change this to a random string in production)
JWT_SECRET=lwt-super-secret-jwt-key-2024

# Email Configuration (Gmail)
# You need to create a Gmail App Password:
# 1. Go to your Google Account settings
# 2. Security > 2-Step Verification > App passwords
# 3. Generate a new app password for "Mail"
# 4. Use that password below
EMAIL_USER=latheysoumil@gmail.com
EMAIL_PASSWORD=your-gmail-app-password-here

# Server Port
PORT=5000
```

## Getting Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to "App passwords"
5. Select "Mail" and generate a new password
6. Copy the generated password and use it in the `.env` file

## Running the Server

```bash
npm start
```

The server will start on http://localhost:5000

## Running Both Frontend and Backend

From the root directory:

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
npm run dev
```

## API Endpoints

- **Authentication**
  - POST /api/auth/signup - User registration
  - POST /api/auth/login - User login
  - GET /api/auth/verify - Verify JWT token

- **User Management**
  - GET /api/users/profile - Get user profile
  - GET /api/users/installations - Get solar installations
  - PUT /api/users/profile - Update profile

- **Complaints**
  - POST /api/complaints - Create complaint
  - GET /api/complaints/user - Get user's complaints
  - GET /api/complaints/all - Get all complaints (admin)
  - PATCH /api/complaints/:id - Update complaint status

- **Enquiries**
  - POST /api/enquiries - Submit enquiry
  - GET /api/enquiries - Get all enquiries (admin)

## Creating an Admin User

After starting the server, you can manually create an admin user by:

1. Register a normal user through the signup page
2. Open the SQLite database file: `server/database.sqlite`
3. Update the user's `isAdmin` field to 1:
   ```sql
   UPDATE users SET isAdmin = 1 WHERE email = 'your-admin-email@example.com';
   ```

Or use a SQLite browser like DB Browser for SQLite to edit the database.
