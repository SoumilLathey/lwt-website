# Deployment Guide for LWT Website (Hostinger VPS)

This guide provides step-by-step instructions to deploy your **React + Node.js + SQLite** application on a **Hostinger VPS** (Ubuntu 22.04/24.04).

---

## 📋 Prerequisites
1.  **Hostinger VPS** (KVM 1 or higher recommended).
2.  **Domain Name** pointed to your VPS IP address (A Record).
3.  **SSH Client** (Terminal, PowerShell, or PuTTY).

---

## 🚀 Step 1: Initial Server Setup

1.  **Login to your VPS:**
    ```bash
    ssh root@<your_vps_ip>
    ```
    *(Enter your VPS password when prompted)*

2.  **Update System Packages:**
    ```bash
    apt update && apt upgrade -y
    ```

3.  **Install Essential Tools (Git, Curl, Nano):**
    ```bash
    apt install git curl nano -y
    ```

---

## 📦 Step 2: Install Node.js & Nginx

1.  **Install Node.js (Version 20.x or Latest LTS):**
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install nodejs -y
    ```

2.  **Verify Installation:**
    ```bash
    node -v
    npm -v
    ```

3.  **Install Nginx (Web Server):**
    ```bash
    apt install nginx -y
    ```

4.  **Install PM2 (Process Manager for Node.js):**
    ```bash
    npm install -g pm2
    ```

---

## 📂 Step 3: Clone & Setup Project

1.  **Navigate to Web Directory:**
    ```bash
    cd /var/www
    ```

2.  **Clone Your Repository:**
    ```bash
    # Replace with your actual GitHub repo URL
    git clone https://github.com/SoumilLathey/lwt-website.git
    ```

3.  **Move into Project Folder:**
    ```bash
    cd lwt-website
    ```

### Setup Frontend (React)
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(If there are legacy peer dep issues: `npm install --legacy-peer-deps`)*

2.  **Build the React App:**
    ```bash
    npm run build
    ```
    *This creates a `dist` folder containing your website.*

### Setup Backend (Node.js)
1.  **Navigate to Server Directory:**
    ```bash
    cd server
    ```

2.  **Install Backend Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a production `.env` file:
    ```bash
    nano .env
    ```
    **Paste the following contents (Right-click to paste):**
    ```env
    PORT=5000
    NODE_ENV=production
    JWT_SECRET=YOUR_SUPER_SECURE_RANDOM_STRING_HERE
    ADMIN_SECRET=YOUR_SECURE_ADMIN_SECRET_HERE
    ```
    *(Press `Ctrl+X`, then `Y`, then `Enter` to save)*

4.  **Start Backend with PM2:**
    ```bash
    pm2 start server.js --name "lwt-backend"
    pm2 save
    pm2 startup
    ```
    *(Run the command output by `pm2 startup` if prompted)*

5.  **Return to Root:**
    ```bash
    cd ../..
    # You should now be in /var/www
    ```

---

## 🌐 Step 4: Configure Nginx (Reverse Proxy)

1.  **Create Nginx Config File:**
    ```bash
    nano /etc/nginx/sites-available/lwt-website
    ```

2.  **Paste Configuration:**
    *Replace `yourdomain.com` with your actual domain name.*

    ```nginx
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        # serve frontend files
        root /var/www/lwt-website/dist;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # proxy api requests to backend
        location /api {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
        
        # protect database file
        location ~ \.sqlite$ {
            deny all;
        }
    }
    ```

3.  **Enable Configuration:**
    ```bash
    ln -s /etc/nginx/sites-available/lwt-website /etc/nginx/sites-enabled/
    ```

4.  **Remove Default Config:**
    ```bash
    rm /etc/nginx/sites-enabled/default
    ```

5.  **Test & Restart Nginx:**
    ```bash
    nginx -t
    systemctl restart nginx
    ```

---

## 🔒 Step 5: Secure with SSL (HTTPS)

1.  **Install Certbot:**
    ```bash
    apt install certbot python3-certbot-nginx -y
    ```

2.  **Generate Certificate:**
    ```bash
    certbot --nginx -d yourdomain.com -d www.yourdomain.com
    ```
    *(Follow the prompts, enter your email, and choose "Redirect" to force HTTPS)*

---

## ✅ Deployment Complete!

Your site should now be live at `https://yourdomain.com`.

### 🔄 Updating Your Site Later
When you push new changes to GitHub:

1.  **SSH into server:**
    ```bash
    cd /var/www/lwt-website
    git pull origin main
    ```

2.  **Rebuild Frontend (if visual changes):**
    ```bash
    npm install
    npm run build
    ```

3.  **Restart Backend (if API changes):**
    ```bash
    cd server
    npm install
    pm2 restart lwt-backend
    ```
