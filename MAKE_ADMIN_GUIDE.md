# 🔧 How to Make Your Account Admin on Production

## Where to Run the Command

You need to run the command in the **Render Shell** (on the Render website), NOT on your local computer.

---

## Step-by-Step Guide

### **Step 1: Login to Render**

1. Open your browser and go to: **https://dashboard.render.com**
2. Click **"Sign In"**
3. Login with the account you used to deploy your backend (probably GitHub)

---

### **Step 2: Find Your Backend Service**

1. After logging in, you'll see your **Dashboard**
2. Look for a service named **"lwt-backend"** (or similar name you gave it)
3. **Click on it** to open the service details

---

### **Step 3: Open the Shell**

1. In the service page, look at the **left sidebar**
2. You'll see tabs like:
   - Overview
   - Logs
   - **Shell** ← Click this one!
   - Environment
   - Settings
3. Click on **"Shell"**

---

### **Step 4: Wait for Shell to Load**

1. The shell will open in your browser
2. Wait a few seconds for it to connect
3. You'll see a command prompt like: `~ $` or similar

---

### **Step 5: Run the Admin Promotion Command**

Copy and paste this **exact command** into the shell:

```bash
sqlite3 database.sqlite "UPDATE users SET isAdmin = 1 WHERE email = 'soumil.lathey@gmail.com';"
```

Press **Enter**

**What happens:**
- If successful: No output (this is normal!)
- If error: You'll see an error message

---

### **Step 6: Verify It Worked**

Run this command to check:

```bash
sqlite3 database.sqlite "SELECT id, name, email, isAdmin FROM users WHERE email = 'soumil.lathey@gmail.com';"
```

Press **Enter**

**Expected output:**
```
1|Soumil Lathey|soumil.lathey@gmail.com|1
```

The last number should be **1** (meaning admin = YES)

---

### **Step 7: Test on Your Website**

1. Go to: **https://lwt-website-lake.vercel.app**
2. **Logout** (if already logged in)
   - Click your name in the top right
   - Click "Logout"
3. **Login again** with:
   - Email: `soumil.lathey@gmail.com`
   - Password: Your password
4. After login, click your name in the top right
5. You should now see **"Admin Panel"** or **"Admin Dashboard"** option! 🎉

---

## Visual Guide

### Where is the Shell?

```
Render Dashboard
├── Your Services
│   └── lwt-backend (click here)
│       ├── Overview
│       ├── Logs
│       ├── Shell ← YOU ARE HERE
│       ├── Environment
│       └── Settings
```

### What the Shell Looks Like

```
┌─────────────────────────────────────┐
│ Shell - lwt-backend                 │
├─────────────────────────────────────┤
│                                     │
│ ~ $ ← Type your command here        │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

## All Commands (Copy-Paste Ready)

### 1. Make Admin
```bash
sqlite3 database.sqlite "UPDATE users SET isAdmin = 1 WHERE email = 'soumil.lathey@gmail.com';"
```

### 2. Verify Admin Status
```bash
sqlite3 database.sqlite "SELECT id, name, email, isAdmin FROM users WHERE email = 'soumil.lathey@gmail.com';"
```

### 3. See All Users (Optional)
```bash
sqlite3 database.sqlite "SELECT id, name, email, isAdmin FROM users;"
```

---

## Troubleshooting

### "sqlite3: command not found"
- Render should have sqlite3 installed by default
- Try: `apt-get update && apt-get install -y sqlite3`

### "database.sqlite: unable to open database file"
- Make sure you're in the correct directory
- Run: `ls -la` to see files
- If database.sqlite is not there, run: `cd /opt/render/project/src` then try again

### Shell won't open
- Try refreshing the page
- Make sure your Render service is running (not suspended)
- Check if you're on the free tier (shell access should still work)

---

## Alternative: Create Admin API Endpoint

If you can't access the Render Shell, I can create a special API endpoint that lets you promote users to admin through a web interface.

**Would you like me to create this?**

It would work like:
1. Visit a special URL with a secret key
2. Enter the email to promote
3. Click "Make Admin"
4. Done!

Let me know if you need this alternative solution! 🚀

---

## Quick Summary

**Where:** Render Dashboard → lwt-backend → Shell tab (left sidebar)

**Command:**
```bash
sqlite3 database.sqlite "UPDATE users SET isAdmin = 1 WHERE email = 'soumil.lathey@gmail.com';"
```

**Then:** Logout and login again on your website

---

Need help? Let me know which step you're stuck on!
