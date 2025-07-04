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
