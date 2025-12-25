# 🤖 Complete UptimeRobot Setup - Keep Everything Running 24/7

## What This Does

- **Backend (Render)**: Keeps it awake forever (pings every 5 minutes)
- **Frontend (Vercel)**: Monitors uptime and sends alerts if it goes down
- **Bonus**: Email alerts, uptime stats, response time tracking

---

## 📋 Step-by-Step Setup (5 minutes)

### **Step 1: Sign Up**

1. Go to: **https://uptimerobot.com**
2. Click **"Register for FREE"** (top right)
3. Choose signup method:
   - **Google** (fastest - recommended)
   - **Email** (you'll need to verify)
4. Complete signup

---

### **Step 2: Create Backend Monitor (CRITICAL)**

This keeps your Render backend awake 24/7.

1. Click **"+ Add New Monitor"** (big button)
2. Fill in these details:

   ```
   Monitor Type: HTTP(s)
   Friendly Name: LWT Backend
   URL (or IP): https://lwt-backend.onrender.com/api/health
   Monitoring Interval: 5 minutes
   ```

3. Click **"Create Monitor"**

✅ **Done!** Your backend will never sleep again!

---

### **Step 3: Create Frontend Monitor (Optional but Recommended)**

This monitors your Vercel frontend for downtime.

1. Click **"+ Add New Monitor"** again
2. Fill in these details:

   ```
   Monitor Type: HTTP(s)
   Friendly Name: LWT Frontend
   URL (or IP): https://lwt-website-lake.vercel.app
   Monitoring Interval: 5 minutes
   ```

3. Click **"Create Monitor"**

✅ **Done!** You'll get alerts if your frontend goes down!

---

## 🎯 Summary - What You Should Have

After setup, you should see **2 monitors** in your UptimeRobot dashboard:

| Monitor Name | URL | Status | Purpose |
|--------------|-----|--------|---------|
| LWT Backend | `https://lwt-backend.onrender.com/api/health` | 🟢 Up | Keeps backend awake |
| LWT Frontend | `https://lwt-website-lake.vercel.app` | 🟢 Up | Monitors frontend |

---

## ✅ Verify It's Working

### Immediate Check (Right After Setup):

1. Go to your UptimeRobot dashboard
2. You should see both monitors with status: **"Up"**
3. Click on each monitor to see details

### Wait 15-20 Minutes, Then Test:

1. Visit: https://lwt-website-lake.vercel.app
2. Try logging in
3. It should be **instant** (not slow)
4. This means backend is staying awake! ✅

---

## 📊 What You Get (Free Forever)

✅ **24/7 Monitoring**: Checks every 5 minutes
✅ **Email Alerts**: Get notified if site goes down
✅ **Uptime Stats**: See 99.9% uptime reports
✅ **Response Time**: Track how fast your site is
✅ **50 Monitors**: Can add more sites later
✅ **No Credit Card**: Completely free

---

## 🔔 Set Up Email Alerts (Bonus)

1. In UptimeRobot dashboard, click **"My Settings"**
2. Go to **"Alert Contacts"**
3. Add your email: `soumil.lathey@gmail.com`
4. Verify the email
5. Now you'll get alerts if your site goes down!

---

## 📱 Mobile App (Optional)

UptimeRobot has mobile apps:
- **iOS**: Search "UptimeRobot" in App Store
- **Android**: Search "UptimeRobot" in Play Store

Check your site status on the go!

---

## ⚙️ Advanced Settings (Optional)

### Custom Alert Messages
- Set custom messages for different types of downtime
- Add SMS alerts (paid feature)

### Response Time Alerts
- Get notified if response time is too slow
- Useful for performance monitoring

### Public Status Page
- Create a public page showing your uptime
- Share with customers: "99.9% uptime guaranteed!"

---

## 🐛 Troubleshooting

### Monitor Shows "Down"
1. Check if URL is correct
2. Visit the URL in browser to verify it works
3. Wait 5 minutes for next check

### Not Receiving Alerts
1. Check spam folder
2. Verify email in "Alert Contacts"
3. Check monitor settings

### Backend Still Sleeping
1. Make sure monitor is active (green)
2. Check monitoring interval is 5 minutes
3. Wait 15-20 minutes after setup

---

## 🎉 What Happens Now

### Before UptimeRobot:
- ❌ Backend sleeps after 15 minutes
- ❌ Users wait 30 seconds for first request
- ❌ Bad user experience

### After UptimeRobot:
- ✅ Backend always awake
- ✅ Instant responses 24/7
- ✅ Professional experience
- ✅ Email alerts if anything breaks

---

## 📝 Quick Reference

### URLs to Monitor:

**Backend (CRITICAL):**
```
https://lwt-backend.onrender.com/api/health
```

**Frontend (OPTIONAL):**
```
https://lwt-website-lake.vercel.app
```

### Settings:
- **Interval**: 5 minutes (free tier)
- **Type**: HTTP(s)
- **Alerts**: Email (free)

---

## 🚀 Next Steps

1. ✅ Sign up for UptimeRobot
2. ✅ Add backend monitor (MUST DO)
3. ✅ Add frontend monitor (recommended)
4. ✅ Set up email alerts
5. ✅ Test after 20 minutes
6. ✅ Enjoy 24/7 uptime!

---

## 💡 Pro Tips

1. **Check Dashboard Weekly**: See uptime stats
2. **Monitor Response Times**: Catch slowdowns early
3. **Add More Services**: Monitor your database, APIs, etc.
4. **Share Status Page**: Build customer trust

---

## Need Help?

If you get stuck:
1. Check the UptimeRobot FAQ: https://uptimerobot.com/faq
2. Let me know which step you're on
3. I can walk you through it!

---

**🎯 Bottom Line:**

- **5 minutes of setup** = **Forever awake backend**
- **100% free** = **Professional uptime monitoring**
- **Set it and forget it** = **Peace of mind**

Let's do this! 🚀
