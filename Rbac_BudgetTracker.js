// Database Schema (SQL)
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Jurisdictions hierarchy (National -> County -> Sub-County)
CREATE TABLE jurisdictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    level ENUM('national', 'county', 'subcounty') NOT NULL,
    parent_id INT NULL,
    FOREIGN KEY (parent_id) REFERENCES jurisdictions(id) ON DELETE CASCADE
);

-- Departments within each jurisdiction
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jurisdiction_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
    UNIQUE (jurisdiction_id, code)
);

-- Roles definition
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    hierarchy_level INT NOT NULL COMMENT 'Higher number means more privileges'
);

-- User roles assignment with jurisdiction scope
CREATE TABLE user_roles (
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

-- Budget data table
CREATE TABLE budgets (
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

-- Initial data for Kenya
INSERT INTO jurisdictions (name, code, level, parent_id) VALUES 
('National Government', 'KE-NATIONAL', 'national', NULL),
('Nairobi County', 'KE-047', 'county', 1),
('Mombasa County', 'KE-001', 'county', 1),
('Kisumu County', 'KE-042', 'county', 1),
('Westlands Sub-County', 'KE-047-01', 'subcounty', 2),
('Dagoretti Sub-County', 'KE-047-02', 'subcounty', 2),
('Nyali Sub-County', 'KE-001-01', 'subcounty', 3);

-- Sample departments
INSERT INTO departments (jurisdiction_id, name, code) VALUES
(1, 'National Treasury', 'NT'),
(1, 'Ministry of Health', 'MOH'),
(2, 'Nairobi County Health', 'NCH'),
(2, 'Nairobi County Transport', 'NCT'),
(5, 'Westlands Public Works', 'WPW');

-- Roles hierarchy
INSERT INTO roles (name, description, hierarchy_level) VALUES
('Super Admin', 'Full system access', 100),
('National Admin', 'National government level access', 90),
('County Admin', 'County level access', 80),
('Sub-County Admin', 'Sub-county level access', 70),
('Department Head', 'Department-level access within jurisdiction', 60),
('Budget Officer', 'Can enter and view budget data for assigned scope', 50),
('Viewer', 'Read-only access for assigned scope', 40);

-- 1. Stored Procedure for National Budget Summary
DELIMITER //
CREATE PROCEDURE GetNationalBudgetSummary(IN fiscal_year INT)
BEGIN
    SELECT 
        j.level,
        COUNT(DISTINCT j.id) AS jurisdiction_count,
        SUM(b.allocated_amount) AS total_allocated,
        SUM(b.spent_amount) AS total_spent,
        ROUND((SUM(b.spent_amount) / SUM(b.allocated_amount)) * 100, 2) AS utilization_percentage
    FROM jurisdictions j
    LEFT JOIN budgets b ON j.id = b.jurisdiction_id
    WHERE (fiscal_year IS NULL OR b.fiscal_year = fiscal_year)
    GROUP BY j.level WITH ROLLUP;
END //
DELIMITER ;

-- 2. Stored Procedure for Jurisdiction Budget Summary
DELIMITER //
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
        ROUND((SUM(b.spent_amount) / SUM(b.allocated_amount)) * 100, 2) AS utilization_percentage,
        COUNT(DISTINCT b.department_id) AS department_count
    FROM temp_jurisdictions j
    LEFT JOIN budgets b ON j.id = b.jurisdiction_id
    WHERE (fiscal_year IS NULL OR b.fiscal_year = fiscal_year)
    GROUP BY j.id, j.name, j.level;
    
    DROP TEMPORARY TABLE IF EXISTS temp_jurisdictions;
END //
DELIMITER ;

-- 3. Stored Procedure for Public Budget Search
DELIMITER //
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
        ROUND((SUM(b.spent_amount) / SUM(b.allocated_amount)) * 100, 2) AS utilization_percentage
    FROM jurisdictions j
    LEFT JOIN budgets b ON j.id = b.jurisdiction_id
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

-- 4. Stored Procedure for User Authentication
DELIMITER //
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
            r.name AS role,
            j.id AS jurisdiction_id,
            j.name AS jurisdiction_name,
            j.level AS jurisdiction_level,
            'success' AS message
        FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        JOIN jurisdictions j ON ur.jurisdiction_id = j.id
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
DELIMITER ;

-- Helper function for password comparison
DELIMITER //
CREATE FUNCTION bcrypt_compare(input_password VARCHAR(255), stored_hash VARCHAR(255))
RETURNS BOOLEAN DETERMINISTIC
BEGIN
    RETURN stored_hash = IFNULL((SELECT CONCAT('$2a$', SUBSTRING(stored_hash, 5)) = 
           IFNULL((SELECT CONCAT('$2a$', SUBSTRING(TO_BASE64(UNHEX(SHA2(input_password, 256))), 1, 22)), stored_hash);
END //
DELIMITER ;
