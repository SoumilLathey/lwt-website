# Keep Your Backend Always Awake - UptimeRobot Setup

## Problem
Your Render backend (free tier) goes to sleep after **15 minutes of inactivity**. When someone visits your site after it's asleep, they have to wait ~30 seconds for it to wake up.

## Solution: UptimeRobot
UptimeRobot will ping your backend every 5 minutes to keep it awake 24/7.

---

## Setup Steps (5 minutes)

### Step 1: Sign Up for UptimeRobot
1. Go to: **https://uptimerobot.com**
2. Click **"Register for FREE"**
3. Sign up with your email (or use Google/GitHub login)
4. Verify your email

### Step 2: Create a Monitor
1. After logging in, click **"+ Add New Monitor"**
2. Fill in the details:

   **Monitor Type:** HTTP(s)
   
   **Friendly Name:** LWT Backend
   
   **URL:** `https://lwt-backend.onrender.com`
   
   **Monitoring Interval:** 5 minutes (this is the free tier option)

3. Click **"Create Monitor"**

### Step 3: Done! ✅
- UptimeRobot will now ping your backend every 5 minutes
- Your backend will **never sleep**
- Users will always get instant responses

---

## What UptimeRobot Does

- Sends a request to your backend every 5 minutes
- Keeps the server "active" so Render doesn't put it to sleep
- Sends you email alerts if your backend goes down (bonus!)
- Completely **FREE** for up to 50 monitors

---

## Verify It's Working

After setting up:

1. Wait 15-20 minutes
2. Visit your website: https://lwt-website-lake.vercel.app
3. Try logging in
4. It should be **instant** (not slow)

---

## Alternative: Create a Health Check Endpoint

If you want better monitoring, I can create a `/health` endpoint that UptimeRobot can ping. This is more efficient.

**Current setup:** UptimeRobot pings your homepage
**Better setup:** UptimeRobot pings a lightweight `/health` endpoint

Would you like me to create this health endpoint? It's just a simple route that returns "OK".

---

## UptimeRobot Dashboard

Once set up, you can:
- See uptime statistics (99.9% uptime, etc.)
- Get email/SMS alerts if your site goes down
- View response time graphs
- Monitor multiple services (frontend, backend, etc.)

---

## Quick Reference

| Service | URL to Monitor |
|---------|----------------|
| Backend | `https://lwt-backend.onrender.com` |
| Frontend | `https://lwt-website-lake.vercel.app` |

**Monitoring Interval:** 5 minutes (free tier)

---

## Important Notes

✅ **Free Forever:** UptimeRobot's free tier is permanent
✅ **No Credit Card:** No payment info required
✅ **50 Monitors:** You can monitor up to 50 different services
✅ **Email Alerts:** Get notified if your site goes down

⚠️ **Render's Fair Use:** While this keeps your backend awake, Render allows it on the free tier. Just don't abuse it with 1-second intervals.

---

## Need Help?

If you have trouble setting up UptimeRobot, let me know and I can:
1. Walk you through it step-by-step
2. Create a health check endpoint for better monitoring
3. Set up email notifications

🚀 **Your backend will stay awake 24/7!**
