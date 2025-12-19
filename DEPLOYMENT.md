# Free Remote Deployment Guide

## Overview
Deploy your site for free so your team can access it from anywhere:
- **Frontend**: Vercel (Free)
- **Backend**: Render.com (Free)
- **Database**: SQLite (included with backend)

---

## Step 1: Prepare Your Code

### A. Create .gitignore (if not exists)
Already created at: `.gitignore`

### B. Initialize Git Repository
```powershell
cd c:\Users\soumi\OneDrive\Documents\LWT_Site
git init
git add .
git commit -m "Initial commit with authentication system"
```

### C. Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., "lwt-website")
3. Don't initialize with README (we already have code)
4. Copy the repository URL

### D. Push to GitHub
```powershell
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render.com (FREE)

### A. Sign Up
1. Go to https://render.com
2. Sign up with GitHub (easiest)

### B. Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lwt-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### C. Add Environment Variables
In Render dashboard, add these environment variables:
- `JWT_SECRET` = `lwt-super-secret-jwt-key-2024`
- `EMAIL_USER` = `latheysoumil@gmail.com`
- `EMAIL_PASSWORD` = `your-gmail-app-password`
- `PORT` = `5000`

### D. Deploy
Click "Create Web Service" - it will deploy automatically!

You'll get a URL like: `https://lwt-backend.onrender.com`

**Important**: Free tier sleeps after 15 min of inactivity (takes 30s to wake up on first request)

---

## Step 3: Update Frontend for Production

### A. Update API URLs
We need to change the frontend to use the deployed backend URL instead of localhost.

Create a new file: `src/config.js`
```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://lwt-backend.onrender.com'  // Your Render backend URL
  : 'http://localhost:5000';

export { API_URL };
```

Then update all fetch calls to use this URL. I can do this for you automatically.

### B. Commit Changes
```powershell
git add .
git commit -m "Update API URL for production"
git push
```

---

## Step 4: Deploy Frontend to Vercel (FREE)

### A. Sign Up
1. Go to https://vercel.com
2. Sign up with GitHub

### B. Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### C. Add Environment Variable (Optional)
If needed, add:
- `VITE_API_URL` = `https://lwt-backend.onrender.com`

### D. Deploy
Click "Deploy" - done in ~2 minutes!

You'll get a URL like: `https://lwt-website.vercel.app`

---

## Step 5: Update Backend CORS

Your backend needs to allow requests from your Vercel domain.

Update `server/server.js` CORS configuration:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://lwt-website.vercel.app',  // Your Vercel URL
    'https://*.vercel.app'  // All Vercel preview deployments
  ],
  credentials: true
}));
```

Commit and push - Render will auto-deploy!

---

## Alternative: Quick Test with ngrok (No Deployment)

If you just want to test quickly without deploying:

### Install ngrok
1. Download: https://ngrok.com/download
2. Sign up for free account
3. Follow setup instructions

### Run ngrok
```powershell
# Terminal 1 - Backend tunnel
ngrok http 5000

# Terminal 2 - Frontend tunnel
ngrok http 5173
```

You'll get public URLs instantly! Share the frontend URL with your team.

**Pros**: Instant, no setup
**Cons**: URLs change each restart, computer must stay on

---

## Recommended Approach

**For Quick Testing (Today):**
→ Use **ngrok** (5 minutes setup)

**For Longer Testing (This Week+):**
→ Deploy to **Vercel + Render** (30 minutes setup, permanent URLs)

---

## What Would You Like to Do?

**Option A**: I'll help you set up ngrok right now (fastest)
**Option B**: I'll help you deploy to Vercel + Render (permanent solution)
**Option C**: Both - ngrok now, then deploy later

Let me know which option you prefer!
