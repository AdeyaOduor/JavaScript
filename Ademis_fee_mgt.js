-- Fee Structures
CREATE TABLE fee_structures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution_id VARCHAR(20) NOT NULL,
    grade_level VARCHAR(20) NOT NULL,
    term VARCHAR(20) NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'KES',
    due_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
    UNIQUE KEY (institution_id, grade_level, term, academic_year)
);

-- Fee Payments
CREATE TABLE fee_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_reference VARCHAR(50) UNIQUE NOT NULL,
    learner_id VARCHAR(20) NOT NULL,
    mpesa_transaction_id VARCHAR(50),
    mpesa_confirmation_code VARCHAR(50),
    amount DECIMAL(12,2) NOT NULL,
    payment_method ENUM('MPESA', 'BANK', 'CASH', 'OTHER') DEFAULT 'MPESA',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    term VARCHAR(20) NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    recorded_by VARCHAR(20) NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REVERSED') DEFAULT 'PENDING',
    FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
    FOREIGN KEY (recorded_by) REFERENCES users(user_id)
);

-- Fee Balances
CREATE TABLE fee_balances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    learner_id VARCHAR(20) NOT NULL,
    term VARCHAR(20) NOT NULL,
    academic_year VARCHAR(9) NOT NULL,
    total_fee DECIMAL(12,2) NOT NULL,
    amount_paid DECIMAL(12,2) DEFAULT 0.00,
    balance DECIMAL(12,2) GENERATED ALWAYS AS (total_fee - amount_paid) STORED,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
    UNIQUE KEY (learner_id, term, academic_year)
);

-- Payment Notifications
CREATE TABLE payment_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id INT NOT NULL,
    notification_type ENUM('SMS', 'EMAIL', 'PUSH') NOT NULL,
    recipient VARCHAR(100) NOT NULL,
    status ENUM('PENDING', 'SENT', 'FAILED') DEFAULT 'PENDING',
    sent_at TIMESTAMP NULL,
    error_message TEXT,
    FOREIGN KEY (payment_id) REFERENCES fee_payments(id)
);
