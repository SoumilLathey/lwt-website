# Quick Deployment Guide

## ✅ Code is on GitHub!
Repository: https://github.com/SoumilLathey/lwt-website

---

## Step 1: Deploy Backend to Render.com (5 minutes)

### A. Sign Up & Connect
1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (easiest option)
4. Authorize Render to access your repositories

### B. Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Find and select **"lwt-website"** repository
3. Click **"Connect"**

### C. Configure Service
Fill in these settings:
- **Name**: `lwt-backend`
- **Region**: Choose closest to India (Singapore recommended)
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: **Free** (important!)

### D. Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these THREE variables:
1. **Key**: `JWT_SECRET` → **Value**: `lwt-super-secret-jwt-key-2024`
2. **Key**: `EMAIL_USER` → **Value**: `latheysoumil@gmail.com`
3. **Key**: `EMAIL_PASSWORD` → **Value**: `YOUR_GMAIL_APP_PASSWORD`

**Important**: You need to add your actual Gmail app password here!

### E. Deploy!
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://lwt-backend.onrender.com`

**Copy this URL - you'll need it for the frontend!**

---

## Step 2: Deploy Frontend to Vercel (2 minutes)

### A. Sign Up & Connect
1. Go to https://vercel.com
2. Click **"Start Deploying"**
3. Sign up with **GitHub**
4. Authorize Vercel

### B. Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **"lwt-website"** in the list
3. Click **"Import"**

### C. Configure (Auto-detected!)
Vercel will auto-detect Vite settings:
- **Framework Preset**: Vite ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅

### D. Add Environment Variable
Click **"Environment Variables"**

Add ONE variable:
- **Key**: `VITE_API_URL`
- **Value**: `https://lwt-backend.onrender.com` (your Render URL from Step 1)

### E. Deploy!
1. Click **"Deploy"**
2. Wait ~2 minutes
3. You'll get a URL like: `https://lwt-website.vercel.app`

**This is your live site URL!** 🎉

---

## Step 3: Update Frontend to Use Production API

After both are deployed, I need to update your code to use the production backend URL.

**Tell me your Render backend URL** (from Step 1D) and I'll update the code automatically!

---

## Step 4: Share with Your Team!

Once deployed, share this URL with your team:
**https://lwt-website.vercel.app**

They can:
- ✅ Register accounts
- ✅ Login and access dashboard
- ✅ Submit complaints
- ✅ Send enquiries
- ✅ Admins can manage everything

---

## Important Notes

⚠️ **Free Tier Limitations:**
- Render backend sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds to wake up
- Subsequent requests are instant

💡 **To keep it always awake (optional):**
Use a free service like UptimeRobot to ping your backend every 10 minutes

---

## Need Help?

If you get stuck at any step, let me know which step and I'll guide you through it!
