/*
NGINX Prerequisites
    Linux server (Ubuntu 20.04/22.04 recommended)
    Node.js 16+ installed
    MySQL 8.0+ installed
    NGINX installed
    PM2 process manager
    SSL certificate (Let's Encrypt)
    
    
    */
// 1. Deployment Steps
// A. Database Setup
bash

// Secure MySQL installation
sudo mysql_secure_installation

// # Create database and user
sudo mysql -u root -p
CREATE DATABASE budget_tracker;
CREATE USER 'budget_user'@'localhost' IDENTIFIED BY 'strong_password_123';
GRANT ALL PRIVILEGES ON budget_tracker.* TO 'budget_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

// Import your schema and stored procedures
mysql -u budget_user -p budget_tracker < database_schema.sql

// B. Backend Deployment
bash

// # Clone your repository
git clone https://github.com/yourusername/budget-tracker.git
cd budget-tracker/backend

// # Install dependencies
npm install

// # Create production .env file
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

# Configure PM2 to start on boot
pm2 startup
pm2 save

// C. Frontend Deployment
bash

cd ../frontend

// # Install dependencies and build
npm install
npm run build

// # Create NGINX config
sudo nano /etc/nginx/sites-available/budget-tracker
