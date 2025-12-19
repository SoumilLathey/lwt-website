# 🔧 Troubleshooting Guide - Admin & Database Issues

## Current Status (Verified)

✅ **Database Check Completed:**
- User `soumil.lathey@gmail.com` EXISTS in database
- User IS set as admin (isAdmin = 1)
- User has a password set

## Issues You're Experiencing

1. ❌ Login shows "Invalid email or password"
2. ❌ Complaints not appearing in database
3. ❌ Admin panel not showing after login

---

## Solution 1: Fix Login Issue

### Problem: Password Mismatch
When you changed the user to admin in DB Browser, you might have accidentally modified the password hash.

### Fix: Reset Your Password

**Option A - Create New Account:**
1. Go to http://localhost:5173
2. Click "Sign Up"
3. Use a NEW email (like `soumil.admin@gmail.com`)
4. Create the account
5. Then use DB Browser to set `isAdmin = 1` for this new account
6. Login with the new account

**Option B - Use Existing Account That Works:**
1. Login with the account that DOES work (the one you used to create complaints)
2. Once logged in, I'll help you make that account admin
3. Then you can use that as your admin account

---

## Solution 2: Verify Complaints Are Saving

### Test if Backend is Working:

1. **Open browser** to http://localhost:5173
2. **Login** with an account that works
3. **Go to Dashboard** → Complaints tab
4. **Submit a test complaint:**
   - Subject: "Test Complaint"
   - Description: "Testing if complaints save to database"
5. **Check if it appears** in your complaints list

### If Complaints Don't Appear:

Run this command to check the database:
```bash
cd c:\\Users\\soumi\\OneDrive\\Documents\\LWT_Site\\server
node check-db.js
```

This will show you ALL data in the database.

---

## Solution 3: Make Working Account Admin

### Step 1: Find Which Account Works

1. Login to the website with the account that WORKS
2. Note down the email address you used

### Step 2: Make That Account Admin

1. Open **DB Browser for SQLite**
2. Open `server/database.sqlite`
3. Go to **Browse Data** tab
4. Select **users** table
5. Find the row with the email that works
6. Change `isAdmin` from `0` to `1`
7. Click **Write Changes** (💾)

### Step 3: Logout and Login Again

1. On the website, click your name → Logout
2. Login again with the same account
3. Click your name → You should see "Admin Panel"

---

## Quick Diagnostic Commands

### Check All Users:
```bash
cd c:\\Users\\soumi\\OneDrive\\Documents\\LWT_Site\\server
node check-db.js
```

This shows:
- All registered users
- Their admin status
- All complaints
- All enquiries

---

## Common Issues & Fixes

### Issue: "Invalid email or password"
**Cause:** Password hash was corrupted when editing database
**Fix:** Create a new account OR use the account that works

### Issue: Complaints not saving
**Cause:** Backend might not be running OR using wrong API URL
**Fix:** 
1. Check backend is running: http://localhost:5000/api/health
2. Check frontend is using correct API URL

### Issue: Admin panel not showing
**Cause:** Old JWT token (from before you made account admin)
**Fix:** 
1. Logout completely
2. Clear browser local storage (F12 → Application → Local Storage → Delete "token")
3. Login again

---

## Recommended Steps RIGHT NOW:

### Step 1: Use Account That Works
1. Login with the account you used to create complaints (NOT soumil.lathey@gmail.com)
2. What email did you use? Let me know.

### Step 2: Make That Account Admin
1. Open DB Browser
2. Find that email in users table
3. Set isAdmin = 1
4. Save

### Step 3: Test Admin Panel
1. Logout from website
2. Login again with same account
3. Check if "Admin Panel" appears

---

## Need More Help?

Tell me:
1. **Which email address CAN you login with?** (the one that works)
2. **Did you see complaints when logged in?** (before trying to make admin)
3. **Do you see any errors in browser console?** (Press F12 → Console tab)

I'll help you fix this step by step! 🚀
