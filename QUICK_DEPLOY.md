# 🚀 Quick Deployment Commands - Copy & Paste

## 1️⃣ CONNECT TO SERVER
```bash
ssh root@YOUR_IP_ADDRESS
```

## 2️⃣ INSTALL EVERYTHING
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install tools
sudo apt install -y git nginx
sudo npm install -g pm2
```

## 3️⃣ DEPLOY APPLICATION
```bash
# Clone & build
cd /var/www
sudo git clone https://github.com/SoumilLathey/lwt-website.git
cd lwt-website
npm install
npm run build

# Setup backend
cd server
npm install
pm2 start server.js --name lwt-backend
pm2 save
pm2 startup
```

## 4️⃣ CONFIGURE NGINX
```bash
sudo nano /etc/nginx/sites-available/lwt
```
**Paste the config from HOSTINGER_DEPLOYMENT.md**

```bash
sudo ln -s /etc/nginx/sites-available/lwt /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5️⃣ SETUP FIREWALL
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 6️⃣ VISIT YOUR SITE
```
http://YOUR_IP_ADDRESS
```

## 🔄 UPDATE WEBSITE
```bash
cd /var/www/lwt-website
sudo git pull origin main
npm install
npm run build
cd server
npm install
pm2 restart lwt-backend
```

## 📊 CHECK STATUS
```bash
pm2 status                    # Backend status
pm2 logs lwt-backend         # View logs
sudo systemctl status nginx  # Nginx status
```

## 🆘 TROUBLESHOOT
```bash
pm2 logs lwt-backend --lines 100
sudo tail -f /var/log/nginx/error.log
```
