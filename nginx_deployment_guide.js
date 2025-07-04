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
// # /etc/nginx/nginx.conf    
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

// # Frontend serving
//     root /home/ubuntu/budget-tracker/frontend/build;
//     index index.html;

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
sudo ln -s /etc/nginx/sites-available/budget-tracker /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

