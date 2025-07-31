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


// services/authService.js
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { sendSMS } = require('./smsService');

class AuthService {
    // Enable 2FA for a user
    async enable2FA(userId) {
        const secret = speakeasy.generateSecret({ length: 20 });
        
        await db.query(`
            UPDATE users 
            SET two_factor_enabled = TRUE, 
                two_factor_secret = ?,
                backup_codes = ?
            WHERE id = ?`,
            [
                secret.base32,
                JSON.stringify(this.generateBackupCodes()),
                userId
            ]
        );
        
        // Generate QR code URL for authenticator apps
        const otpauthUrl = speakeasy.otpauthURL({
            secret: secret.base32,
            label: 'Budget Tracker',
            issuer: 'Kenya Government'
        });
        
        const qrCode = await QRCode.toDataURL(otpauthUrl);
        
        return {
            secret: secret.base32,
            qrCode,
            backupCodes: JSON.parse(backupCodes)
        };
    }
    
    // Disable 2FA for a user
    async disable2FA(userId) {
        await db.query(`
            UPDATE users 
            SET two_factor_enabled = FALSE, 
                two_factor_secret = NULL,
                backup_codes = NULL
            WHERE id = ?`,
            [userId]
        );
    }
    
    // Generate backup codes
    generateBackupCodes() {
        const codes = [];
        for (let i = 0; i < 10; i++) {
            codes.push({
                code: Math.random().toString(36).substring(2, 10).toUpperCase(),
                used: false
            });
        }
        return codes;
    }
    
    // Verify 2FA code
    async verify2FACode(userId, code) {
        const [user] = await db.query('SELECT two_factor_secret FROM users WHERE id = ?', [userId]);
        
        if (!user || !user.two_factor_secret) {
            throw new Error('2FA not configured');
        }
        
        // First check backup codes
        const [backupCodes] = await db.query('SELECT backup_codes FROM users WHERE id = ?', [userId]);
        const parsedCodes = JSON.parse(backupCodes.backup_codes || '[]');
        
        const backupCodeMatch = parsedCodes.find(c => !c.used && c.code === code);
        if (backupCodeMatch) {
            // Mark backup code as used
            const updatedCodes = parsedCodes.map(c => 
                c.code === code ? { ...c, used: true } : c
            );
            
            await db.query('UPDATE users SET backup_codes = ? WHERE id = ?', [
                JSON.stringify(updatedCodes),
                userId
            ]);
            
            return true;
        }
        
        // Verify TOTP code
        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: 'base32',
            token: code,
            window: 1
        });
        
        if (verified) {
            await db.query('UPDATE users SET last_2fa_verification = NOW() WHERE id = ?', [userId]);
        }
        
        return verified;
    }
    
    // Send SMS with 2FA code
    async send2FACode(userId) {
        const [user] = await db.query('SELECT phone_number FROM users WHERE id = ?', [userId]);
        
        if (!user || !user.phone_number) {
            throw new Error('Phone number not registered');
        }
        
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        
        await db.query(
            'INSERT INTO two_factor_attempts (user_id, code, expires_at) VALUES (?, ?, ?)',
            [userId, code, expiresAt]
        );
        
        // Send SMS (implementation depends on your SMS provider)
        await sendSMS(user.phone_number, `Your Budget Tracker verification code is: ${code}`);
        
        return { success: true };
    }
    
    // Verify SMS code
    async verifySMS2FA(userId, code) {
        const [attempt] = await db.query(`
            SELECT * FROM two_factor_attempts 
            WHERE user_id = ? AND code = ? AND used = FALSE AND expires_at > NOW()
            ORDER BY created_at DESC LIMIT 1`,
            [userId, code]
        );
        
        if (!attempt) {
            throw new Error('Invalid or expired verification code');
        }
        
        // Mark code as used
        await db.query('UPDATE two_factor_attempts SET used = TRUE WHERE id = ?', [attempt.id]);
        await db.query('UPDATE users SET last_2fa_verification = NOW() WHERE id = ?', [userId]);
        
        return true;
    }
    
    // Generate recovery token
    async generateRecoveryToken(userId) {
        const token = require('crypto').randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        
        await db.query(
            'INSERT INTO recovery_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
            [userId, token, expiresAt]
        );
        
        return token;
    }
    
    // Verify recovery token
    async verifyRecoveryToken(userId, token) {
        const [recoveryToken] = await db.query(`
            SELECT * FROM recovery_tokens 
            WHERE user_id = ? AND token = ? AND used = FALSE AND expires_at > NOW()
            LIMIT 1`,
            [userId, token]
        );
        
        if (!recoveryToken) {
            throw new Error('Invalid or expired recovery token');
        }
        
        // Mark token as used
        await db.query('UPDATE recovery_tokens SET used = TRUE WHERE id = ?', [recoveryToken.id]);
        
        return true;
    }
}

module.exports = new AuthService();
