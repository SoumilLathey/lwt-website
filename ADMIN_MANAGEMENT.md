# Admin Management Guide

## How to Make a User an Admin

There are **3 ways** to change admin settings:

---

## Method 1: Using DB Browser (Easiest - Recommended)

### Step 1: Download DB Browser for SQLite
1. Go to https://sqlitebrowser.org/dl/
2. Download and install **DB Browser for SQLite** (it's free)

### Step 2: Open the Database
1. Launch DB Browser for SQLite
2. Click **"Open Database"**
3. Navigate to: `c:\Users\soumi\OneDrive\Documents\LWT_Site\server\database.sqlite`
4. Click **"Open"**

### Step 3: Make User an Admin
1. Click the **"Browse Data"** tab
2. Select **"users"** table from the dropdown
3. Find the user you want to make admin (look for their email)
4. Double-click the **"isAdmin"** cell for that user
5. Change the value from **0** to **1**
6. Click **"Write Changes"** button (or Ctrl+S)

### Step 4: Done!
- The user is now an admin
- They need to **logout and login again** to see admin features

---

## Method 2: Using SQL Command (Quick)

### Step 1: Open DB Browser
1. Open DB Browser for SQLite
2. Open the database file: `server/database.sqlite`

### Step 2: Run SQL Command
1. Click the **"Execute SQL"** tab
2. Paste this command (replace with actual email):

```sql
UPDATE users SET isAdmin = 1 WHERE email = 'user@example.com';
```

3. Click **"Execute"** (▶️ button)
4. You should see: "Query executed successfully"

### Step 3: Verify
1. Click **"Browse Data"** tab
2. Check the user's `isAdmin` field is now **1**

---

## Method 3: Using Command Line (Advanced)

### For Local Database (Development)

```bash
# Navigate to server directory
cd c:\Users\soumi\OneDrive\Documents\LWT_Site\server

# Open SQLite
sqlite3 database.sqlite

# Run this command (replace email)
UPDATE users SET isAdmin = 1 WHERE email = 'user@example.com';

# Exit
.exit
```

### For Production Database (Render)

**Note:** Render's free tier doesn't provide direct database access. You need to create an admin API endpoint or use the local method before deploying.

---

## Method 4: Create Admin API Endpoint (For Production)

I can create a special API endpoint that allows you to promote users to admin. This is useful for production.

**Would you like me to create this?** It would work like:
- Protected endpoint (requires a secret key)
- Can promote any user to admin via API call
- Useful for production environment

---

## Checking Who is Admin

### Using DB Browser:
1. Open database
2. Browse Data → users table
3. Look at the `isAdmin` column
4. **1** = Admin, **0** = Regular user

### Using SQL:
```sql
SELECT id, name, email, isAdmin FROM users WHERE isAdmin = 1;
```

This shows all admin users.

---

## Removing Admin Access

To remove admin access from a user:

```sql
UPDATE users SET isAdmin = 0 WHERE email = 'user@example.com';
```

---

## Current Admin Users

To see all current admins, run this SQL query:

```sql
SELECT id, name, email, createdAt 
FROM users 
WHERE isAdmin = 1;
```

---

## Important Notes

⚠️ **Security:**
- Keep admin access limited to trusted users only
- Admins can see all complaints and enquiries
- Admins can update complaint statuses

🔄 **After Changes:**
- Users must **logout and login again** for changes to take effect
- The JWT token stores admin status, so it needs to be refreshed

📊 **Production Database:**
- For the deployed version on Render, you'll need to:
  1. Access Render dashboard
  2. Go to your backend service
  3. Use the Shell tab to run SQL commands
  4. Or create an admin API endpoint (I can help with this)

---

## Quick Reference

| Task | SQL Command |
|------|-------------|
| Make user admin | `UPDATE users SET isAdmin = 1 WHERE email = 'email@example.com';` |
| Remove admin | `UPDATE users SET isAdmin = 0 WHERE email = 'email@example.com';` |
| List all admins | `SELECT * FROM users WHERE isAdmin = 1;` |
| List all users | `SELECT id, name, email, isAdmin FROM users;` |

---

## Need Help?

If you need to:
- Create an admin API endpoint for production
- Bulk update multiple users
- Add more admin features

Just let me know! 🚀
