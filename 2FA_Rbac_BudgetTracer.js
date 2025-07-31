/*
Two-Factor Authentication (2FA) in RBAC for Budget Tracker*/

-- Add 2FA columns to users table
ALTER TABLE users
ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN two_factor_secret VARCHAR(32),
ADD COLUMN backup_codes TEXT,
ADD COLUMN phone_number VARCHAR(20),
ADD COLUMN last_2fa_verification TIMESTAMP NULL;

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
