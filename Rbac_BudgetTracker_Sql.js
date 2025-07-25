// Database Schema and Stored Procedures
-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS budget_tracker;
USE budget_tracker;

-- Enable mysql_native_password for better compatibility in deployment phase
CREATE USER IF NOT EXISTS 'budget_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'strong_password_123';

-- Set global security parameters
SET GLOBAL validate_password.policy = STRONG;
SET GLOBAL max_connections = 100;

-- Set password expiration policy
ALTER USER 'budget_user'@'localhost' PASSWORD EXPIRE INTERVAL 90 DAY;

-- Enable audit logging
SET GLOBAL audit_log_format = JSON;
SET GLOBAL audit_log_policy = ALL;
SET GLOBAL audit_log_rotate_on_size = 100000000;

-- ==================== CORE USER TABLES ====================

-- Main Users table (enhanced version)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==================== GOVERNMENT BUDGET STRUCTURE ====================

-- Jurisdictions hierarchy (National -> County -> Sub-County)
CREATE TABLE IF NOT EXISTS jurisdictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    level ENUM('national', 'county', 'subcounty') NOT NULL,
    parent_id INT NULL,
    FOREIGN KEY (parent_id) REFERENCES jurisdictions(id) ON DELETE CASCADE
);

-- Departments within each jurisdiction
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jurisdiction_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
    UNIQUE (jurisdiction_id, code)
);

-- Roles definition
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    hierarchy_level INT NOT NULL COMMENT 'Higher number means more privileges'
);

-- User roles assignment with jurisdiction scope
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    jurisdiction_id INT NOT NULL,
    department_id INT NULL,
    PRIMARY KEY (user_id, role_id, jurisdiction_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Government Budget data table
CREATE TABLE IF NOT EXISTS gov_budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jurisdiction_id INT NOT NULL,
    department_id INT NOT NULL,
    fiscal_year INT NOT NULL,
    budget_category ENUM('development', 'recurrent', 'capital') NOT NULL,
    allocated_amount DECIMAL(15,2) NOT NULL,
    spent_amount DECIMAL(15,2) DEFAULT 0,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- ==================== PERSONAL BUDGET TABLES ====================

-- Personal Budgets table
CREATE TABLE IF NOT EXISTS personal_budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    month_year VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_month (user_id, month_year)
);

-- Personal Expenses table
CREATE TABLE IF NOT EXISTS personal_expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ==================== INITIAL DATA ====================

-- Initial data for Kenya jurisdictions
INSERT IGNORE INTO jurisdictions (name, code, level, parent_id) VALUES 
('National Government', 'KE-NATIONAL', 'national', NULL),
('Nairobi County', 'KE-047', 'county', 1),
('Mombasa County', 'KE-001', 'county', 1),
('Kisumu County', 'KE-042', 'county', 1),
('Westlands Sub-County', 'KE-047-01', 'subcounty', 2),
('Dagoretti Sub-County', 'KE-047-02', 'subcounty', 2),
('Nyali Sub-County', 'KE-001-01', 'subcounty', 3);

-- Sample departments
INSERT IGNORE INTO departments (jurisdiction_id, name, code) VALUES
(1, 'National Treasury', 'NT'),
(1, 'Ministry of Health', 'MOH'),
(2, 'Nairobi County Health', 'NCH'),
(2, 'Nairobi County Transport', 'NCT'),
(5, 'Westlands Public Works', 'WPW');

-- Roles hierarchy
INSERT IGNORE INTO roles (name, description, hierarchy_level) VALUES
('Super Admin', 'Full system access', 100),
('National Admin', 'National government level access', 90),
('County Admin', 'County level access', 80),
('Sub-County Admin', 'Sub-county level access', 70),
('Department Head', 'Department-level access within jurisdiction', 60),
('Budget Officer', 'Can enter and view budget data for assigned scope', 50),
('Viewer', 'Read-only access for assigned scope', 40),
('Personal User', 'Standard user for personal budget tracking', 10);

-- ==================== STORED PROCEDURES ====================

DELIMITER //

-- Helper function for password comparison
CREATE FUNCTION IF NOT EXISTS bcrypt_compare(input_password VARCHAR(255), stored_hash VARCHAR(255))
RETURNS BOOLEAN DETERMINISTIC
BEGIN
    -- This is a placeholder implementation
    -- In production, use application-level password verification
    RETURN stored_hash = input_password;
END //

-- 1. User Management Procedures

CREATE PROCEDURE RegisterUser(
    IN p_username VARCHAR(50),
    IN p_password_hash VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100)
)
BEGIN
    INSERT INTO users (username, password_hash, email, full_name) 
    VALUES (p_username, p_password_hash, p_email, p_full_name);
    
    SELECT LAST_INSERT_ID() AS id, username, email, full_name, created_at 
    FROM users WHERE id = LAST_INSERT_ID();
END //

CREATE PROCEDURE AuthenticateUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE user_count INT;
    DECLARE user_id INT;
    DECLARE password_hash VARCHAR(255);
    DECLARE is_active BOOLEAN;
    
    -- Check if user exists and get password hash
    SELECT COUNT(*), id, password_hash, is_active INTO user_count, user_id, password_hash, is_active
    FROM users WHERE username = p_username;
    
    IF user_count = 0 THEN
        SELECT NULL AS user, 'User not found' AS message;
    ELSEIF NOT is_active THEN
        SELECT NULL AS user, 'User account is inactive' AS message;
    ELSEIF NOT (SELECT bcrypt_compare(p_password, password_hash)) THEN
        SELECT NULL AS user, 'Invalid password' AS message;
    ELSE
        -- Return user data with permissions
        SELECT 
            u.id, 
            u.username, 
            u.email, 
            u.full_name,
            COALESCE(r.name, 'Personal User') AS role,
            COALESCE(j.id, 0) AS jurisdiction_id,
            COALESCE(j.name, 'Personal Budget') AS jurisdiction_name,
            COALESCE(j.level, 'personal') AS jurisdiction_level,
            'success' AS message
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        LEFT JOIN jurisdictions j ON ur.jurisdiction_id = j.id
        WHERE u.id = user_id
        ORDER BY COALESCE(r.hierarchy_level, 0) DESC
        LIMIT 1;
        
        -- Return all permissions
        SELECT 
            COALESCE(r.name, 'Personal User') AS role, 
            COALESCE(j.id, 0) AS jurisdiction_id, 
            COALESCE(j.name, 'Personal Budget') AS jurisdiction_name,
            COALESCE(j.level, 'personal') AS jurisdiction_level,
            COALESCE(d.id, 0) AS department_id,
            COALESCE(d.name, 'N/A') AS department_name
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        LEFT JOIN jurisdictions j ON ur.jurisdiction_id = j.id
        LEFT JOIN departments d ON ur.department_id = d.id
        WHERE u.id = user_id;
    END IF;
END //

CREATE PROCEDURE GetUserById(IN p_user_id INT)
BEGIN
    SELECT id, username, email, full_name, is_active, created_at 
    FROM users WHERE id = p_user_id;
END //

-- 2. Personal Budget Procedures

CREATE PROCEDURE SetPersonalBudget(
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_month_year VARCHAR(7)
)
BEGIN
    INSERT INTO personal_budgets (user_id, amount, month_year)
    VALUES (p_user_id, p_amount, p_month_year)
    ON DUPLICATE KEY UPDATE amount = p_amount;
    
    SELECT * FROM personal_budgets WHERE user_id = p_user_id AND month_year = p_month_year;
END //

CREATE PROCEDURE GetPersonalBudget(IN p_user_id INT, IN p_month_year VARCHAR(7))
BEGIN
    SELECT * FROM personal_budgets WHERE user_id = p_user_id AND month_year = p_month_year;
END //

CREATE PROCEDURE AddPersonalExpense(
    IN p_user_id INT,
    IN p_title VARCHAR(100),
    IN p_amount DECIMAL(10, 2),
    IN p_date DATE,
    IN p_category VARCHAR(50)
)
BEGIN
    INSERT INTO personal_expenses (user_id, title, amount, date, category)
    VALUES (p_user_id, p_title, p_amount, p_date, p_category);
    
    SELECT * FROM personal_expenses WHERE id = LAST_INSERT_ID();
END //

CREATE PROCEDURE UpdatePersonalExpense(
    IN p_expense_id INT,
    IN p_user_id INT,
    IN p_title VARCHAR(100),
    IN p_amount DECIMAL(10, 2),
    IN p_date DATE,
    IN p_category VARCHAR(50))
BEGIN
    UPDATE personal_expenses
    SET title = p_title, 
        amount = p_amount,
        date = p_date,
        category = p_category
    WHERE id = p_expense_id AND user_id = p_user_id;
    
    SELECT * FROM personal_expenses WHERE id = p_expense_id;
END //

CREATE PROCEDURE DeletePersonalExpense(IN p_expense_id INT, IN p_user_id INT)
BEGIN
    DELETE FROM personal_expenses WHERE id = p_expense_id AND user_id = p_user_id;
    SELECT ROW_COUNT() AS affected_rows;
END //

CREATE PROCEDURE GetPersonalExpenses(
    IN p_user_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_category VARCHAR(50))
BEGIN
    SELECT * FROM personal_expenses
    WHERE user_id = p_user_id
    AND (p_start_date IS NULL OR date >= p_start_date)
    AND (p_end_date IS NULL OR date <= p_end_date)
    AND (p_category IS NULL OR category = p_category)
    ORDER BY date DESC;
END //

CREATE PROCEDURE GetPersonalExpenseSummary(
    IN p_user_id INT,
    IN p_month_year VARCHAR(7))
BEGIN
    SELECT 
        category,
        SUM(amount) AS total_amount,
        COUNT(*) AS transaction_count
    FROM personal_expenses
    WHERE user_id = p_user_id
    AND DATE_FORMAT(date, '%Y-%m') = p_month_year
    GROUP BY category
    ORDER BY total_amount DESC;
END //

-- 3. Government Budget Procedures

CREATE PROCEDURE GetNationalBudgetSummary(IN fiscal_year INT)
BEGIN
    SELECT 
        j.level,
        COUNT(DISTINCT j.id) AS jurisdiction_count,
        SUM(b.allocated_amount) AS total_allocated,
        SUM(b.spent_amount) AS total_spent,
        ROUND((SUM(b.spent_amount) / NULLIF(SUM(b.allocated_amount), 0)) * 100, 2) AS utilization_percentage
    FROM jurisdictions j
    LEFT JOIN gov_budgets b ON j.id = b.jurisdiction_id
    WHERE (fiscal_year IS NULL OR b.fiscal_year = fiscal_year)
    GROUP BY j.level WITH ROLLUP;
END //

CREATE PROCEDURE GetJurisdictionBudgetSummary(
    IN jurisdiction_id INT,
    IN fiscal_year INT,
    IN include_children BOOLEAN
)
BEGIN
    -- Get the requested jurisdiction
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_jurisdictions AS
    SELECT id, name, level FROM jurisdictions WHERE id = jurisdiction_id;
    
    -- Include child jurisdictions if requested
    IF include_children THEN
        INSERT INTO temp_jurisdictions
        WITH RECURSIVE jurisdiction_tree AS (
            SELECT id, name, level FROM jurisdictions WHERE id = jurisdiction_id
            UNION ALL
            SELECT j.id, j.name, j.level 
            FROM jurisdictions j
            JOIN jurisdiction_tree jt ON j.parent_id = jt.id
        )
        SELECT id, name, level FROM jurisdiction_tree WHERE id != jurisdiction_id;
    END IF;
    
    -- Return the budget summary
    SELECT 
        j.id,
        j.name,
        j.level,
        SUM(b.allocated_amount) AS total_allocated,
        SUM(b.spent_amount) AS total_spent,
        ROUND((SUM(b.spent_amount) / NULLIF(SUM(b.allocated_amount), 0)) * 100, 2) AS utilization_percentage,
        COUNT(DISTINCT b.department_id) AS department_count
    FROM temp_jurisdictions j
    LEFT JOIN gov_budgets b ON j.id = b.jurisdiction_id
    WHERE (fiscal_year IS NULL OR b.fiscal_year = fiscal_year)
    GROUP BY j.id, j.name, j.level;
    
    DROP TEMPORARY TABLE IF EXISTS temp_jurisdictions;
END //

CREATE PROCEDURE SearchPublicBudgetData(
    IN search_query VARCHAR(100),
    IN fiscal_year INT,
    IN level_filter VARCHAR(20)
)
BEGIN
    SELECT 
        j.id,
        j.name,
        j.level,
        j.code,
        SUM(b.allocated_amount) AS total_allocated,
        SUM(b.spent_amount) AS total_spent,
        ROUND((SUM(b.spent_amount) / NULLIF(SUM(b.allocated_amount), 0)) * 100, 2) AS utilization_percentage
    FROM jurisdictions j
    LEFT JOIN gov_budgets b ON j.id = b.jurisdiction_id
    WHERE 
        (search_query IS NULL OR j.name LIKE CONCAT('%', search_query, '%') OR j.code LIKE CONCAT('%', search_query, '%'))
        AND (fiscal_year IS NULL OR b.fiscal_year = fiscal_year)
        AND (level_filter IS NULL OR j.level = level_filter)
    GROUP BY j.id, j.name, j.level, j.code
    ORDER BY 
        CASE j.level 
            WHEN 'national' THEN 1
            WHEN 'county' THEN 2
            WHEN 'subcounty' THEN 3
            ELSE 4
        END,
        j.name;
END //

DELIMITER ;

-- Grant permissions
GRANT ALL PRIVILEGES ON budget_tracker.* TO 'budget_user'@'localhost';
FLUSH PRIVILEGES;
