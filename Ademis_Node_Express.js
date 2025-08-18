/*
Linux CLI Setup for Full-Stack Development (React, Node.js, Express, PostgreSQL, Tailwind CSS)

//update packages
sudo apt update && sudo apt upgrade -y

//install essential buid tools
sudo apt install -y build-essential curl git

// install nodesource repository latest version
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

// verify installation
node --version
npm --version

// Create postgre database
sudo -u postgres psql -c "CREATE USER devuser WITH PASSWORD '@Ad3m1s_xyz_number';"
sudo -u postgres psql -c "CREATE DATABASE education-management-system_db WITH OWNER devuser;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE kemis_db TO devuser;"

//Setup Backend
mkdir education-management-system && cd education-management-system
mkdir backend && cd backend

// initialize project
npm init -y

// Install required dependencies:
npm install express pg sequelize cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon morgan

touch server.js

// Create .env file:
echo "DB_NAME=kemis_db
DB_USER=devuser
DB_PASSWORD=@K3m1s_2025
DB_HOST=localhost
PORT=5000
JWT_SECRET=your_jwt_secret_here" > .env

// Add scripts to package.json:
json

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}

// Backend/Node structure
src/
├── config/               # Configuration files
├── controllers/         # Route controllers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API routes
├── services/            # Business logic
├── utils/               # Utility classes/functions
└── validators/          # Request validators
================================== FRONT END SETUP ================================================

cd ..
npx create-react-app frontend
cd frontend

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install axios react-router-dom react-hook-form react-chartjs-2 chart.js
npm install --save-dev @tailwindcss/forms
npm install react-datepicker

// education-management-system/package.json
echo '{
  "name": "education-management-system",
  "version": "1.0.0",
  "scripts": {
    "backend": "cd backend && npm run dev",
    "frontend": "cd frontend && npm start",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\"",
    "setup": "cd backend && npm install && cd ../frontend && npm install"
  },
  "devDependencies": {
    "concurrently": "^7.0.0"
  }
}' > package.json

// Install Concurrently for running both servers, and Run both frontend and backend simultaneously:
bash

npm install --save-dev concurrently
npm run dev

Production Build:
bash

cd frontend && npm run build

Process Manager (for production):
bash

sudo npm install -g pm2
pm2 start backend/server.js

// Frontend structure
src/
├── assets/              # Static assets
├── components/         # Reusable components
│   ├── auth/
│   ├── dashboard/
│   ├── data/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
│   ├── admin/
│   ├── county/
│   ├── institution/
│   ├── public/
│   └── shared/
├── services/           # API service calls
├── styles/             # Custom styles
├── utils/              # Utility functions
└── App.js              # Main app component

*/
// ============================================== BACK END ============================================

// Sql
CREATE TABLE counties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE sub_counties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  county_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  FOREIGN KEY (county_id) REFERENCES counties(id)
);

CREATE TABLE zones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sub_county_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  FOREIGN KEY (sub_county_id) REFERENCES sub_counties(id)
);

CREATE TABLE user_permissions (
  user_id VARCHAR(20) PRIMARY KEY,
  can_update_progress BOOLEAN DEFAULT FALSE,
  can_manage_learners BOOLEAN DEFAULT FALSE,
  can_manage_finances BOOLEAN DEFAULT FALSE,
  can_manage_procurement BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users_roles(user_id)
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipient_id VARCHAR(20) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recipient_id) REFERENCES users_roles(user_id)
);

CREATE TABLE system_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  performed_by VARCHAR(20),
  performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institutions (
  institution_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  county VARCHAR(100) NOT NULL,
  sub_county VARCHAR(100) NOT NULL,
  zone VARCHAR(100) NOT NULL,
  type ENUM('Early Learning', 'Primary', 'Junior Secondary', 'High School', 'TVET', 'University') NOT NULL,
  category ENUM('Community Based', 'Faith Based', 'Private', 'Public') NOT NULL,
  registration_date DATE,
  status ENUM('Pending', 'Approved', 'Suspended', 'Deregistered') DEFAULT 'Pending',
  physical_address TEXT,
  county_id INT,
  sub_county_id INT,
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (county_id) REFERENCES counties(id),
  FOREIGN KEY (sub_county_id) REFERENCES sub_counties(id),
  INDEX idx_institution_status (status),
  INDEX idx_institution_type (type)
);

CREATE TABLE users_roles (
  user_id VARCHAR(20) PRIMARY KEY,
  institution_id VARCHAR(20),
  national_id VARCHAR(20) UNIQUE,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  sur_name VARCHAR(50),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  role ENUM('national_admin', 'county_admin', 'subcounty_admin', 'institution_admin', 'institution_staff', 'public') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  INDEX idx_user_role (role),
  INDEX idx_user_institution (institution_id)
);

CREATE TABLE institution_applications (
  application_id VARCHAR(20) PRIMARY KEY,
  institution_name VARCHAR(100) NOT NULL,
  institution_county VARCHAR(100) NOT NULL,
  institution_sub_county VARCHAR(100) NOT NULL,
  institution_zone VARCHAR(100) NOT NULL,
  institution_type VARCHAR(50) NOT NULL,
  institution_category VARCHAR(50) NOT NULL,
  applicant_user_id VARCHAR(20) NOT NULL,
  physical_address TEXT,
  county_id INT,
  sub_county_id INT,
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  documents JSON,
  status ENUM('Submitted', 'Under Review', 'Approved', 'Rejected') DEFAULT 'Submitted',
  review_notes TEXT,
  reviewed_by VARCHAR(20),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_user_id) REFERENCES users_roles(user_id),
  FOREIGN KEY (reviewed_by) REFERENCES users_roles(user_id),
  FOREIGN KEY (county_id) REFERENCES counties(id),
  FOREIGN KEY (sub_county_id) REFERENCES sub_counties(id),
  INDEX idx_application_status (status)
);

CCREATE TABLE financial_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution_id VARCHAR(20) NOT NULL,
  record_type ENUM('Fee Payment', 'Government Funding', 'Donor Funding', 'Other Income', 'Expense') NOT NULL,
  bank_details ENUM('Tuition', 'Maintenance', 'Development') NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  reference_number VARCHAR(50),
  transaction_date DATE NOT NULL,
  recorded_by VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (recorded_by) REFERENCES users_roles(user_id),
  INDEX idx_financial_date (transaction_date),
  INDEX idx_financial_type (record_type)
);

CREATE TABLE procurement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution_id VARCHAR(20) NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  category ENUM('Learning Materials', 'Sanitary', 'Equipment', 'Other') NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  supplier VARCHAR(100),
  order_date DATE,
  delivery_date DATE,
  status ENUM('Requested', 'Ordered', 'Delivered', 'Cancelled') DEFAULT 'Requested',
  ordered_by VARCHAR(20),
  received_by VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (ordered_by) REFERENCES users_roles(user_id),
  FOREIGN KEY (received_by) REFERENCES users_roles(user_id),
  INDEX idx_procurement_status (status),
  INDEX idx_procurement_category (category)
);

CREATE TABLE learners (
  learner_id VARCHAR(20) PRIMARY KEY,
  institution_id VARCHAR(20) NOT NULL,
  national_id VARCHAR(20),
  birth_certificate_no VARCHAR(50) UNIQUE,
  upi_number VARCHAR(20) UNIQUE,
  sur_name VARCHAR(50),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  enrollment_date DATE,
  current_grade VARCHAR(20),
  parent_guardian_phone VARCHAR(20) NOT NULL,
  parent_guardian_email VARCHAR(100),
  status ENUM('Active', 'Transferred', 'Graduated', 'Dropped Out', 'Deceased') DEFAULT 'Active',
  exit_reason ENUM('TVET Graduate', 'University Graduate', 'Deceased', 'Dropout', 'Transferred'),
  exit_date DATE,
  is_foreign BOOLEAN DEFAULT FALSE,
  foreign_passport_no VARCHAR(50),
  foreign_country VARCHAR(50),
  visa_type VARCHAR(50),
  visa_expiry DATE,
  created_by VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  digital_id_hash VARCHAR(255);
  digital_id_generated_at TIMESTAMP NULL;
  digital_id_sent_via_email BOOLEAN DEFAULT FALSE;
  digital_id_sent_via_sms BOOLEAN DEFAULT FALSE;
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (created_by) REFERENCES users_roles(user_id),
  INDEX idx_learner_contact (parent_guardian_phone, parent_guardian_email),
  INDEX idx_learner_status (status),
  INDEX idx_learner_institution (institution_id)
);

CREATE TABLE digital_id_delivery_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    learner_id VARCHAR(20) NOT NULL,
    delivery_method ENUM('email', 'sms') NOT NULL,
    delivery_status ENUM('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
    delivery_timestamp TIMESTAMP NULL,
    error_message TEXT,
    FOREIGN KEY (learner_id) REFERENCES learners(learner_id)
);
 
CREATE TABLE parent_guardians (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  national_id VARCHAR(20),
  sur_name VARCHAR(50),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  relationship VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  address TEXT,
  is_foreign BOOLEAN DEFAULT FALSE,
  iprs_validated BOOLEAN DEFAULT FALSE,
  validation_timestamp TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  INDEX idx_parent_national_id (national_id),
  INDEX idx_parent_phone (phone_number)
);

CREATE TABLE foreign_learner_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  passport_number VARCHAR(50) NOT NULL,
  country_of_origin VARCHAR(50) NOT NULL,
  visa_type VARCHAR(50),
  visa_expiry DATE,
  entry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  UNIQUE KEY uk_passport (passport_number),
  INDEX idx_foreign_learner (learner_id)
);

CREATE TABLE learner_otp_verification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  contact_value VARCHAR(100) NOT NULL,
  contact_type ENUM('phone', 'email') NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  attempts TINYINT DEFAULT 0,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  INDEX idx_otp_verification (learner_id, contact_value, otp_code),
  INDEX idx_otp_expiry (expires_at)
);

CREATE TABLE learner_search_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  search_type ENUM('OTP', 'SecretCode') NOT NULL,
  contact_method ENUM('phone', 'email'),
  institution_id VARCHAR(20) NOT NULL,
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  INDEX idx_search_logs (learner_id, searched_at)
);

-- Corrected learner_progress table
CREATE TABLE learner_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  academic_year VARCHAR(10) NOT NULL,
  term VARCHAR(20) NOT NULL,
  grade VARCHAR(20) NOT NULL,
  subjects JSON,
  overall_remarks TEXT,
  teacher_id VARCHAR(20) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  FOREIGN KEY (teacher_id) REFERENCES users_roles(user_id),
  FOREIGN KEY (academic_year) REFERENCES academic_years(year),
  UNIQUE KEY uk_learner_progress (learner_id, academic_year, term),
  INDEX idx_progress_learner (learner_id),
  INDEX idx_progress_year (academic_year)
);

CREATE TABLE grade_progression_rules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  current_grade VARCHAR(20) NOT NULL,
  next_grade VARCHAR(20),
  institution_type ENUM('Early Learning', 'Primary', 'Junior Secondary', 'High School', 'TVET', 'University') NOT NULL,
  institution_category ENUM('Community Based', 'Faith Based', 'Private', 'Public') NOT NULL,
  is_final_grade BOOLEAN DEFAULT FALSE,
  UNIQUE KEY uk_grade_progression (current_grade, institution_type),
  INDEX idx_progression_rules (institution_type, current_grade)
);

CREATE TABLE academic_years (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year VARCHAR(9) NOT NULL UNIQUE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_academic_years (year, is_current)
);

CREATE TABLE learner_transfers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  from_institution_id VARCHAR(20) NOT NULL,
  to_institution_id VARCHAR(20) NOT NULL,
  transfer_date DATE NOT NULL,
  reason TEXT,
  initiated_by VARCHAR(20) NOT NULL,
  status ENUM('Pending', 'Approved', 'Rejected', 'Completed') DEFAULT 'Pending',
  approved_by VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  FOREIGN KEY (from_institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (to_institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (initiated_by) REFERENCES users_roles(user_id),
  FOREIGN KEY (approved_by) REFERENCES users_roles(user_id),
  INDEX idx_transfer_status (status),
  INDEX idx_transfer_dates (transfer_date, created_at)
);

CREATE TABLE grievances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  submitted_by VARCHAR(20) NOT NULL,
  institution_id VARCHAR(20),
  frequency ENUM('First Time', 'Recurrent') DEFAULT 'First Time',
  status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
  assigned_to VARCHAR(20),
  resolution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  FOREIGN KEY (submitted_by) REFERENCES users_roles(user_id),
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (assigned_to) REFERENCES users_roles(user_id),
  INDEX idx_grievance_status (status),
  INDEX idx_grievance_institution (institution_id)
);

DELIMITER //

CREATE PROCEDURE sp_CreateUserWithRole(
    IN p_national_id VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_sur_name VARCHAR(50),
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_phone VARCHAR(20),
    IN p_role ENUM('national_admin', 'county_admin', 'subcounty_admin', 'institution_admin', 'institution_staff', 'public'),
    IN p_institution_id VARCHAR(20),
    OUT p_user_id VARCHAR(20)
BEGIN
    DECLARE user_count INT;
    DECLARE institution_exists INT;
    
    -- Validate email uniqueness
    SELECT COUNT(*) INTO user_count FROM users WHERE email = p_email;
    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email already exists';
    END IF;
    
    -- Validate national ID uniqueness if provided
    IF p_national_id IS NOT NULL THEN
        SELECT COUNT(*) INTO user_count FROM users WHERE national_id = p_national_id;
        IF user_count > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'National ID already exists';
        END IF;
    END IF;
    
    -- Validate institution exists if role requires it
    IF p_institution_id IS NOT NULL THEN
        SELECT COUNT(*) INTO institution_exists FROM institutions WHERE institution_id = p_institution_id;
        IF institution_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Institution does not exist';
        END IF;
    END IF;
    
    -- Generate user ID
    SET p_user_id = CONCAT('USR-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(FLOOR(RAND() * 10000), 4, '0'));
    
    -- Insert user
    INSERT INTO users (
        user_id,
        national_id,
        email,
        password_hash,
        sur_name,
        first_name,
        last_name,
        phone,
        role,
        institution_id,
        is_active
    ) VALUES (
        p_user_id,
        p_national_id,
        p_email,
        p_password_hash,
        p_sur_name,
        p_first_name,
        p_last_name,
        p_phone,
        p_role,
        p_institution_id,
        TRUE
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_AssignStaffPermissions(
    IN p_institution_admin_id VARCHAR(20),
    IN p_staff_id VARCHAR(20),
    IN p_can_update_progress BOOLEAN,
    IN p_can_manage_learners BOOLEAN,
    IN p_can_manage_finances BOOLEAN,
    IN p_can_manage_procurement BOOLEAN)
BEGIN
    DECLARE admin_institution_id VARCHAR(20);
    DECLARE staff_institution_id VARCHAR(20);
    DECLARE is_admin BOOLEAN;
    
    -- Verify requesting user is an admin of the institution
    SELECT institution_id, role = 'institution_admin' INTO admin_institution_id, is_admin
    FROM users WHERE user_id = p_institution_admin_id;
    
    IF NOT is_admin OR admin_institution_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only institution admins can assign permissions';
    END IF;
    
    -- Verify staff belongs to the same institution
    SELECT institution_id INTO staff_institution_id
    FROM users WHERE user_id = p_staff_id;
    
    IF staff_institution_id != admin_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Staff member must belong to your institution';
    END IF;
    
    -- Update staff permissions
    UPDATE user_permissions SET
        can_update_progress = p_can_update_progress,
        can_manage_learners = p_can_manage_learners,
        can_manage_finances = p_can_view_finances,
        can_manage_procurement = p_can_manage_procurement,
        updated_at = NOW()
    WHERE user_id = p_staff_id;
    
    -- Insert if record doesn't exist
    IF ROW_COUNT() = 0 THEN
        INSERT INTO user_permissions (
            user_id,
            can_update_progress,
            can_manage_learners,
            can_manage_finances,
            can_manage_procurement
        ) VALUES (
            p_staff_id,
            p_can_update_progress,
            p_can_manage_learners,
            p_can_manage_finances,
            p_can_manage_procurement
        );
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_SubmitInstitutionApplication(
    IN p_user_id VARCHAR(20),
    IN p_institution_name VARCHAR(100),
    IN p_institution_county VARCHAR(100),
    IN p_institution_sub_county VARCHAR(100),
    IN p_institution_zone VARCHAR(100),
    IN p_institution_type ENUM('Early Learning', 'Primary', 'Junior Secondary', 'High School', 'TVET', 'University'),
    IN p_institution_category ENUM('Community Based', 'Faith Based', 'Private', 'Public'),
    IN p_physical_address TEXT,
    IN p_county_id INT,
    IN p_sub_county_id INT,
    IN p_contact_email VARCHAR(100),
    IN p_contact_phone VARCHAR(20),
    IN p_documents JSON,
    OUT p_application_id VARCHAR(20))
BEGIN
    DECLARE user_exists INT;
    DECLARE county_exists INT;
    DECLARE subcounty_exists INT;
    DECLARE zone_exists INT;
    
    -- Validate user exists
    SELECT COUNT(*) INTO user_exists FROM users WHERE user_id = p_user_id;
    IF user_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User does not exist';
    END IF;
    
    -- Validate county exists
    SELECT COUNT(*) INTO county_exists FROM counties WHERE id = p_county_id;
    IF county_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'County does not exist';
    END IF;
    
    -- Validate sub-county exists and belongs to county
    SELECT COUNT(*) INTO subcounty_exists 
    FROM sub_counties 
    WHERE id = p_subcounty_id AND county_id = p_county_id;

   IF application_status != 'Submitted' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Application has already been submitted';
    END IF;
    
    -- Verify submitter is a subcounty admin for this subcounty
    SELECT role INTO submitter_role 
    FROM users_role 
    WHERE user_id = p_subcounty_admin_id;
    
    IF submitter_role != 'subcounty_admin' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only subcounty admins can submit applications';
    END IF;
    
    -- Verify submitter is admin for this subcounty
    IF NOT EXISTS (
        SELECT 1 FROM subcounty_admins 
        WHERE user_id = p_subcounty_admins_id AND county_id = county_id
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You are not authorized to submit applications for this county';
    END IF;
    
    IF subcounty_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sub-county does not exist or does not belong to specified county';
    END IF;
    
    -- Generate application ID
    SET p_application_id = CONCAT('APP-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(FLOOR(RAND() * 10000), 4, '0'));
    
    -- Insert application
    INSERT INTO institution_applications (
        application_id,
        institution_name,
        institution_county,
        institution_sub_county,
        institution_zone,
        institution_type,
        institution_category,
        applicant_user_id,
        physical_address,
        county_id,
        sub_county_id,
        contact_email,
        contact_phone,
        documents,
        status
    ) VALUES (
        p_application_id,
        p_institution_name,
        p_institution_county,
        p_institution_sub_county,
        p_institution_zone,
        p_institution_type,
        p_institution_category,
        p_user_id,
        p_physical_address,
        p_county_id,
        p_sub_county_id,
        p_contact_email,
        p_contact_phone,
        p_documents,
        'Submitted'
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_ReviewInstitutionApplication(
    IN p_application_id VARCHAR(20),
    IN p_reviewer_id VARCHAR(20),
    IN p_decision ENUM('Approved', 'Rejected', 'Request More Info'),
    IN p_notes TEXT)
BEGIN
    DECLARE application_status VARCHAR(20);
    DECLARE applicant_id VARCHAR(20);
    DECLARE reviewer_role VARCHAR(20);
    DECLARE institution_name VARCHAR(100);
    DECLARE institution_type VARCHAR(50);
    DECLARE county_id INT;
    DECLARE sub_county_id INT;
    DECLARE institution_id VARCHAR(20);
    
    -- Get application details
    SELECT 
        status, applicant_user_id, institution_name, institution_type, 
        county_id, sub_county_id
    INTO 
        application_status, applicant_id, institution_name, institution_type,
        county_id, sub_county_id
    FROM institution_applications 
    WHERE application_id = p_application_id;
    
    IF application_status IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Application not found';
    END IF;
    
    IF application_status != 'Submitted' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Application has already been reviewed';
    END IF;
    
    -- Verify reviewer is a county admin for this county
    SELECT role INTO reviewer_role 
    FROM users 
    WHERE user_id = p_reviewer_id;
    
    IF reviewer_role != 'county_admin' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only county admins can review applications';
    END IF;
    
    -- Verify reviewer is admin for this county
    IF NOT EXISTS (
        SELECT 1 FROM county_admins 
        WHERE user_id = p_reviewer_id AND county_id = county_id
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You are not authorized to review applications for this county';
    END IF;
    
    -- Update application status
    UPDATE institution_applications SET
        status = p_decision,
        review_notes = p_notes,
        reviewed_by = p_reviewer_id,
        reviewed_at = NOW()
    WHERE application_id = p_application_id;
    
    -- If approved, create the institution
    IF p_decision = 'Approved' THEN
        -- Generate institution ID
        SET institution_id = CONCAT('INST-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(FLOOR(RAND() * 10000), 4, '0'));
        
        -- Create institution
        INSERT INTO institutions (
            institution_id,
            county,
            sub_county,
            zone,
            name,
            type,
            registration_date,
            status,
            physical_address,
            county_id,
            sub_county_id,
            contact_email,
            contact_phone
        ) VALUES (
            institution_id,
            institution_county,
            institution_sub_county,
            institution_zone,
            institution_name,
            institution_type,
            CURDATE(),
            'Approved',
            (SELECT physical_address FROM institution_applications WHERE application_id = p_application_id),
            county_id,
            sub_county_id,
            (SELECT contact_email FROM institution_applications WHERE application_id = p_application_id),
            (SELECT contact_phone FROM institution_applications WHERE application_id = p_application_id)
        );
        
        -- Update applicant to institution admin
        UPDATE users SET
            role = 'institution_admin',
            institution_id = institution_id
        WHERE user_id = applicant_id;
        
        -- Create notification
        INSERT INTO notifications (
            recipient_id,
            subject,
            content,
            metadata
        ) VALUES (
            applicant_id,
            'Institution Registration Approved',
            CONCAT('Your institution "', institution_name, '" has been approved. Institution ID: ', institution_id),
            JSON_OBJECT(
                'institution_id', institution_id,
                'application_id', p_application_id
            )
        );
    ELSEIF p_decision = 'Rejected' THEN
        -- Create notification for rejection
        INSERT INTO notifications (
            recipient_id,
            subject,
            content,
            metadata
        ) VALUES (
            applicant_id,
            'Institution Registration Rejected',
            CONCAT('Your institution application for "', institution_name, '" has been rejected. Reason: ', p_notes),
            JSON_OBJECT(
                'application_id', p_application_id
            )
        );
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_RegisterLearnerWithGuardian(
    IN p_institution_id VARCHAR(20),
    IN p_national_id VARCHAR(20),
    IN p_birth_certificate_no VARCHAR(50),
    IN p_upi_number VARCHAR(20),
    IN p_sur_name VARCHAR(50),
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_date_of_birth DATE,
    IN p_gender ENUM('Male', 'Female', 'Other'),
    IN p_enrollment_date DATE,
    IN p_current_grade VARCHAR(20),
    IN p_parent_guardian_phone VARCHAR(20),
    IN p_parent_guardian_email VARCHAR(100),
    IN p_created_by VARCHAR(20),
    OUT p_learner_id VARCHAR(20))
BEGIN
    DECLARE v_institution_type VARCHAR(20);
    DECLARE v_grade_exists BOOLEAN;
    
    -- Validate institution and get type
    SELECT type INTO v_institution_type 
    FROM institutions 
    WHERE institution_id = p_institution_id;
    
    IF v_institution_type IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Institution does not exist';
    END IF;
    
    -- Validate grade exists for this institution type
    SELECT EXISTS (
        SELECT 1 FROM grade_progression_rules 
        WHERE current_grade = p_current_grade 
        AND institution_type = v_institution_type
    ) INTO v_grade_exists;
    
    IF NOT v_grade_exists THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid grade for this institution type';
    END IF;

   -- Validate creator has permission to add learners to this institution
    SELECT institution_id INTO creator_institution_id FROM users WHERE user_id = p_created_by;
    
    IF creator_institution_id != p_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can only add learners to your own institution';
    END IF;
    
    SELECT can_manage_learners INTO creator_has_permission 
    FROM user_permissions 
    WHERE user_id = p_created_by;
    
    IF NOT creator_has_permission THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not have permission to add learners';
    END IF;
    
    -- Generate learner ID
    SET p_learner_id = CONCAT('LRN-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', 
                        (SELECT COUNT(*) + 1 FROM learners 
                         WHERE DATE(created_at) = CURDATE()));
    
    -- Insert learner
    INSERT INTO learners (
        learner_id, institution_id, national_id, birth_certificate_no, upi_number,
        sur_name,first_name, last_name, date_of_birth, gender, enrollment_date,
        current_grade, parent_guardian_phone, parent_guardian_email, created_by
    ) VALUES (
        p_learner_id, p_institution_id, p_national_id, p_birth_certificate_no, p_upi_number,
        p_sur_name,p_first_name, p_last_name, p_date_of_birth, p_gender, p_enrollment_date,
        p_current_grade, p_parent_guardian_phone, p_parent_guardian_email, p_created_by
    );
    
    -- Generate and send OTP (implementation would call SMS/email service)
    CALL sp_GenerateAndSendOTP(p_learner_id, p_parent_guardian_phone, 'phone');
    
    IF p_parent_guardian_email IS NOT NULL THEN
        CALL sp_GenerateAndSendOTP(p_learner_id, p_parent_guardian_email, 'email');
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_GenerateAndSendOTP(
    IN p_learner_id VARCHAR(20),
    IN p_contact_value VARCHAR(100),
    IN p_contact_type ENUM('phone', 'email'))
BEGIN
    DECLARE v_otp_code VARCHAR(6);
    DECLARE v_expires_at TIMESTAMP;
    
    -- Generate random 6-digit OTP
    SET v_otp_code = LPAD(FLOOR(RAND() * 1000000), 6, '0');
    SET v_expires_at = TIMESTAMPADD(HOUR, 24, NOW());
    
    -- Invalidate any existing OTPs for this learner/contact
    UPDATE learner_otp_verification
    SET is_used = TRUE
    WHERE learner_id = p_learner_id 
      AND contact_value = p_contact_value
      AND is_used = FALSE;
    
    -- Store new OTP
    INSERT INTO learner_otp_verification (
        learner_id, contact_value, contact_type, 
        otp_code, expires_at
    ) VALUES (
        p_learner_id, p_contact_value, p_contact_type,
        v_otp_code, v_expires_at
    );
    
    -- In production, you would integrate with SMS/email service here
    -- For phone: Send SMS with OTP code
    -- For email: Send email with OTP code
    
    -- For demonstration, return the OTP (remove in production)
    SELECT v_otp_code AS otp_code, v_expires_at AS expires_at;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_VerifyOTPAndGetLearner(
    IN p_contact_value VARCHAR(100),
    IN p_otp_code VARCHAR(6),
    OUT p_learner_id VARCHAR(20),
    OUT p_auth_token VARCHAR(64))
BEGIN
    DECLARE v_otp_valid BOOLEAN DEFAULT FALSE;
    DECLARE v_learner_exists BOOLEAN;
    DECLARE v_attempts INT;
    
    -- Check OTP validity
    SELECT 
        learner_id, 
        attempts,
        expires_at > NOW() AND is_used = FALSE AS is_valid
    INTO 
        p_learner_id, v_attempts, v_otp_valid
    FROM learner_otp_verification
    WHERE contact_value = p_contact_value
      AND otp_code = p_otp_code
    ORDER BY generated_at DESC
    LIMIT 1;
    
    -- Check if learner exists
    SELECT EXISTS (
        SELECT 1 FROM learners 
        WHERE learner_id = p_learner_id 
          AND (parent_guardian_phone = p_contact_value OR parent_guardian_email = p_contact_value)
          AND status = 'Active'
    ) INTO v_learner_exists;
    
    -- Handle invalid cases
    IF p_learner_id IS NULL OR NOT v_learner_exists THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid OTP or learner not found';
    ELSEIF v_attempts >= 3 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Too many failed attempts';
    ELSEIF NOT v_otp_valid THEN
        -- Increment attempt counter
        UPDATE learner_otp_verification
        SET attempts = attempts + 1
        WHERE contact_value = p_contact_value
          AND otp_code = p_otp_code;
        
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid or expired OTP';
    END IF;
    
    -- Mark OTP as used
    UPDATE learner_otp_verification
    SET is_used = TRUE
    WHERE contact_value = p_contact_value
      AND otp_code = p_otp_code;
    
    -- Generate auth token (simplified for example)
    SET p_auth_token = SHA2(CONCAT(p_learner_id, NOW(), RAND()), 256);
    
    -- Return learner information
    SELECT 
        l.learner_id,
        l.upi_number,
        l.national_id,
        l.birth_certificate_no,
        CONCAT(l.first_name, ' ', l.last_name) AS full_name,
        l.date_of_birth,
        l.gender,
        l.current_grade,
        i.name AS institution_name,
        i.type AS institution_type,
        p_auth_token AS auth_token
    FROM 
        learners l
    JOIN 
        institutions i ON l.institution_id = i.institution_id
    WHERE 
        l.learner_id = p_learner_id;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_GenerateAndDeliverDigitalID(
    IN p_learner_id VARCHAR(20))
BEGIN
    DECLARE v_first_name VARCHAR(50);
    DECLARE v_last_name VARCHAR(50);
    DECLARE v_upi_number VARCHAR(20);
    DECLARE v_institution_name VARCHAR(100);
    DECLARE v_institution_id VARCHAR(20);
    DECLARE v_current_grade VARCHAR(20);
    DECLARE v_email VARCHAR(100);
    DECLARE v_phone VARCHAR(20);
    DECLARE v_digital_id TEXT;
    DECLARE v_qr_code_url VARCHAR(255);
    DECLARE v_email_status BOOLEAN DEFAULT FALSE;
    DECLARE v_sms_status BOOLEAN DEFAULT FALSE;
    
    -- Get learner details
    SELECT 
        l.first_name, l.last_name, l.upi_number, 
        i.name, l.institution_id, l.current_grade,
        l.parent_guardian_email, l.parent_guardian_phone
    INTO 
        v_first_name, v_last_name, v_upi_number,
        v_institution_name, v_institution_id, v_current_grade,
        v_email, v_phone
    FROM learners l
    JOIN institutions i ON l.institution_id = i.institution_id
    WHERE l.learner_id = p_learner_id;
    
    -- Generate digital ID content (JSON format)
    SET v_digital_id = JSON_OBJECT(
        'learner_id', p_learner_id,
        'upi_number', v_upi_number,
        'full_name', CONCAT(v_first_name, ' ', v_last_name),
        'institution', JSON_OBJECT(
            'id', v_institution_id,
            'name', v_institution_name
        ),
        'current_grade', v_current_grade,
        'issue_date', DATE_FORMAT(NOW(), '%Y-%m-%d'),
        'expiry_date', DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 YEAR), '%Y-%m-%d')
    );
    
    -- Generate QR code URL (would be implemented in your application)
    SET v_qr_code_url = CONCAT('https://api.yourschoolsystem.com/qr?id=', p_learner_id);
    
    -- Hash the digital ID for storage
    UPDATE learners
    SET digital_id_hash = SHA2(v_digital_id, 256),
        digital_id_generated_at = NOW()
    WHERE learner_id = p_learner_id;
    
    -- Send via email if available
    IF v_email IS NOT NULL THEN
        -- In production, this would call your email service
        -- For demonstration, we'll simulate it
        INSERT INTO digital_id_delivery_logs (
            learner_id, delivery_method, delivery_status, delivery_timestamp
        ) VALUES (
            p_learner_id, 'email', 'sent', NOW()
        );
        
        UPDATE learners SET digital_id_sent_via_email = TRUE WHERE learner_id = p_learner_id;
        SET v_email_status = TRUE;
        
        -- Here you would actually call your email service API
        -- Example: CALL SendDigitalIDEmail(v_email, v_digital_id, v_qr_code_url);
    END IF;
    
    -- Send via SMS if phone available
    IF v_phone IS NOT NULL THEN
        -- In production, this would call your SMS gateway
        -- For demonstration, we'll simulate it
        INSERT INTO digital_id_delivery_logs (
            learner_id, delivery_method, delivery_status, delivery_timestamp
        ) VALUES (
            p_learner_id, 'sms', 'sent', NOW()
        );
        
        UPDATE learners SET digital_id_sent_via_sms = TRUE WHERE learner_id = p_learner_id;
        SET v_sms_status = TRUE;
        
        -- Here you would actually call your SMS service API
        -- Example: CALL SendDigitalIDSMS(v_phone, v_digital_id, v_qr_code_url);
    END IF;
    
    -- Return status
    SELECT 
        p_learner_id AS learner_id,
        v_email_status AS email_sent,
        v_sms_status AS sms_sent,
        v_digital_id AS digital_id_content,
        v_qr_code_url AS qr_code_url;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_RecordLearnerProgress(
    IN p_learner_id VARCHAR(20),
    IN p_academic_year VARCHAR(10),
    IN p_term VARCHAR(20),
    IN p_grade VARCHAR(20),
    IN p_subjects JSON,
    IN p_overall_remarks TEXT,
    IN p_teacher_id VARCHAR(20))
BEGIN
    DECLARE learner_institution_id VARCHAR(20);
    DECLARE teacher_institution_id VARCHAR(20);
    DECLARE teacher_has_permission BOOLEAN;
    
    -- Validate learner exists and get institution
    SELECT institution_id INTO learner_institution_id 
    FROM learners 
    WHERE learner_id = p_learner_id;
    
    IF learner_institution_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Learner not found';
    END IF;
    
    -- Validate teacher exists and belongs to same institution
    SELECT institution_id INTO teacher_institution_id 
    FROM users 
    WHERE user_id = p_teacher_id;
    
    IF teacher_institution_id != learner_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can only record progress for learners in your institution';
    END IF;
    
    -- Validate teacher has permission
    SELECT can_update_progress INTO teacher_has_permission 
    FROM user_permissions 
    WHERE user_id = p_teacher_id;
    
    IF NOT teacher_has_permission THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not have permission to record progress';
    END IF;
    
    -- Insert progress record
    INSERT INTO learner_progress (
        learner_id,
        academic_year,
        term,
        grade,
        subjects,
        overall_remarks,
        teacher_id
    ) VALUES (
        p_learner_id,
        p_academic_year,
        p_term,
        p_grade,
        p_subjects,
        p_overall_remarks,
        p_teacher_id
    );
    
    -- Update learner's current grade if different
    IF p_grade IS NOT NULL THEN
        UPDATE learners SET
            current_grade = p_grade
        WHERE learner_id = p_learner_id AND current_grade != p_grade;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_ProcessAnnualGradeProgression(
    IN p_academic_year VARCHAR(9))
BEGIN
    DECLARE v_next_academic_year VARCHAR(9);
    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_learner_id VARCHAR(20);
    DECLARE v_current_grade VARCHAR(20);
    DECLARE v_institution_type VARCHAR(20);
    DECLARE v_next_grade VARCHAR(20);
    DECLARE v_is_final_grade BOOLEAN;
    DECLARE v_years_without_progress INT;
    DECLARE v_institution_id VARCHAR(20);
    
    DECLARE v_learner_cursor CURSOR FOR
        SELECT l.learner_id, l.current_grade, i.type, l.institution_id
        FROM learners l
        JOIN institutions i ON l.institution_id = i.institution_id
        WHERE l.status = 'Active';
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;
    
    -- Calculate next academic year
    SET v_next_academic_year = CONCAT(
        SUBSTRING(p_academic_year, 1, 4) + 1, '-', 
        SUBSTRING(p_academic_year, 6, 4) + 1
    );
    
    -- Process each active learner
    OPEN v_learner_cursor;
    
    learner_loop: LOOP
        FETCH v_learner_cursor INTO v_learner_id, v_current_grade, v_institution_type, v_institution_id;
        IF v_done THEN
            LEAVE learner_loop;
        END IF;
        
        -- Check for learners with no progress in two consecutive years
        SELECT COUNT(DISTINCT lp.academic_year) INTO v_years_without_progress
        FROM learner_progress lp
        WHERE lp.learner_id = v_learner_id
          AND lp.academic_year IN (
              p_academic_year,
              CONCAT(SUBSTRING(p_academic_year, 1, 4) - 1, '-', SUBSTRING(p_academic_year, 6, 4) - 1)
          );
        
        -- Mark as dropout if no progress for two years
        IF v_years_without_progress = 0 THEN
            UPDATE learners
            SET status = 'Dropped Out',
                exit_reason = 'Dropout',
                exit_date = CURDATE(),
                last_updated = NOW()
            WHERE learner_id = v_learner_id;
            
            -- Create notification for institution
            INSERT INTO notifications (recipient_id, subject, content, metadata)
            SELECT user_id, 
                   'Learner Marked as Dropout',
                   CONCAT('Learner ', (SELECT CONCAT(first_name, ' ', last_name) FROM learners WHERE learner_id = v_learner_id),
                          ' has been automatically marked as dropped out due to lack of progress.'),
                   JSON_OBJECT('learner_id', v_learner_id, 'institution_id', v_institution_id)
            FROM users 
            WHERE institution_id = v_institution_id AND role = 'institution_admin';
            
            ITERATE learner_loop;
        END IF;
        
        -- Get next grade based on progression rules
        SELECT next_grade, is_final_grade 
        INTO v_next_grade, v_is_final_grade
        FROM grade_progression_rules
        WHERE current_grade = v_current_grade
          AND institution_type = v_institution_type;
        
        -- Handle graduation if this is the final grade
        IF v_is_final_grade THEN
            CASE v_institution_type
                WHEN 'TVET' THEN
                    UPDATE learners
                    SET status = 'Graduated',
                        exit_reason = 'TVET Graduate',
                        exit_date = CURDATE(),
                        last_updated = NOW()
                    WHERE learner_id = v_learner_id;
                
                WHEN 'University' THEN
                    UPDATE learners
                    SET status = 'Graduated',
                        exit_reason = 'University Graduate',
                        exit_date = CURDATE(),
                        last_updated = NOW()
                    WHERE learner_id = v_learner_id;
                
                ELSE
                    UPDATE learners
                    SET status = 'Graduated',
                        exit_reason = NULL,
                        exit_date = CURDATE(),
                        last_updated = NOW()
                    WHERE learner_id = v_learner_id;
            END CASE;
            
            -- Create notification for graduation
            INSERT INTO notifications (recipient_id, subject, content, metadata)
            SELECT user_id, 
                   'Learner Graduated',
                   CONCAT('Learner ', (SELECT CONCAT(first_name, ' ', last_name) FROM learners WHERE learner_id = v_learner_id),
                          ' has graduated from ', v_current_grade, '.'),
                   JSON_OBJECT('learner_id', v_learner_id, 'institution_id', v_institution_id)
            FROM users 
            WHERE institution_id = v_institution_id AND role = 'institution_admin';
        ELSE
            -- Move to next grade if progression rule exists
            IF v_next_grade IS NOT NULL THEN
                UPDATE learners
                SET current_grade = v_next_grade,
                    last_updated = NOW()
                WHERE learner_id = v_learner_id;
            END IF;
        END IF;
    END LOOP;
    
    CLOSE v_learner_cursor;
    
    -- Update academic year tracking
    UPDATE academic_years
    SET is_current = FALSE,
        is_active = FALSE
    WHERE year = p_academic_year;
    
    UPDATE academic_years
    SET is_current = TRUE
    WHERE year = v_next_academic_year;
    
    -- Log completion
    INSERT INTO system_logs (action, details)
    VALUES ('Annual Progression', CONCAT('Processed grade progression for academic year ', p_academic_year));
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_GetLearnerProgress(
    IN p_learner_id VARCHAR(20),
    IN p_auth_token VARCHAR(64),
    IN p_contact_value VARCHAR(100))
BEGIN
    DECLARE v_token_valid BOOLEAN;
    DECLARE v_contact_match BOOLEAN;
    
    -- Simplified token validation (in production, use proper JWT validation)
    -- Here we just check if there's a recent valid OTP for this learner/contact
    SELECT EXISTS (
        SELECT 1 FROM learner_otp_verification
        WHERE learner_id = p_learner_id
          AND contact_value = p_contact_value
          AND expires_at > NOW()
          AND is_used = TRUE
          AND generated_at > DATE_SUB(NOW(), INTERVAL 1 HOUR) -- Token valid for 1 hour
    ) INTO v_token_valid;
    
    -- Verify contact belongs to learner
    SELECT EXISTS (
        SELECT 1 FROM learners
        WHERE learner_id = p_learner_id
          AND (parent_guardian_phone = p_contact_value OR parent_guardian_email = p_contact_value)
    ) INTO v_contact_match;
    
    IF NOT v_token_valid OR NOT v_contact_match THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Authentication failed';
    END IF;
    
    -- Return learner progress
    SELECT 
        l.learner_id,
        l.upi_number,
        l.national_id,
        l.birth_certificate_no,
        CONCAT(l.first_name, ' ', l.last_name) AS full_name,
        l.date_of_birth,
        l.gender,
        l.current_grade,
        i.name AS institution_name,
        i.type AS institution_type,
        lp.academic_year,
        lp.term,
        lp.grade,
        lp.subjects,
        lp.overall_remarks,
        lp.recorded_at,
        u.first_name AS teacher_first_name,
        u.last_name AS teacher_last_name
    FROM 
        learners l
    JOIN 
        institutions i ON l.institution_id = i.institution_id
    LEFT JOIN
        learner_progress lp ON l.learner_id = lp.learner_id
    LEFT JOIN
        users u ON lp.teacher_id = u.user_id
    WHERE 
        l.learner_id = p_learner_id
    ORDER BY 
        lp.academic_year DESC, lp.term DESC;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_InitiateLearnerTransfer(
    IN p_learner_id VARCHAR(20),
    IN p_from_institution_id VARCHAR(20),
    IN p_to_institution_id VARCHAR(20),
    IN p_reason TEXT,
    IN p_initiated_by VARCHAR(20))
BEGIN
    DECLARE transfer_exists INT;
    DECLARE learner_current_institution VARCHAR(20);
    DECLARE initiator_institution_id VARCHAR(20);
    DECLARE initiator_has_permission BOOLEAN;
    
    -- Validate institutions exist
    IF NOT EXISTS (SELECT 1 FROM institutions WHERE institution_id = p_from_institution_id) OR
       NOT EXISTS (SELECT 1 FROM institutions WHERE institution_id = p_to_institution_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'One or both institutions do not exist';
    END IF;
    
    -- Validate learner exists and belongs to from institution
    SELECT institution_id INTO learner_current_institution
    FROM learners 
    WHERE learner_id = p_learner_id AND status = 'Active';
    
    IF learner_current_institution IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Learner not found or not active';
    END IF;
    
    IF learner_current_institution != p_from_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Learner does not belong to the specified institution';
    END IF;
    
    -- Validate initiator belongs to from institution
    SELECT institution_id INTO initiator_institution_id 
    FROM users 
    WHERE user_id = p_initiated_by;
    
    IF initiator_institution_id != p_from_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can only initiate transfers from your institution';
    END IF;
    
    -- Validate initiator has permission
    SELECT can_manage_learners INTO initiator_has_permission 
    FROM user_permissions 
    WHERE user_id = p_initiated_by;
    
    IF NOT initiator_has_permission THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not have permission to transfer learners';
    END IF;
    
    -- Check for existing pending transfer
    SELECT COUNT(*) INTO transfer_exists
    FROM learner_transfers
    WHERE learner_id = p_learner_id 
      AND status = 'Pending';
    
    IF transfer_exists > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'There is already a pending transfer for this learner';
    END IF;
    
    -- Create transfer record
    INSERT INTO learner_transfers (
        learner_id,
        from_institution_id,
        to_institution_id,
        transfer_date,
        reason,
        initiated_by,
        status
    ) VALUES (
        p_learner_id,
        p_from_institution_id,
        p_to_institution_id,
        CURDATE(),
        p_reason,
        p_initiated_by,
        'Pending'
    );
    
    -- Create notification for receiving institution admin
    INSERT INTO notifications (
        recipient_id,
        subject,
        content,
        metadata
    ) SELECT 
        user_id,
        'Learner Transfer Request',
        CONCAT('A transfer has been requested for learner ', 
              (SELECT CONCAT(first_name, ' ', last_name) FROM learners WHERE learner_id = p_learner_id),
              ' from ', (SELECT name FROM institutions WHERE institution_id = p_from_institution_id)),
        JSON_OBJECT(
            'transfer_id', LAST_INSERT_ID(),
            'learner_id', p_learner_id,
            'from_institution_id', p_from_institution_id,
            'to_institution_id', p_to_institution_id
        )
    FROM users 
    WHERE institution_id = p_to_institution_id AND role = 'institution_admin';
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_ProcessLearnerTransfer(
    IN p_transfer_id INT,
    IN p_decision ENUM('Approved', 'Rejected'),
    IN p_processed_by VARCHAR(20))
BEGIN
    DECLARE transfer_status VARCHAR(20);
    DECLARE learner_id_val VARCHAR(20);
    DECLARE from_institution_id_val VARCHAR(20);
    DECLARE to_institution_id_val VARCHAR(20);
    DECLARE processor_institution_id VARCHAR(20);
    DECLARE processor_has_permission BOOLEAN;
    
    -- Get transfer details
    SELECT 
        status, learner_id, from_institution_id, to_institution_id
    INTO 
        transfer_status, learner_id_val, from_institution_id_val, to_institution_id_val
    FROM learner_transfers 
    WHERE id = p_transfer_id;
    
    IF transfer_status IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transfer not found';
    END IF;
    
    IF transfer_status != 'Pending' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transfer has already been processed';
    END IF;
    
    -- Validate processor belongs to receiving institution
    SELECT institution_id INTO processor_institution_id 
    FROM users 
    WHERE user_id = p_processed_by;
    
    IF processor_institution_id != to_institution_id_val THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can only process transfers to your institution';
    END IF;
    
    -- Validate processor has permission
    SELECT can_manage_learners INTO processor_has_permission 
    FROM user_permissions 
    WHERE user_id = p_processed_by;
    
    IF NOT processor_has_permission THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not have permission to manage learner transfers';
    END IF;
    
    -- Update transfer status
    UPDATE learner_transfers SET
        status = p_decision,
        approved_by = CASE WHEN p_decision = 'Approved' THEN p_processed_by ELSE NULL END,
        updated_at = NOW()
    WHERE id = p_transfer_id;
    
    -- If approved, update learner's institution
    IF p_decision = 'Approved' THEN
        UPDATE learners SET
            institution_id = to_institution_id_val,
            status = 'Active',
            updated_at = NOW()
        WHERE learner_id = learner_id_val;
        
        -- Create notifications
        INSERT INTO notifications (
            recipient_id,
            subject,
            content,
            metadata
        ) VALUES 
        (
            (SELECT created_by FROM learners WHERE learner_id = learner_id_val),
            'Learner Transfer Approved',
            CONCAT('The transfer of ', (SELECT CONCAT(first_name, ' ', last_name) FROM learners WHERE learner_id = learner_id_val),
                  ' to ', (SELECT name FROM institutions WHERE institution_id = to_institution_id_val), ' has been approved'),
            JSON_OBJECT(
                'transfer_id', p_transfer_id,
                'learner_id', learner_id_val,
                'new_institution_id', to_institution_id_val
            )
        ),
        (
            (SELECT initiated_by FROM learner_transfers WHERE id = p_transfer_id),
            'Learner Transfer Approved',
            CONCAT('Your transfer request for ', (SELECT CONCAT(first_name, ' ', last_name) FROM learners WHERE learner_id = learner_id_val),
                  ' to ', (SELECT name FROM institutions WHERE institution_id = to_institution_id_val), ' has been approved'),
            JSON_OBJECT(
                'transfer_id', p_transfer_id,
                'learner_id', learner_id_val,
                'new_institution_id', to_institution_id_val
            )
        );
    ELSE
        -- Create notification for rejection
        INSERT INTO notifications (
            recipient_id,
            subject,
            content,
            metadata
        ) VALUES 
        (
            (SELECT initiated_by FROM learner_transfers WHERE id = p_transfer_id),
            'Learner Transfer Rejected',
            CONCAT('Your transfer request for ', (SELECT CONCAT(first_name, ' ', last_name) FROM learners WHERE learner_id = learner_id_val),
                  ' has been rejected'),
            JSON_OBJECT(
                'transfer_id', p_transfer_id,
                'learner_id', learner_id_val
            )
        );
    END IF;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_SearchLearnerWithCredentials(
    IN p_upi_number VARCHAR(20),
    IN p_national_id VARCHAR(20),
    IN p_birth_certificate_number VARCHAR(20),
    IN p_contact_value VARCHAR(100), -- phone or email
    IN p_otp_code VARCHAR(6),
    IN p_institution_id VARCHAR(20))
BEGIN
    DECLARE valid_otp BOOLEAN DEFAULT FALSE;
    DECLARE learner_id_val VARCHAR(20);
    DECLARE otp_attempts INT;
    DECLARE max_attempts INT DEFAULT 5;
    
    -- First try to find the learner based on provided identifiers
    SELECT l.learner_id INTO learner_id_val
    FROM learners l
    WHERE (l.upi_number = p_upi_number 
          OR l.national_id = p_national_id 
          OR l.birth_certificate_no = p_birth_certificate_number)
      AND l.institution_id = p_institution_id
      AND l.status = 'Active'
    LIMIT 1;
    
    IF learner_id_val IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Learner not found or not active';
    END IF;
    
    -- Verify OTP is valid for this learner and contact method
    SELECT 
        COUNT(*),
        SUM(CASE WHEN attempts >= max_attempts THEN 1 ELSE 0 END)
    INTO 
        valid_otp, otp_attempts
    FROM learner_otp_verification
    WHERE learner_id = learner_id_val
      AND contact_value = p_contact_value
      AND otp_code = p_otp_code
      AND expires_at > NOW()
      AND is_used = FALSE;
    
    IF valid_otp = 0 THEN
        -- Increment attempt counter if OTP exists but is invalid
        UPDATE learner_otp_verification
        SET attempts = attempts + 1
        WHERE learner_id = learner_id_val
          AND contact_value = p_contact_value
          AND otp_code = p_otp_code;
        
        IF otp_attempts > 3 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Too many failed attempts. OTP blocked.';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid OTP or expired';
        END IF;
    END IF;
    
    -- Mark OTP as used
    UPDATE learner_otp_verification
    SET is_used = TRUE,
        used_at = NOW()
    WHERE learner_id = learner_id_val
      AND contact_value = p_contact_value
      AND otp_code = p_otp_code;
    
    -- Return comprehensive learner information
    SELECT 
        l.learner_id,
        l.upi_number,
        l.national_id,
        l.birth_certificate_no,
        CONCAT(l.first_name, ' ', l.last_name) AS full_name,
        l.date_of_birth,
        l.gender,
        l.current_grade,
        i.name AS institution_name,
        i.type AS institution_type,
        lp.academic_year,
        lp.term,
        lp.subjects,
        lp.overall_remarks,
        lp.recorded_at,
        CONCAT(u.first_name, ' ', u.last_name) AS teacher_name
    FROM 
        learners l
    JOIN 
        institutions i ON l.institution_id = i.institution_id
    LEFT JOIN
        learner_progress lp ON l.learner_id = lp.learner_id
    LEFT JOIN
        users u ON lp.teacher_id = u.user_id
    WHERE 
        l.learner_id = learner_id_val
    ORDER BY 
        lp.academic_year DESC, lp.term DESC
    LIMIT 5;
    
    -- Log the search activity
    INSERT INTO learner_search_logs (
        learner_id,
        search_type,
        contact_method,
        institution_id,
        searched_at
    ) VALUES (
        learner_id_val,
        'OTP',
        (SELECT contact_type FROM learner_otp_verification 
         WHERE learner_id = learner_id_val 
           AND contact_value = p_contact_value
           AND otp_code = p_otp_code
         LIMIT 1),
        p_institution_id,
        NOW()
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_RecordFinancialTransaction(
    IN p_institution_id VARCHAR(20),
    IN p_record_type ENUM('Fee Payment', 'Government Funding', 'Donor Funding', 'Other Income', 'Expense'),
    IN p_bank_details ENUM('Tution', 'Maintanance', 'Development'),
    IN p_amount DECIMAL(12,2),
    IN p_description TEXT,
    IN p_reference_number VARCHAR(50),
    IN p_transaction_date DATE,
    IN p_recorded_by VARCHAR(20))
BEGIN
    DECLARE recorder_institution_id VARCHAR(20);
    DECLARE recorder_has_permission BOOLEAN;
    
    -- Validate institution exists
    IF NOT EXISTS (SELECT 1 FROM institutions WHERE institution_id = p_institution_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Institution does not exist';
    END IF;
    
    -- Validate recorder belongs to institution
    SELECT institution_id INTO recorder_institution_id 
    FROM users 
    WHERE user_id = p_recorded_by;
    
    IF recorder_institution_id != p_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can only record transactions for your institution';
    END IF;
    
    -- Validate recorder has permission
    SELECT can_view_finances INTO recorder_has_permission 
    FROM user_permissions 
    WHERE user_id = p_recorded_by;
    
    IF NOT recorder_has_permission THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not have permission to record financial transactions';
    END IF;
    
    -- Insert transaction
    INSERT INTO financial_records (
        institution_id,
        record_type,
        bank_details,
        amount,
        description,
        reference_number,
        transaction_date,
        recorded_by
    ) VALUES (
        p_institution_id,
        p_record_type,
        P_bank_details,
        p_amount,
        p_description,
        p_reference_number,
        COALESCE(p_transaction_date, CURDATE()),
        p_recorded_by
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_GenerateFinancialReport(
    IN p_institution_id VARCHAR(20),
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_record_types JSON)
BEGIN
    -- Validate institution exists
    IF NOT EXISTS (SELECT 1 FROM institutions WHERE institution_id = p_institution_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Institution does not exist';
    END IF;
    
    -- Return summary report
    SELECT 
        record_type,
        COUNT(*) AS transaction_count,
        SUM(amount) AS total_amount,
        MIN(transaction_date) AS first_transaction,
        MAX(transaction_date) AS last_transaction
    FROM financial_records
    WHERE institution_id = p_institution_id
      AND (p_start_date IS NULL OR transaction_date >= p_start_date)
      AND (p_end_date IS NULL OR transaction_date <= p_end_date)
      AND (p_record_types IS NULL OR JSON_CONTAINS(p_record_types, JSON_QUOTE(record_type), '$'))
    GROUP BY record_type
    ORDER BY record_type;
    
    -- Return detailed transactions
    SELECT 
        id,
        record_type,
        bank_details,
        amount,
        description,
        reference_number,
        transaction_date,
        recorded_by,
        created_at
    FROM financial_records
    WHERE institution_id = p_institution_id
      AND (p_start_date IS NULL OR transaction_date >= p_start_date)
      AND (p_end_date IS NULL OR transaction_date <= p_end_date)
      AND (p_record_types IS NULL OR JSON_CONTAINS(p_record_types, JSON_QUOTE(record_type), '$'))
    ORDER BY transaction_date DESC, record_type;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_CreateProcurementOrder(
    IN p_institution_id VARCHAR(20),
    IN p_item_name VARCHAR(100),
    IN p_category ENUM('Learning Materials', 'Sanitary', 'Equipment', 'Other'),
    IN p_quantity INT,
    IN p_unit_price DECIMAL(10,2),
    IN p_supplier VARCHAR(100),
    IN p_ordered_by VARCHAR(20))
BEGIN
    DECLARE total_price DECIMAL(10,2);
    DECLARE orderer_institution_id VARCHAR(20);
    DECLARE orderer_has_permission BOOLEAN;
    
    -- Validate institution exists
    IF NOT EXISTS (SELECT 1 FROM institutions WHERE institution_id = p_institution_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Institution does not exist';
    END IF;
    
    -- Validate orderer belongs to institution
    SELECT institution_id INTO orderer_institution_id 
    FROM users 
    WHERE user_id = p_ordered_by;
    
    IF orderer_institution_id != p_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can only create orders for your institution';
    END IF;
    
    -- Validate orderer has permission
    SELECT can_manage_procurement INTO orderer_has_permission 
    FROM user_permissions 
    WHERE user_id = p_ordered_by;
    
    IF NOT orderer_has_permission THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not have permission to manage procurement';
    END IF;
    
    -- Calculate total price
    SET total_price = p_quantity * p_unit_price;
    
    -- Insert order
    INSERT INTO procurement (
        institution_id,
        item_name,
        category,
        quantity,
        unit_price,
        total_price,
        supplier,
        order_date,
        status,
        ordered_by
    ) VALUES (
        p_institution_id,
        p_item_name,
        p_category,
        p_quantity,
        p_unit_price,
        total_price,
        p_supplier,
        CURDATE(),
        'Ordered',
        p_ordered_by
    );
    
    -- Create notification for institution admin
    INSERT INTO notifications (
        recipient_id,
        subject,
        content,
        metadata
    ) SELECT 
        user_id,
        'New Procurement Order',
        CONCAT('A new order for ', p_item_name, ' has been placed by ', 
              (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE user_id = p_ordered_by)),
        JSON_OBJECT(
            'order_id', LAST_INSERT_ID(),
            'item_name', p_item_name,
            'total_price', total_price
        )
    FROM users 
    WHERE institution_id = p_institution_id AND role = 'institution_admin';
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_UpdateProcurementStatus(
    IN p_order_id INT,
    IN p_status ENUM('Requested', 'Ordered', 'Delivered', 'Cancelled'),
    IN p_delivery_date DATE,
    IN p_updated_by VARCHAR(20))
BEGIN
    DECLARE order_institution_id VARCHAR(20);
    DECLARE updater_institution_id VARCHAR(20);
    DECLARE updater_has_permission BOOLEAN;
    DECLARE current_status VARCHAR(20);
    
    -- Get order details
    SELECT institution_id, status INTO order_institution_id, current_status
    FROM procurement 
    WHERE id = p_order_id;
    
    IF order_institution_id IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Order not found';
    END IF;
    
    -- Validate updater belongs to institution
    SELECT institution_id INTO updater_institution_id 
    FROM users 
    WHERE user_id = p_updated_by;
    
    IF updater_institution_id != order_institution_id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You can only update orders for your institution';
    END IF;
    
    -- Validate updater has permission
    SELECT can_manage_procurement INTO updater_has_permission 
    FROM user_permissions 
    WHERE user_id = p_updated_by;
    
    IF NOT updater_has_permission THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not have permission to manage procurement';
    END IF;
    
    -- Validate status transition
    IF current_status = 'Cancelled' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot update a cancelled order';
    END IF;
    
    IF current_status = 'Delivered' AND p_status != 'Delivered' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot change status from Delivered';
    END IF;
    
    -- Update order
    IF p_status = 'Delivered' THEN
        UPDATE procurement SET
            status = p_status,
            delivery_date = COALESCE(p_delivery_date, CURDATE()),
            received_by = p_updated_by,
            updated_at = NOW()
        WHERE id = p_order_id;
    ELSE
        UPDATE procurement SET
            status = p_status,
            updated_at = NOW()
        WHERE id = p_order_id;
    END IF;
    
    -- Create notification if delivered
    IF p_status = 'Delivered' THEN
        INSERT INTO notifications (
            recipient_id,
            subject,
            content,
            metadata
        ) SELECT 
            user_id,
            'Procurement Order Delivered',
            CONCAT('Order #', p_order_id, ' for ', item_name, ' has been delivered'),
            JSON_OBJECT(
                'order_id', p_order_id,
                'item_name', item_name
            )
        FROM procurement 
        WHERE id = p_order_id
        AND EXISTS (
            SELECT 1 FROM users 
            WHERE institution_id = order_institution_id 
            AND (role = 'institution_admin' OR can_manage_procurement = 1)
        );
    END IF;
END //

DELIMITER ;


// ======================================================================================================================================================
// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');

const app = express();

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// CORS configuration - moved before other middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Your React app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Middleware - ordered properly
app.use(cors(corsOptions)); // Only use this once
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Education Management System API' });
});

// Import routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// middleware/roleMiddleware.js
const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};

module.exports = checkRole;


// controllers/learnerController.js
const { validationResult } = require('express-validator');
const db = require('../models');
const { Op } = require('sequelize');

/**
 * Register a new learner (supports foreign origin)
 * POST /api/learners/register
 */
exports.registerLearner = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    institutionId,
    surName,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    enrollmentDate,
    currentGrade,
    isForeign,
    foreignDetails,
    parentDetails
  } = req.body;

  try {
    // Start transaction
    const result = await db.sequelize.transaction(async (t) => {
      // Generate unique learner ID
      const learnerId = `LRN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Handle foreign learner specifics
      let nationalId = null;
      let birthCertificateNo = null;
      let upiNumber = null;
      
      if (!isForeign) {
        // Kenyan learner - require national ID or birth certificate
        if (!parentDetails.nationalId && !parentDetails.birthCertificateNo) {
          throw new Error('Kenyan learners require either parent national ID or birth certificate number');
        }
        nationalId = parentDetails.nationalId;
        birthCertificateNo = parentDetails.birthCertificateNo;
        
        // Generate UPI number for Kenyan learners
        upiNumber = `UPI-${Date.now().toString().slice(-6)}`;
      } else {
        // Foreign learner - use passport details
        if (!foreignDetails.passportNumber) {
          throw new Error('Foreign learners require passport number');
        }
        nationalId = `FOREIGN-${foreignDetails.passportNumber}`;
        birthCertificateNo = foreignDetails.birthCertificateNo || null;
      }

      // Create learner record
      const learner = await db.Learner.create({
        learner_id: learnerId,
        institution_id: institutionId,
        national_id: nationalId,
        birth_certificate_no: birthCertificateNo,
        upi_number: upiNumber,
        sur_name: surName,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        gender: gender,
        enrollment_date: enrollmentDate || new Date(),
        current_grade: currentGrade,
        parent_guardian_phone: parentDetails.phone,
        parent_guardian_email: parentDetails.email,
        is_foreign: isForeign,
        foreign_passport_no: isForeign ? foreignDetails.passportNumber : null,
        foreign_country: isForeign ? foreignDetails.country : null,
        status: 'Active'
      }, { transaction: t });

      // Create parent/guardian record
      const parent = await db.ParentGuardian.create({
        learner_id: learnerId,
        national_id: parentDetails.nationalId,
        sur_name: parentDetails.surName,
        first_name: parentDetails.firstName,
        last_name: parentDetails.lastName,
        relationship: parentDetails.relationship,
        phone_number: parentDetails.phone,
        email: parentDetails.email,
        address: parentDetails.address,
        is_foreign: isForeign,
        iprs_validated: !isForeign && parentDetails.nationalId ? true : false,
        validation_timestamp: !isForeign && parentDetails.nationalId ? new Date() : null
      }, { transaction: t });

      // For foreign learners, store additional details
      if (isForeign) {
        await db.ForeignLearnerDetails.create({
          learner_id: learnerId,
          passport_number: foreignDetails.passportNumber,
          country_of_origin: foreignDetails.country,
          visa_type: foreignDetails.visaType,
          visa_expiry: foreignDetails.visaExpiry,
          entry_date: foreignDetails.entryDate
        }, { transaction: t });
      }

      // Generate and send OTP to parent/guardian
      const otpResponse = await generateAndSendOTP(
        learnerId,
        parentDetails.phone,
        parentDetails.email
      );

      return {
        learner,
        parent,
        otpInfo: otpResponse
      };
    });

    return res.status(201).json({
      success: true,
      message: 'Learner registered successfully',
      data: {
        learnerId: result.learner.learner_id,
        parentDetails: result.parent,
        otpInfo: result.otpInfo
      }
    });
  } catch (error) {
    console.error('Learner registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error registering learner',
      error: error.message
    });
  }
};

// Helper function to generate and send OTP
async function generateAndSendOTP(learnerId, phone, email) {
  // Implementation would call your OTP service
  return {
    sentTo: phone || email,
    method: phone ? 'SMS' : 'EMAIL',
    expiresIn: '24 hours'
  };
}
// controllers/parentController.js
const axios = require('axios');
const { validationResult } = require('express-validator');

// IPRS API configuration
const IPRS_API_CONFIG = {
  baseURL: process.env.IPRS_API_BASE_URL || 'https://iprs-api.example.com',
  apiKey: process.env.IPRS_API_KEY,
  timeout: 5000
};

const iprsClient = axios.create(IPRS_API_CONFIG);

/**
 * Validate parent/guardian details against IPRS
 * POST /api/parents/validate
 */
exports.validateParent = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nationalId, surName, firstName, lastName, dateOfBirth } = req.body;

  try {
    // Call IPRS API to validate parent/guardian details
    const response = await iprsClient.post('/verify', {
      nationalId,
      surName,
      firstName,
      lastName,
      dateOfBirth
    });

    if (response.data.status === 'VALID') {
      return res.json({
        success: true,
        message: 'Parent/guardian details validated successfully',
        data: {
          fullName: response.data.fullName,
          dateOfBirth: response.data.dateOfBirth,
          nationality: response.data.nationality,
          isCitizen: response.data.isCitizen,
          isForeigner: response.data.isForeigner,
          validationTimestamp: new Date().toISOString()
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Parent/guardian details not found in IPRS',
        details: response.data.reason
      });
    }
  } catch (error) {
    console.error('IPRS validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error validating parent/guardian details',
      error: error.response?.data || error.message
    });
  }
};


// routes/api.js
const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const learnerController = require('../controllers/learnerController');
const authenticate = require('../middleware/authenticate');
const checkRole = require('../middleware/roleMiddleware');
const {
  validateParent,
  validateForeignLearner,
  validateLearner
} = require('../validators/learnerValidator');

// Parent validation endpoint
router.post('/parents/validate', validateParent, parentController.validateParent);


// Learner registration endpoint
router.post(
  '/learners/register',
  authenticate,
  checkRole(['institution_admin', 'institution_staff']),
  [...validateLearner, ...validateParent, ...validateForeignLearner],
  learnerController.registerLearner
);

module.exports = router;


// controllers/institutionController.js
const applyForRegistration = async (req, res) => {
  try {
    const { institutionName, institutionType, institutionCategory, documents } = req.body;
    const userId = req.user.user_id;
    
    // Generate unique institution ID
    const institutionId = `INST-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const application = await InstitutionApplication.create({
      application_id: `APP-${Date.now()}`,
      institution_name: institutionName,
      institution_type: institutionType,
      institution_category: institutionCategory,
      applicant_user_id: userId,
      documents,
      status: 'Submitted'
    });
    
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reviewApplication = async (req, res) => {
  try {
    const { applicationId, decision, notes } = req.body;
    const reviewerId = req.user.user_id;
    
    const application = await InstitutionApplication.findByPk(applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    if (decision === 'Approved') {
      // Create the institution
      const institution = await Institution.create({
        institution_id: `INST-${Date.now()}`,
        name: application.institution_name,
        type: application.institution_type,
        category: application.institution_category,
        status: 'Approved',
        // other fields...
      });
      
      // Update the applicant's role
      await User.update(
        { role: 'institution_admin', institution_id: institution.institution_id },
        { where: { user_id: application.applicant_user_id } }
      );
    }
    
    application.status = decision;
    application.review_notes = notes;
    application.reviewed_by = reviewerId;
    application.reviewed_at = new Date();
    await application.save();
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/progressController.js
const recordProgress = async (req, res) => {
  try {
    const { learnerId, academicYear, term, grade, subjects, remarks } = req.body;
    const teacherId = req.user.user_id;
    
    // Verify teacher has permission for this learner
    const learner = await Learner.findByPk(learnerId);
    if (!learner || learner.institution_id !== req.user.institution_id) {
      return res.status(403).json({ message: 'Not authorized to update this learner' });
    }
    
    const progress = await LearnerProgress.create({
      learner_id: learnerId,
      academic_year: academicYear,
      term: term,
      grade: grade,
      subjects: subjects,
      overall_remarks: remarks,
      teacher_id: teacherId
    });
    
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// validators/learnerValidator.js
const { body } = require('express-validator');

exports.validateParent = [
  body('nationalId')
    .if(body('isForeign').equals('false'))
    .notEmpty().withMessage('National ID is required for Kenyan parents')
    .isLength({ min: 8, max: 12 }).withMessage('National ID must be 8-12 characters'),
  
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth').isDate().withMessage('Valid date of birth is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('relationship').notEmpty().withMessage('Relationship to learner is required')
];

exports.validateForeignLearner = [
  body('passportNumber')
    .if(body('isForeign').equals('true'))
    .notEmpty().withMessage('Passport number is required for foreign learners'),
  
  body('country').if(body('isForeign').equals('true'))
    .notEmpty().withMessage('Country of origin is required'),
  
  body('visaType').optional(),
  body('visaExpiry').optional().isDate(),
  body('entryDate').optional().isDate()
];

exports.validateLearner = [
  body('institutionId').notEmpty().withMessage('Institution ID is required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth').isDate().withMessage('Valid date of birth is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required'),
  body('currentGrade').notEmpty().withMessage('Current grade is required'),
  body('isForeign').isBoolean().withMessage('isForeign must be boolean')
];



// controllers/financialController.js
const getFinancialReports = async (req, res) => {
  try {
    let queryOptions = {};
    const userRole = req.user.role;
    const institutionId = req.user.institution_id;
    
    // Apply filters based on role
    if (userRole === 'institution_admin' || userRole === 'institution_staff') {
      queryOptions.where = { institution_id: institutionId };
    } else if (userRole === 'county_admin') {
      // Get all institutions in the county
      const institutions = await Institution.findAll({ 
        where: { county_id: req.user.county_id },
        attributes: ['institution_id']
      });
      queryOptions.where = { 
        institution_id: institutions.map(i => i.institution_id)
      };
    }
    
    // Date filters if provided
    if (req.query.startDate && req.query.endDate) {
      queryOptions.where = {
        ...queryOptions.where,
        transaction_date: {
          [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)]
        }
      };
    }
    
    const records = await FinancialRecord.findAll(queryOptions);
    
    // Generate summary report
    const summary = records.reduce((acc, record) => {
      if (!acc[record.record_type]) {
        acc[record.record_type] = 0;
      }
      acc[record.record_type] += record.amount;
      return acc;
    }, {});
    
    res.json({
      records,
      summary,
      totalRecords: records.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/publicController.js
const searchLearner = async (req, res) => {
  try {
    const { upiNumber, birthCertificateNumber, institutionId, secretCode } = req.body;
    
    // Verify the secret code is valid for this learner/institution
    const validAccess = await verifySearchAccess(
      upiNumber, 
      birthCertificateNumber, 
      institutionId, 
      secretCode
    );
    
    if (!validAccess) {
      return res.status(403).json({ message: 'Invalid search credentials' });
    }
    
    const learner = await Learner.findOne({
      where: { 
        [Op.or]: [
          { upi_number: upiNumber },
          { national_id: birthCertificateNumber }
        ],
        institution_id: institutionId
      },
      include: [
        {
          model: Institution,
          attributes: ['name', 'type']
        },
        {
          model: LearnerProgress,
          order: [['academic_year', 'DESC'], ['term', 'DESC']],
          limit: 5
        }
      ]
    });
    
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }
    
    res.json(learner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
