/* inside terminal, 

Updating node.js via CLI on ubuntu terminal
sudo npm install -g n
sudo n lts

node --version 

Step 1: Set Up Your React Application;
npx create-react-app budget-tracker
cd budget-tracker
touch index.js 
npm init -y 
npm install axios react-bootstrap bootstrap react-chartjs-2 chart.js nodemon

include "type":"module", inside package.json file to adopt ES6  
place "start": "nodemon index.js", inside package.json file under the scripts before "tests".

snap --version
sudo snap install postman

Step 2: Create the MySQL Database Connection, Server with Express, and models;
In the root of your project, create a folder named backend. 
cd backend
npm install express body-parser bcryptjs helmet jsonwebtoken sequelize mysql2 cors express-rate-limit

Inside backend folder, create files: db.js, User.js, server.js, and Expense.js;

Step 3: Create stored procedures in MySQL client

Step 4: Create React components folder inside src folder;

Step 5: Create the follwing files inside src/components: App.js, App.css, Navbar, Carousel, Login.js, Register.js, and BudgetTracker;

Step 6: Add Navbar Logo, and Background Images to Carousel
Inside public folder, add another image folder where the logo and background images will be stored
Make sure to replace image1.jpg, image2.jpg, and image3.jpg in the Carousel.js with the paths to your actual image files.

Start the backend server from the CLI:
cd backend
node server.js

Start the React app from the CLI:
npm start

*/
// create strored procedure in MySQL client
CREATE DATABASE IF NOT EXISTS budget_tracker;
USE budget_tracker;

CREATE TABLE IF NOT EXISTS jurisdictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    level ENUM('national', 'county', 'subcounty') NOT NULL,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES jurisdictions(id) ON DELETE CASCADE
);

-- Departments within each jurisdiction
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jurisdiction_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
    UNIQUE KEY (jurisdiction_id, code)
);

-- Roles definition
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    hierarchy_level INT NOT NULL COMMENT 'Higher number means more privileges',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(32),
    backup_codes TEXT,
    phone_number VARCHAR(20),
    last_2fa_verification TIMESTAMP NULL;
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    jurisdiction_id INT NOT NULL,
    department_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, role_id, jurisdiction_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Create table for 2FA verification attempts
CREATE TABLE IF NOT EXISTS two_factor_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create table for recovery tokens
CREATE TABLE IF NOT EXISTS recovery_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Budget categories table
CREATE TABLE IF NOT EXISTS budget_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (name, code)
);

-- Budgets table with enhanced structure
CREATE TABLE IF NOT EXISTS budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jurisdiction_id INT NOT NULL,
    department_id INT NOT NULL,
    fiscal_year INT NOT NULL,
    budget_category_id INT NOT NULL,
    allocated_amount DECIMAL(15,2) NOT NULL,
    spent_amount DECIMAL(15,2) DEFAULT 0,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (budget_category_id) REFERENCES budget_categories(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    UNIQUE KEY (jurisdiction_id, department_id, fiscal_year, budget_category_id)
);

-- Expenses table with enhanced structure
CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    budget_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    receipt_reference VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (budget_id) REFERENCES budgets(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

DELIMITER //

CREATE PROCEDURE AddExpense(
    IN p_user_id INT,
    IN p_title VARCHAR(100),
    IN p_amount DECIMAL(10, 2),
    IN p_date DATE,
    IN p_category VARCHAR(50)
)
BEGIN
    INSERT INTO Expenses (user_id, title, amount, date, category)
    VALUES (p_user_id, p_title, p_amount, p_date, p_category);
    
    SELECT * FROM Expenses WHERE id = LAST_INSERT_ID();
END //

CREATE PROCEDURE UpdateExpense(
    IN p_expense_id INT,
    IN p_user_id INT,
    IN p_title VARCHAR(100),
    IN p_amount DECIMAL(10, 2)
)
BEGIN
    UPDATE Expenses
    SET title = p_title, amount = p_amount
    WHERE id = p_expense_id AND user_id = p_user_id;
    
    SELECT * FROM Expenses WHERE id = p_expense_id;
END //

CREATE PROCEDURE RegisterUser(
    IN p_username VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_role_id INT,
    IN p_jurisdiction_id INT,
    IN p_department_id INT NULL
)
BEGIN
    DECLARE user_id INT;
    
    -- Insert the new user
    INSERT INTO users (username, password_hash, email, full_name)
    VALUES (p_username, p_password_hash, p_email, p_full_name);
    
    SET user_id = LAST_INSERT_ID();
    
    -- Assign role and jurisdiction
    INSERT INTO user_roles (user_id, role_id, jurisdiction_id, department_id)
    VALUES (user_id, p_role_id, p_jurisdiction_id, p_department_id);
    
    -- Return the created user with role information
    SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.full_name,
        r.name AS role,
        j.name AS jurisdiction,
        j.level AS jurisdiction_level,
        d.name AS department
    FROM users u
    JOIN user_roles ur ON u.id = ur.user_id
    JOIN roles r ON ur.role_id = r.id
    JOIN jurisdictions j ON ur.jurisdiction_id = j.id
    LEFT JOIN departments d ON ur.department_id = d.id
    WHERE u.id = user_id;
END //

-- Enhanced: User authentication with permissions
CREATE PROCEDURE AuthenticateUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE user_count INT;
    DECLARE user_id INT;
    DECLARE stored_hash VARCHAR(255);
    DECLARE user_active BOOLEAN;
    
    -- Check if user exists and get password hash
    SELECT COUNT(*), id, password_hash, is_active 
    INTO user_count, user_id, stored_hash, user_active
    FROM users WHERE username = p_username;
    
    IF user_count = 0 THEN
        SELECT NULL AS user, 'User not found' AS message;
    ELSEIF NOT user_active THEN
        SELECT NULL AS user, 'User account is inactive' AS message;
    ELSEIF NOT (SELECT stored_hash = SHA2(p_password, 256)) THEN
        SELECT NULL AS user, 'Invalid password' AS message;
    ELSE
        -- Return user data with primary role
        SELECT 
            u.id, 
            u.username, 
            u.email, 
            u.full_name,
            r.name AS role,
            r.hierarchy_level,
            j.id AS jurisdiction_id,
            j.name AS jurisdiction_name,
            j.level AS jurisdiction_level,
            d.id AS department_id,
            d.name AS department_name,
            'success' AS message
        FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        JOIN jurisdictions j ON ur.jurisdiction_id = j.id
        LEFT JOIN departments d ON ur.department_id = d.id
        WHERE u.id = user_id
        ORDER BY r.hierarchy_level DESC
        LIMIT 1;
        
        -- Return all permissions
        SELECT 
            r.name AS role, 
            j.id AS jurisdiction_id, 
            j.name AS jurisdiction_name,
            j.level AS jurisdiction_level,
            d.id AS department_id,
            d.name AS department_name
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        JOIN jurisdictions j ON ur.jurisdiction_id = j.id
        LEFT JOIN departments d ON ur.department_id = d.id
        WHERE ur.user_id = user_id;
    END IF;
END //

CREATE PROCEDURE GetJurisdictionBudget(
    IN p_jurisdiction_id INT,
    IN p_fiscal_year INT
)
BEGIN
    SELECT 
        b.id,
        b.allocated_amount,
        b.spent_amount,
        (b.allocated_amount - b.spent_amount) AS remaining_amount,
        ROUND((b.spent_amount / b.allocated_amount) * 100, 2) AS utilization_percentage,
        j.name AS jurisdiction_name,
        j.level AS jurisdiction_level,
        d.name AS department_name,
        bc.name AS budget_category,
        u.full_name AS created_by,
        b.created_at,
        b.updated_at
    FROM budgets b
    JOIN jurisdictions j ON b.jurisdiction_id = j.id
    JOIN departments d ON b.department_id = d.id
    JOIN budget_categories bc ON b.budget_category_id = bc.id
    JOIN users u ON b.created_by = u.id
    WHERE b.jurisdiction_id = p_jurisdiction_id
    AND b.fiscal_year = p_fiscal_year;
END //

CREATE PROCEDURE AddBudgetAllocation(
    IN p_user_id INT,
    IN p_jurisdiction_id INT,
    IN p_department_id INT,
    IN p_fiscal_year INT,
    IN p_budget_category_id INT,
    IN p_allocated_amount DECIMAL(15,2)
)
BEGIN
    DECLARE user_role_level INT;
    DECLARE user_jurisdiction_level VARCHAR(20);
    
    -- Check user permissions
    SELECT r.hierarchy_level, j.level
    INTO user_role_level, user_jurisdiction_level
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    JOIN jurisdictions j ON ur.jurisdiction_id = j.id
    WHERE ur.user_id = p_user_id
    ORDER BY r.hierarchy_level DESC
    LIMIT 1;
    
    -- Only allow if user has sufficient privileges
    IF user_role_level >= 50 THEN -- Budget Officer or higher
        INSERT INTO budgets (
            jurisdiction_id,
            department_id,
            fiscal_year,
            budget_category_id,
            allocated_amount,
            created_by
        )
        VALUES (
            p_jurisdiction_id,
            p_department_id,
            p_fiscal_year,
            p_budget_category_id,
            p_allocated_amount,
            p_user_id
        )
        ON DUPLICATE KEY UPDATE 
            allocated_amount = p_allocated_amount,
            updated_at = CURRENT_TIMESTAMP;
        
        SELECT * FROM budgets WHERE id = LAST_INSERT_ID();
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Insufficient privileges to modify budget';
    END IF;
END //

CREATE PROCEDURE RecordExpense(
    IN p_user_id INT,
    IN p_budget_id INT,
    IN p_title VARCHAR(100),
    IN p_amount DECIMAL(15,2),
    IN p_date DATE,
    IN p_description TEXT,
    IN p_receipt_reference VARCHAR(100)
)
BEGIN
    DECLARE budget_jurisdiction_id INT;
    DECLARE user_has_access BOOLEAN DEFAULT FALSE;
    
    -- Get budget jurisdiction
    SELECT jurisdiction_id INTO budget_jurisdiction_id
    FROM budgets WHERE id = p_budget_id;
    
    -- Check if user has access to this jurisdiction
    SELECT EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = p_user_id 
        AND jurisdiction_id = budget_jurisdiction_id
    ) INTO user_has_access;
    
    IF user_has_access THEN
        -- Record the expense
        INSERT INTO expenses (
            budget_id,
            user_id,
            title,
            amount,
            date,
            description,
            receipt_reference
        )
        VALUES (
            p_budget_id,
            p_user_id,
            p_title,
            p_amount,
            p_date,
            p_description,
            p_receipt_reference
        );
        
        -- Update the spent amount in the budget
        UPDATE budgets 
        SET spent_amount = spent_amount + p_amount
        WHERE id = p_budget_id;
        
        SELECT * FROM expenses WHERE id = LAST_INSERT_ID();
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User does not have access to this jurisdiction';
    END IF;
END //

-- Enhanced: Get expense summary by jurisdiction
CREATE PROCEDURE GetExpenseSummary(
    IN p_user_id INT,
    IN p_jurisdiction_id INT,
    IN p_fiscal_year INT
)
BEGIN
    DECLARE user_role_level INT;
    DECLARE user_jurisdiction_level VARCHAR(20);
    
    -- Check user permissions
    SELECT r.hierarchy_level, j.level
    INTO user_role_level, user_jurisdiction_level
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    JOIN jurisdictions j ON ur.jurisdiction_id = j.id
    WHERE ur.user_id = p_user_id
    ORDER BY r.hierarchy_level DESC
    LIMIT 1;
    
    -- Only proceed if user has sufficient privileges
    IF user_role_level >= 40 THEN -- Viewer or higher
        SELECT 
            d.name AS department,
            bc.name AS budget_category,
            SUM(b.allocated_amount) AS allocated,
            SUM(b.spent_amount) AS spent,
            (SUM(b.allocated_amount) - SUM(b.spent_amount)) AS remaining,
            ROUND((SUM(b.spent_amount) / SUM(b.allocated_amount)) * 100, 2) AS utilization_percentage
        FROM budgets b
        JOIN departments d ON b.department_id = d.id
        JOIN budget_categories bc ON b.budget_category_id = bc.id
        WHERE b.jurisdiction_id = p_jurisdiction_id
        AND b.fiscal_year = p_fiscal_year
        GROUP BY d.name, bc.name
        ORDER BY d.name, bc.name;
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Insufficient privileges to view this data';
    END IF;
END //

DELIMITER ;

-- Initial data setup
INSERT INTO jurisdictions (name, code, level, parent_id) VALUES 
('National Government', 'KE-NATIONAL', 'national', NULL),
('Nairobi County', 'KE-047', 'county', 1),
('Mombasa County', 'KE-001', 'county', 1),
('Kisumu County', 'KE-042', 'county', 1),
('Westlands Sub-County', 'KE-047-01', 'subcounty', 2),
('Dagoretti Sub-County', 'KE-047-02', 'subcounty', 2),
('Nyali Sub-County', 'KE-001-01', 'subcounty', 3);

INSERT INTO departments (jurisdiction_id, name, code) VALUES
(1, 'National Treasury', 'NT'),
(1, 'Ministry of Health', 'MOH'),
(2, 'Nairobi County Health', 'NCH'),
(2, 'Nairobi County Transport', 'NCT'),
(5, 'Westlands Public Works', 'WPW');

INSERT INTO roles (name, description, hierarchy_level) VALUES
('Super Admin', 'Full system access', 100),
('National Admin', 'National government level access', 90),
('County Admin', 'County level access', 80),
('Sub-County Admin', 'Sub-county level access', 70),
('Department Head', 'Department-level access within jurisdiction', 60),
('Budget Officer', 'Can enter and view budget data for assigned scope', 50),
('Viewer', 'Read-only access for assigned scope', 40);

INSERT INTO budget_categories (name, code, description) VALUES
('Development', 'DEV', 'Development projects and infrastructure'),
('Recurrent', 'REC', 'Recurrent expenditures and operations'),
('Capital', 'CAP', 'Capital investments and equipment');

-- Create application user with limited privileges
CREATE USER IF NOT EXISTS 'budget_app'@'localhost' IDENTIFIED BY 'strong_password_123';
GRANT SELECT, INSERT, UPDATE, EXECUTE ON budget_tracker.* TO 'budget_app'@'localhost';

-- Security enhancements
SET GLOBAL validate_password.policy = STRONG;
SET GLOBAL max_connections = 100;
SET GLOBAL audit_log_format = JSON;
SET GLOBAL audit_log_policy = ALL;
SET GLOBAL audit_log_rotate_on_size = 100000000;


// ==================== Back End ===============================================================================================
// backend/db.js; for database configuration using Sequelize:
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;


// backend/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;


// backend/Expense.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;


// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise'); // Using promise-based MySQL client
require('dotenv').config();
const User = require('./User');
const Expense = require('./Expense');
const sequelize = require('./db');
const helmet = require('helmet'); // for deployment
const rateLimit = require('express-rate-limit'); // for deployment

const app = express();
const PORT = process.env.PORT || 5000;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork(); // Restart worker
    });
} else {
    // Your existing server code here
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'budget_tracker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware: uncomment code parts in deployment / production phase
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later"
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, please try again in an hour"
});

app.use('/api/', apiLimiter);
app.use('/login', authLimiter);
app.use('/register', authLimiter);

// Add Rate Limiting for 2FA Attempts to your Express app
const rateLimit = require('express-rate-limit');

const twoFALimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many 2FA attempts, please try again later'
});

// Apply to 2FA routes
router.post('/2fa/verify', twoFALimiter, ...);
router.post('/2fa/verify-sms', twoFALimiter, ...);


// When setting JWT cookie
res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 8 * 60 * 60 * 1000 // 8 hours
});

// Helper function to execute stored procedures
async function executeProcedure(procedureName, params) {
    const connection = await pool.getConnection();
    try {
        const placeholders = params.map(() => '?').join(',');
        const [results] = await connection.query(
            `CALL ${procedureName}(${placeholders})`,
            params
        );
        return results[0];
    } finally {
        connection.release();
    }
}


// User Registration
app.post('/register', async (req, res) => {
    try {
        const { username, password, county, sub-county, role, department, } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await executeProcedure('RegisterUser', [username, hashedPassword]);
        res.status(201).json(result[0]);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Username already exists' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Registration failed' });
        }
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [user] = await executeProcedure('AuthenticateUser', [username]);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Middleware to authenticate JWT
const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const [user] = await executeProcedure('GetUserById', [decoded.id]);
        if (!user) return res.sendStatus(403);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

// Budget Endpoints
app.post('/api/budget', authenticateToken, async (req, res) => {
    try {
        const { amount, monthYear } = req.body;
        const currentMonth = monthYear || new Date().toISOString().slice(0, 7);
        const result = await executeProcedure('SetUserBudget', [req.user.id, amount, currentMonth]);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to set budget' });
    }
});

app.get('/api/budget', authenticateToken, async (req, res) => {
    try {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const [budget] = await executeProcedure('GetUserBudget', [req.user.id, currentMonth]);
        res.json(budget || { amount: 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get budget' });
    }
});

// Expense Endpoints
app.post('/api/expenses', authenticateToken, async (req, res) => {
    try {
        const { title, amount, date, category } = req.body;
        const expenseDate = date || new Date().toISOString().split('T')[0];
        const result = await executeProcedure('AddExpense', [
            req.user.id,
            title,
            amount,
            expenseDate,
            category || 'Uncategorized'
        ]);
        res.status(201).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
});

app.get('/api/expenses', authenticateToken, async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;
        const expenses = await executeProcedure('GetUserExpenses', [
            req.user.id,
            startDate || null,
            endDate || null,
            category || null
        ]);
        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get expenses' });
    }
});

app.get('/api/expenses/summary', authenticateToken, async (req, res) => {
    try {
        const monthYear = req.query.month || new Date().toISOString().slice(0, 7);
        const summary = await executeProcedure('GetExpenseSummary', [req.user.id, monthYear]);
        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get expense summary' });
    }
});

app.put('/api/expenses/:id', authenticateToken, async (req, res) => {
    try {
        const { title, amount } = req.body;
        const result = await executeProcedure('UpdateExpense', [
            req.params.id,
            req.user.id,
            title,
            amount
        ]);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
    try {
        const result = await executeProcedure('DeleteExpense', [req.params.id, req.user.id]);
        if (result[0].affected_rows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// ==================== Front End =================================================================================================================

// src/index.js:
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Renamed from App.css to index.css for better semantics
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();


// public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Budget Tracker Application" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">
    <title>Budget Tracker</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>


// src/index.css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Bootstrap overrides for better mobile experience */
.container {
  padding-left: 15px;
  padding-right: 15px;
}

/* Ensure buttons are large enough for touch devices */
.btn {
  min-width: 44px;
  min-height: 44px;
}

/* Form controls */
.form-control {
  padding: 0.5rem 0.75rem;
}

    

// src/App.css):
/* Base App Layout */
.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Carousel Styles */
.carousel-item img {
  width: 100%;
  height: auto;
  max-height: 60vh;
  object-fit: cover;
}

.carousel-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
}

.carousel-caption h3 {
  font-size: 2.5rem;
  font-weight: bold;
}

.carousel-caption p {
  font-size: 1.2rem;
}

/* Responsive Typography */
@media (max-width: 768px) {
  .display-5 {
    font-size: 2rem;
  }
  
  .lead {
    font-size: 1rem;
  }

  .carousel-caption h3 {
    font-size: 1.8rem;
  }

  .carousel-caption p {
    font-size: 1rem;
  }
}

/* Footer Styling */
footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

/* Modal Styles */
.modal-dialog {
  max-width: 95vw;
  margin: 1.75rem auto;
}

.modal-content {
  border-radius: 15px;
}

.modal-header {
  border-bottom: none;
  padding-bottom: 0;
}

.modal-title {
  font-weight: bold;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
  }
}

/* Stats Container */
.stats-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
}

.stat-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  margin: 0 5px;
  min-width: 150px;
}

.stat-card h5 {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.stat-card h3 {
  font-size: 1.5rem;
  margin-top: 5px;
}

/* List Group Items */
.list-group-item {
  transition: all 0.3s ease;
  padding: 1rem 1.25rem;
}

.list-group-item:hover {
  background-color: #f8f9fa;
  transform: translateX(5px);
}

/* Navbar Enhancements */
.navbar {
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
    gap: 10px;
  }

  .stat-card {
    margin: 5px 0;
  }

  .navbar-brand {
    font-size: 1.2rem;
  }
}

/* Accessibility Improvements */
button, .btn {
  min-height: 44px;
  min-width: 44px;
}

/* Smooth transitions for interactive elements */
a, button, .list-group-item {
  transition: all 0.2s ease-in-out;
}

/* Focus states for accessibility */
*:focus {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}



// src/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = ({ token, onLogout, onLoginClick, onRegisterClick }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/logo.png" // Replace with your logo path
            height="30"
            className="d-inline-block align-top me-2"
            alt="Budget Tracker Logo"
          />
          Budget Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {token ? (
              <Button variant="outline-light" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline-light" className="me-2" onClick={onLoginClick}>
                  Login
                </Button>
                <Button variant="light" onClick={onRegisterClick}>
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;



// src/ExpenseChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

const ExpenseChart = ({ expenses }) => {
  // Group by category for better chart visualization
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;



// src/Carousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = () => {
  return (
    <Carousel controls={false} indicators={false} interval={3000} pause={false}>
      <Carousel.Item>
        <div className="carousel-image" style={{ 
          backgroundImage: "url('/finance1.jpg')",
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="carousel-caption">
            <h3>Track Your Expenses</h3>
            <p>Gain control over your finances</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image" style={{ 
          backgroundImage: "url('/finance2.jpg')",
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="carousel-caption">
            <h3>Set Budget Goals</h3>
            <p>Plan for your financial future</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;



// src/BudgetTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert, ListGroup, Row, Col } from 'react-bootstrap';
import ExpenseChart from './ExpenseChart';

const BudgetTracker = ({ token }) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const filteredExpenses = expenses.filter(expense => {
    const categoryMatch = filterCategory ? expense.category === filterCategory : true;
    const dateMatch = filterDate ? new Date(expense.date).toISOString().split('T')[0] === filterDate : true;
    return categoryMatch && dateMatch;
  });

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  // const fetchExpenses = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/expenses', {
  //       headers: { Authorization: token }
  //     });
  //     setExpenses(response.data);
  //   } catch (error) {
  //     showAlert('Failed to fetch expenses', 'danger');
  //   }
  // };

// Getting expenses for current month
const fetchExpenses = async () => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const response = await axios.get('/api/expenses', {
      params: {
        startDate: `${currentMonth}-01`,
        endDate: `${currentMonth}-31`
      },
      headers: { Authorization: token }
    });
    setExpenses(response.data);
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
  }
};

// Getting expense summary
const fetchExpenseSummary = async () => {
  try {
    const response = await axios.get('/api/expenses/summary', {
      headers: { Authorization: token }
    });
    setSummary(response.data);
  } catch (error) {
    console.error('Failed to fetch summary:', error);
  }
};

  const showAlert = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setTimeout(() => setAlertMessage(''), 5000);
  };

  const submitBudget = async (e) => {
    e.preventDefault();
    
    if (budget < 0) {
      showAlert('Budget cannot be negative', 'danger');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/budget', { budget }, {
        headers: { Authorization: token }
      });
      showAlert(`Budget set to: $${budget}`);
    } catch (error) {
      showAlert('Failed to set budget', 'danger');
    }
  };

  const submitExpense = async (e) => {
    e.preventDefault();

    if (!expenseTitle || !expenseAmount) {
      showAlert('Please fill all fields', 'danger');
      return;
    }

    if (parseFloat(expenseAmount) <= 0) {
      showAlert('Expense amount must be greater than zero', 'danger');
      return;
    }

    const newExpense = { 
      title: expenseTitle, 
      amount: parseFloat(expenseAmount), 
      date: new Date().toISOString(), 
      category: filterCategory || 'Uncategorized' 
    };

    try {
      if (editingExpenseId != null) {
        await axios.put(`http://localhost:5000/api/expenses/${editingExpenseId}`, newExpense, {
          headers: { Authorization: token }
        });
        setEditingExpenseId(null);
        showAlert('Expense updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/expenses', newExpense, {
          headers: { Authorization: token }
        });
        showAlert('Expense added successfully');
      }

      setExpenseTitle('');
      setExpenseAmount('');
      fetchExpenses();
    } catch (error) {
      showAlert('Failed to save expense', 'danger');
    }
  };

  const editExpense = (expense) => {
    setExpenseTitle(expense.title);
    setExpenseAmount(expense.amount.toString());
    setFilterCategory(expense.category);
    setEditingExpenseId(expense.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: token }
      });
      showAlert('Expense deleted successfully');
      fetchExpenses();
    } catch (error) {
      showAlert('Failed to delete expense', 'danger');
    }
  };

  const totalExpenses = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
  const averageExpense = filteredExpenses.length > 0 ? (totalExpenses / filteredExpenses.length).toFixed(2) : 0;
  const remainingBudget = (budget - totalExpenses).toFixed(2);

  return (
    <Container className="mt-4">
      {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Budget Overview</Card.Title>
              <Form onSubmit={submitBudget} className="mb-3">
                <Form.Group>
                  <Form.Label>Set Monthly Budget</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    placeholder="Enter budget amount"
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Set Budget
                </Button>
              </Form>
              
              <div className="stats-container">
                <div className="stat-card">
                  <h5>Total Budget</h5>
                  <h3>${budget}</h3>
                </div>
                <div className="stat-card">
                  <h5>Total Expenses</h5>
                  <h3>${totalExpenses}</h3>
                </div>
                <div className="stat-card">
                  <h5>Remaining</h5>
                  <h3 className={remainingBudget < 0 ? 'text-danger' : 'text-success'}>
                    ${remainingBudget}
                  </h3>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Add/Edit Expense</Card.Title>
              <Form onSubmit={submitExpense}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={expenseTitle} 
                    onChange={(e) => setExpenseTitle(e.target.value)} 
                    placeholder="Expense title" 
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={expenseAmount} 
                    onChange={(e) => setExpenseAmount(e.target.value)} 
                    placeholder="Amount" 
                    min="0.01"
                    step="0.01"
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={filterDate} 
                        onChange={(e) => setFilterDate(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Button variant={editingExpenseId ? 'warning' : 'success'} type="submit">
                  {editingExpenseId ? 'Update Expense' : 'Add Expense'}
                </Button>
                {editingExpenseId && (
                  <Button variant="secondary" onClick={() => {
                    setEditingExpenseId(null);
                    setExpenseTitle('');
                    setExpenseAmount('');
                  }} className="ms-2">
                    Cancel
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Expense Statistics</Card.Title>
              <div className="stats-container">
                <div className="stat-card">
                  <h5>Total Expenses</h5>
                  <h3>${totalExpenses}</h3>
                </div>
                <div className="stat-card">
                  <h5>Average Expense</h5>
                  <h3>${averageExpense}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Expense Chart</Card.Title>
              <ExpenseChart expenses={filteredExpenses} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Expense List</Card.Title>
          {filteredExpenses.length === 0 ? (
            <Alert variant="info">No expenses found. Add some expenses to get started!</Alert>
          ) : (
            <ListGroup>
              {filteredExpenses.map((expense) => (
                <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{expense.title}</strong>
                    <div className="text-muted small">
                      ${expense.amount} • {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <Button variant="outline-warning" size="sm" onClick={() => editExpense(expense)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => deleteExpense(expense.id)}>
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BudgetTracker;



// src/Login.js
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginModal = ({ show, onHide, onLogin, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      onLogin(response.data.token);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="link" onClick={onRegisterClick}>
              Don't have an account? Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;


// src/Register.js
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const RegisterModal = ({ show, onHide, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [county, setCounty] = useState('');
  const [subCounty, setSubCounty] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');

  // Sample data for dropdowns (you can replace with your actual data or fetch from API)
  const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
  const subCounties = {
    Nairobi: ['Westlands', 'Dagoretti', 'Langata', 'Kasarani', 'Embakasi'],
    Mombasa: ['Changamwe', 'Jomvu', 'Kisauni', 'Likoni', 'Mvita'],
    Kisumu: ['Kisumu Central', 'Kisumu East', 'Kisumu West', 'Seme', 'Nyando'],
    Nakuru: ['Nakuru Town', 'Naivasha', 'Gilgil', 'Njoro', 'Molo'],
    Eldoret: ['Kapseret', 'Kesses', 'Moiben', 'Soy', 'Turbo']
  };
  const roles = ['Admin', 'Manager', 'Officer', 'Staff', 'Viewer'];
  const departments = ['Finance', 'Health', 'Education', 'Agriculture', 'Transport'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { 
        username, 
        password,
        county,
        subCounty,
        role,
        department
      });
      setMessage('Registration successful! Please login');
      setTimeout(() => {
        onRegister();
        onHide();
      }, 1500);
    } catch (err) {
      setMessage('Registration failed. User may already exist');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>County</Form.Label>
            <Form.Select 
              value={county} 
              onChange={(e) => setCounty(e.target.value)}
              required
            >
              <option value="">Select County</option>
              {counties.map((county, index) => (
                <option key={index} value={county}>{county}</option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Sub-County</Form.Label>
            <Form.Select 
              value={subCounty} 
              onChange={(e) => setSubCounty(e.target.value)}
              required
              disabled={!county}
            >
              <option value="">Select Sub-County</option>
              {county && subCounties[county].map((subCounty, index) => (
                <option key={index} value={subCounty}>{subCounty}</option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;



import React, { useState } from 'react';
import AppNavbar from './Navbar';
import ImageCarousel from './Carousel';
import BudgetTracker from './BudgetTracker';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { Container } from 'react-bootstrap';
import './App.css'; // Keep this for component-specific styles

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <AppNavbar 
        token={token} 
        onLogout={handleLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      
      <main className="flex-grow-1">
        {!token && <ImageCarousel />}
        
        <Container className="mt-4 mb-5">
          {token ? (
            <BudgetTracker token={token} />
          ) : (
            <div className="text-center py-5">
              <h2 className="display-5">Welcome to Budget Tracker</h2>
              <p className="lead">Please login or register to manage your expenses</p>
            </div>
          )}
        </Container>
      </main>

      <LoginModal 
        show={showLogin} 
        onHide={() => setShowLogin(false)}
        onLogin={handleLogin}
        onRegisterClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      <RegisterModal 
        show={showRegister} 
        onHide={() => setShowRegister(false)}
        onRegister={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <footer className="bg-light py-3 mt-auto">
        <Container className="text-center">
          <p className="mb-0">© {new Date().getFullYear()} Budget Tracker</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
