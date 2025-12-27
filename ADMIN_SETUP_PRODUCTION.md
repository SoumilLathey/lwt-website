# Admin Account Setup Instructions

## Current Situation

Your account `soumil.lathey@gmail.com` should be automatically created when the Render backend starts, but it seems the login is failing.

## Solution: Restart Render Backend

The easiest solution is to restart your Render backend service, which will trigger the database initialization code that creates your admin account.

### Steps to Restart Render Backend:

1. Go to **https://dashboard.render.com**
2. Find your service: **lwt-backend**
3. Click on it
4. Click the **"Manual Deploy"** button (top right)
5. Select **"Clear build cache & deploy"**
6. Wait 2-3 minutes for deployment to complete

This will:
- ✅ Run the database initialization
- ✅ Create your admin account: `soumil.lathey@gmail.com` / `password123`
- ✅ Set you as admin and verified

## Alternative: Use Admin Promotion Endpoint

If restarting doesn't work, you can use the admin promotion endpoint:

### Using PowerShell:
```powershell
Invoke-RestMethod -Uri "https://lwt-backend.onrender.com/api/admin/promote" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"soumil.lathey@gmail.com","secret":"lwt-admin-secret-2024-change-me"}'
```

### Using Browser Console:
1. Go to https://lwt-website-lake.vercel.app
2. Open browser console (F12)
3. Paste this:
```javascript
fetch('https://lwt-backend.onrender.com/api/admin/promote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'soumil.lathey@gmail.com',
    secret: 'lwt-admin-secret-2024-change-me'
  })
}).then(r => r.json()).then(console.log)
```

## After Setup

**Login Credentials:**
- **URL**: https://lwt-website-lake.vercel.app/login
- **Email**: soumil.lathey@gmail.com
- **Password**: password123

## Troubleshooting

If you still can't login after restarting:

1. **Check Render Logs**:
   - Go to Render dashboard
   - Click on lwt-backend
   - Click "Logs" tab
   - Look for: "Created admin account: soumil.lathey@gmail.com"

2. **Check Environment Variables**:
   - Make sure `JWT_SECRET` is set in Render
   - Make sure `ADMIN_SECRET` is set (should be `lwt-admin-secret-2024-change-me`)

3. **Check Frontend API URL**:
   - In Vercel dashboard, check environment variables
   - `VITE_API_URL` should be `https://lwt-backend.onrender.com`

## Contact

If none of these work, let me know and I'll help debug further!
