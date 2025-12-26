# 🚀 Hostinger Deployment Guide - Step by Step

## Prerequisites Checklist
- ✅ Hostinger VPS/Business hosting purchased
- ✅ Domain name (optional but recommended)
- ✅ SSH access credentials from Hostinger
- ✅ Your GitHub repository: https://github.com/SoumilLathey/lwt-website

---

## PART 1: Access Your Hostinger Server

### Step 1: Get Your SSH Credentials
1. Log in to [Hostinger Panel](https://hpanel.hostinger.com)
2. Go to **VPS** or **Hosting** section
3. Find your server and click **Manage**
4. Look for **SSH Access** or **Access Details**
5. Note down:
   - **IP Address**: (e.g., 123.45.67.89)
   - **Username**: (usually `root` or `u123456789`)
   - **Password**: (or SSH key)
   - **Port**: (usually 22)

### Step 2: Connect via SSH

**Option A: Using Windows PowerShell**
```powershell
# Open PowerShell and run:
ssh root@YOUR_IP_ADDRESS
# Enter password when prompted
```

**Option B: Using Hostinger's Browser SSH**
1. In Hostinger panel, click **Browser SSH** or **Terminal**
2. Opens a terminal in your browser

---

## PART 2: Prepare the Server

### Step 3: Update System
```bash
# Update package lists
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y
```

### Step 4: Install Node.js 18+
```bash
# Download Node.js setup script
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### Step 5: Install Required Tools
```bash
# Install Git
sudo apt install -y git

# Install PM2 (keeps your app running)
sudo npm install -g pm2

# Install Nginx (web server)
sudo apt install -y nginx

# Verify installations
git --version
pm2 --version
nginx -v
```

---

## PART 3: Deploy Your Application

### Step 6: Clone Your Repository
```bash
# Create directory for web apps
sudo mkdir -p /var/www

# Navigate to directory
cd /var/www

# Clone your repository
sudo git clone https://github.com/SoumilLathey/lwt-website.git

# Navigate into project
cd lwt-website

# Check files are there
ls -la
```

### Step 7: Install Dependencies & Build Frontend
```bash
# Install frontend dependencies
npm install

# Build the frontend (creates production files)
npm run build

# Verify build folder exists
ls -la dist/
```

### Step 8: Setup Backend
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Create environment file
nano .env
```

**Add this to .env file:**
```env
PORT=3000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random
ADMIN_SECRET=lwt-admin-secret-2024-change-me
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

### Step 9: Test Backend Manually
```bash
# Start backend to test
node server.js

# You should see: "Server running on port 3000"
# Press Ctrl+C to stop
```

### Step 10: Start Backend with PM2
```bash
# Start backend with PM2 (keeps it running forever)
pm2 start server.js --name lwt-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup

# Copy and run the command it shows (if any)

# Check status
pm2 status
```

---

## PART 4: Configure Web Server (Nginx)

### Step 11: Create Nginx Configuration
```bash
# Create new site configuration
sudo nano /etc/nginx/sites-available/lwt
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com YOUR_IP_ADDRESS;

    # Frontend - Serve React build files
    location / {
        root /var/www/lwt-website/dist;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # Backend API - Proxy to Node.js
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads directory
    location /uploads {
        alias /var/www/lwt-website/server/uploads;
        add_header Cache-Control "public, max-age=31536000";
    }
}
```

**Replace:**
- `YOUR_DOMAIN.com` with your actual domain (or remove if no domain)
- `YOUR_IP_ADDRESS` with your server IP

**Save and exit:**
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

### Step 12: Enable Site & Restart Nginx
```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/lwt /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test is successful, restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Check Nginx status
sudo systemctl status nginx
```

---

## PART 5: Configure Firewall

### Step 13: Setup Firewall (UFW)
```bash
# Allow SSH (important - don't lock yourself out!)
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS (for future SSL)
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check firewall status
sudo ufw status
```

---

## PART 6: Test Your Website

### Step 14: Access Your Website
1. Open browser
2. Go to: `http://YOUR_IP_ADDRESS`
3. You should see your website! 🎉

**Test checklist:**
- ✅ Homepage loads
- ✅ Can navigate to different pages
- ✅ Can register/login
- ✅ Admin dashboard works
- ✅ User dashboard works
- ✅ Can submit complaints
- ✅ Images upload correctly

---

## PART 7: Setup Domain (If You Have One)

### Step 15: Configure DNS
1. Go to your domain registrar (or Hostinger Domains)
2. Find **DNS Settings** or **DNS Zone**
3. Add/Update these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | YOUR_IP_ADDRESS | 3600 |
| A | www | YOUR_IP_ADDRESS | 3600 |

4. Wait 5-30 minutes for DNS to propagate
5. Visit `http://yourdomain.com`

---

## PART 8: Setup SSL/HTTPS (Recommended)

### Step 16: Install SSL Certificate (Free with Let's Encrypt)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

Now visit: `https://yourdomain.com` 🔒

---

## PART 9: Maintenance & Updates

### Update Your Website
```bash
# Navigate to project
cd /var/www/lwt-website

# Pull latest changes from GitHub
sudo git pull origin main

# Install any new dependencies
npm install

# Rebuild frontend
npm run build

# Restart backend
cd server
npm install
pm2 restart lwt-backend

# Check status
pm2 status
```

### Useful Commands
```bash
# View backend logs
pm2 logs lwt-backend

# View last 100 lines
pm2 logs lwt-backend --lines 100

# Restart backend
pm2 restart lwt-backend

# Stop backend
pm2 stop lwt-backend

# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check disk space
df -h

# Check memory usage
free -h
```

---

## Troubleshooting

### Website Not Loading?
```bash
# Check if backend is running
pm2 status

# Check backend logs
pm2 logs lwt-backend

# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart everything
pm2 restart lwt-backend
sudo systemctl restart nginx
```

### API Not Working?
```bash
# Check if backend is listening on port 3000
sudo netstat -tulpn | grep 3000

# Check backend logs
pm2 logs lwt-backend --lines 50

# Test API directly
curl http://localhost:3000/api/health
```

### Images Not Uploading?
```bash
# Check uploads directory permissions
sudo chmod -R 755 /var/www/lwt-website/server/uploads

# Check ownership
sudo chown -R www-data:www-data /var/www/lwt-website/server/uploads
```

---

## Security Checklist

- ✅ Change default SSH port (optional but recommended)
- ✅ Setup SSL/HTTPS
- ✅ Enable firewall (UFW)
- ✅ Change JWT_SECRET in .env
- ✅ Change ADMIN_SECRET in .env
- ✅ Keep system updated: `sudo apt update && sudo apt upgrade`
- ✅ Setup automatic backups
- ✅ Use strong passwords

---

## Backup Your Database

```bash
# Create backup directory
mkdir -p /var/www/backups

# Backup database
cp /var/www/lwt-website/server/database.db /var/www/backups/database-$(date +%Y%m%d).db

# Setup automatic daily backups (cron)
crontab -e

# Add this line (backs up at 2 AM daily):
0 2 * * * cp /var/www/lwt-website/server/database.db /var/www/backups/database-$(date +\%Y\%m\%d).db
```

---

## 🎉 Congratulations!

Your website is now live on Hostinger!

**Your URLs:**
- Website: `http://YOUR_IP_ADDRESS` or `https://yourdomain.com`
- Admin: `https://yourdomain.com/admin`

**Next Steps:**
1. Test all features thoroughly
2. Setup SSL if you haven't
3. Configure automatic backups
4. Monitor logs regularly
5. Keep system updated

**Need Help?**
- Check logs: `pm2 logs lwt-backend`
- Check this guide's troubleshooting section
- Contact Hostinger support for server issues
