/*
Prerequisites
    Windows Server 2016/2019/2022
    Node.js 16+ installed
    MySQL 8.0+ installed
    IIS with URL Rewrite and Application Request Routing
    SSL certificate
    
    */
// Deployment Steps in powershell
// A. Database Setup

# Install MySQL Community Server
# During installation:
# 1. Set root password
# 2. Create 'budget_user' with all privileges on 'budget_tracker' database
# 3. Import your schema and stored procedures

// B. Backend Deployment

// # Clone repository
git clone https://github.com/yourusername/budget-tracker.git
cd budget-tracker\backend

// # Install dependencies
npm install

// # Create production .env file
@"
DB_HOST=localhost
DB_USER=budget_user
DB_PASSWORD=strong_password_123
DB_NAME=budget_tracker
JWT_SECERT=your_secure_jwt_secret_987
PORT=3001
NODE_ENV=production
"@ | Out-File -FilePath .env -Encoding utf8

// # Install PM2 globally
npm install -g pm2

// # Start backend service
pm2 start server.js --name "budget-tracker-api"

// # Configure PM2 to start on boot
pm2 startup
pm2 save

// C. Frontend Deployment

cd ..\frontend

// # Install dependencies and build
npm install
npm run build

# Create IIS site
# 1. Open IIS Manager
# 2. Add new website:
#    - Site name: BudgetTracker
#    - Physical path: \path\to\frontend\build
#    - Binding: https with your SSL certificate
