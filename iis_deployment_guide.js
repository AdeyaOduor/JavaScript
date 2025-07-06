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

/*
D. Configure URL Rewrite and Reverse Proxy
    Install URL Rewrite and ARR through Web Platform Installer
    Add this web.config to your frontend build folder:
    */

<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <!-- Serve static files directly -->
                <rule name="Static Files" stopProcessing="true">
                    <match url="^(.+\.(?:css|js|png|jpg|gif|ico|svg|woff2?|ttf|eot))$" />
                    <action type="Rewrite" url="/{R:1}" />
                </rule>
                
                <!-- Proxy API requests to Node.js -->
                <rule name="ReverseProxyInboundRule1" stopProcessing="true">
                    <match url="^api/(.*)" />
                    <action type="Rewrite" url="http://localhost:3001/{R:1}" />
                    <serverVariables>
                        <set name="HTTP_X_ORIGINAL_ACCEPT_ENCODING" value="{HTTP_ACCEPT_ENCODING}" />
                        <set name="HTTP_ACCEPT_ENCODING" value="" />
                    </serverVariables>
                </rule>
                
                <!-- Handle client-side routing -->
                <rule name="React Routes" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/index.html" />
                </rule>
            </rules>
            <outboundRules>
                <rule name="ReverseProxyOutboundRule1" preCondition="ResponseIsHtml1">
                    <match filterByTags="A, Form, Img" pattern="^http(s)?://localhost:3001/(.*)" />
                    <action type="Rewrite" value="http{R:1}://{HTTP_HOST}/{R:2}" />
                </rule>
                <preConditions>
                    <preCondition name="ResponseIsHtml1">
                        <add input="{RESPONSE_CONTENT_TYPE}" pattern="^text/html" />
                    </preCondition>
                </preConditions>
            </outboundRules>
        </rewrite>
        
        <!-- Security headers -->
        <httpProtocol>
            <customHeaders>
                <add name="X-Frame-Options" value="SAMEORIGIN" />
                <add name="X-XSS-Protection" value="1; mode=block" />
                <add name="X-Content-Type-Options" value="nosniff" />
                <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
                <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
                <add name="Content-Security-Policy" value="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://yourdomain.com" />
            </customHeaders>
        </httpProtocol>
        
        <!-- Static file caching -->
        <staticContent>
            <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
        </staticContent>
    </system.webServer>
</configuration>


// Windows (PowerShell) firewall configuration:
New-NetFirewallRule -DisplayName "Node.js Budget Tracker" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "HTTP(S)" -Direction Inbound -LocalPort 80,443 -Protocol TCP -Action Allow
