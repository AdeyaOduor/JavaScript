/*
NGINX Prerequisites
    Linux server (Ubuntu 20.04/22.04 recommended)
    Node.js 16+ installed
    MySQL 8.0+ installed
    NGINX installed
    PM2 process manager
    SSL certificate (Let's Encrypt) 
    */


// 1. Deployment Steps using CLI:

// A. Database Setup
// Secure MySQL installation
sudo mysql_secure_installation

// # Create database and user
sudo mysql -u root -p
CREATE DATABASE budget_tracker;
CREATE USER 'budget_user'@'localhost' IDENTIFIED BY 'strong_password_123';
GRANT ALL PRIVILEGES ON budget_tracker.* TO 'budget_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

// # Import your schema and stored procedures
mysql -u budget_user -p budget_tracker < database_schema.sql

// B. Backend Deployment
// # Clone your repository
git clone https://github.com/yourusername/budget-tracker.git
cd budget-tracker/backend

// # Install dependencies
npm install

// # Create production .env file inside backend folder;
echo "DB_HOST=localhost
DB_USER=budget_user
DB_PASSWORD=strong_password_123
DB_NAME=budget_tracker
JWT_SECERT=your_secure_jwt_secret_987
PORT=3001
NODE_ENV=production" > .env

// # Install PM2 process manager
sudo npm install -g pm2
pm2 install pm2-monit
pm2 monit

// # Start backend service
pm2 start server.js --name "budget-tracker-api"

// # Configure PM2 to start on boot
pm2 startup
pm2 save

// C. Frontend Deployment
cd ../frontend

// # Install dependencies and build
npm install
npm run build

// # Create NGINX configuration file
 /etc/nginx/nginx.conf       // Primary NGINX configuration file
/etc/nginx/sites-available/  // Storage for all site configurations
/etc/nginx/sites-enabled/	 // Symlinks to active site configurations
/var/log/nginx/	             // Access and error logs
// # /etc/nginx/sites-available/budget-tracker

sudo nano /etc/nginx/sites-available/budget-tracker
// ----------------------------------------------------------------------------------------
// # Add the following to nginx.conf created by above command;

// # HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    // # Security headers for even the redirect
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    
    // # Redirect all HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}

// server {
//     listen 127.0.0.1:8080;
//     server_name localhost;
    
//     location /nginx_status {
//         stub_status on;
//         access_log off;
//         allow 127.0.0.1;
//         deny all;
//     }
// }

// # Main HTTPS server block
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    // # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/yourdomain.com/chain.pem;
    
    // # SSL Protocols and Ciphers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    // # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://yourdomain.com";

    // # Root directory for React app
    root /home/ubuntu/budget-tracker/frontend/build;
    index index.html;

    // # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_vary on;

    // # Static assets caching
    location ~* \.(?:jpg|jpeg|png|gif|ico|css|js|svg|woff2)$ {
        expires 365d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    // # API proxy to Node.js backend
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        // # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        send_timeout 60s;
    }

    // # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    // # Block access to sensitive files
    location ~ /\. {
        deny all;
    }

    // # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
// -----------------------------------------------------------------------------------------

// Enable the site and test configuration:
sudo ln -s /etc/nginx/sites-available/budget-tracker /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

// # API Endpoint Testing with curl: Test all critical user flows:
curl -X POST https://yourdomain.com/api/login -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}'

curl -X GET https://yourdomain.com/api/expenses -H "Authorization: Bearer YOUR_JWT_TOKEN"


// D. SSL Certificate with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

// Linux (UFW) Firewall configuration
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

// Monitoring and Maintenance
// 1. Logging Setup: Configure log rotation for both NGINX and Node.js:

sudo nano /etc/logrotate.d/nginx

// Add .txt file
/var/log/nginx/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        /usr/sbin/nginx -t && /usr/sbin/nginx -s reload
    endscript
}

// PM2 Logging: 
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true

// # Install mytop for real-time monitoring
sudo apt install mytop
mytop -u budget_user -p strong_password_123 -d budget_tracker

// 2. Backup Strategy: Create automated backups for MySQL:

// # Daily backup script
sudo nano /usr/local/bin/mysql_backup.sh

#!/bin/bash
DATE=$(date +%Y%m%d%H%M)
BACKUP_DIR="/var/backups/mysql"
mkdir -p $BACKUP_DIR
mysqldump -u budget_user -p'strong_password_123' budget_tracker | gzip > "$BACKUP_DIR/budget_tracker_$DATE.sql.gz"
find $BACKUP_DIR -type f -mtime +7 -delete

// # Updated backup script
#!/bin/bash
DATE=$(date +%Y%m%d%H%M)
BACKUP_DIR="/var/backups/mysql"
ENCRYPT_KEY="your_encryption_key_here"

mkdir -p $BACKUP_DIR
mysqldump -u budget_user -p'strong_password_123' budget_tracker | \
gzip | \
openssl enc -aes-256-cbc -salt -pass pass:$ENCRYPT_KEY -out "$BACKUP_DIR/budget_tracker_$DATE.sql.gz.enc"

// # Copy to remote storage (AWS S3 example)
aws s3 cp "$BACKUP_DIR/budget_tracker_$DATE.sql.gz.enc" s3://your-backup-bucket/

// # Cleanup old backups
find $BACKUP_DIR -type f -mtime +30 -delete


// Make executable and add to cron
sudo chmod +x /usr/local/bin/mysql_backup.sh
sudo crontab -e

// Add to .txt:
0 2 * * * /usr/local/bin/mysql_backup.sh

// Keep NGINX updated:
sudo apt update && sudo apt upgrade nginx 

// Set proper permissions:
sudo chown -R www-data:www-data /home/ubuntu/budget-tracker/frontend/build
sudo chmod -R 755 /home/ubuntu/budget-tracker/frontend/build

// Monitor NGINX access:
sudo tail -f /var/log/nginx/access.log

// Enable automatic certificate renewal:
sudo crontab -e

// Add to .txt:
0 12 * * * /usr/bin/certbot renew --quiet 

// Database Recovery:
openssl enc -d -aes-256-cbc -pass pass:$ENCRYPT_KEY -in backup_file.sql.gz.enc | \
gunzip | \
mysql -u budget_user -p'strong_password_123' budget_tracker

// Continuous Deployment Setup, GitHub Actions Example (.github/workflows/deploy.yml):

// yaml
name: Deploy Budget Tracker

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: |
        cd backend
        npm ci
        cd ../frontend
        npm ci
        
    - name: Build frontend
      run: |
        cd frontend
        npm run build
        
    - name: Deploy to production
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
        SERVER_IP: ${{ secrets.PRODUCTION_IP }}
      run: |
        mkdir -p ~/.ssh
        echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        
        scp -r frontend/build ubuntu@$SERVER_IP:/home/ubuntu/budget-tracker/frontend/
        ssh ubuntu@$SERVER_IP "cd /home/ubuntu/budget-tracker/backend && git pull && npm ci && pm2 restart budget-tracker-api"
