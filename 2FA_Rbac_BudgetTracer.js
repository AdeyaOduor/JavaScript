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

// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if 2FA is required and verified
        const [userData] = await db.query(
            'SELECT two_factor_enabled, last_2fa_verification FROM users WHERE id = ?',
            [user.userId]
        );
        
        if (userData.two_factor_enabled) {
            // Check if 2FA was recently verified (within 24 hours)
            const lastVerified = new Date(userData.last_2fa_verification);
            const hoursSinceVerification = (new Date() - lastVerified) / (1000 * 60 * 60);
            
            if (hoursSinceVerification > 24) {
                return res.status(403).json({ 
                    error: 'Two-factor authentication required',
                    requires2FA: true
                });
            }
        }
        
        req.user = user;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
}

function authorizeRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.role !== requiredRole && req.user.role !== 'Super Admin') {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };

// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Enable 2FA
router.post('/2fa/enable', authenticateToken, async (req, res) => {
    try {
        const result = await authService.enable2FA(req.user.userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Disable 2FA
router.post('/2fa/disable', authenticateToken, async (req, res) => {
    try {
        await authService.disable2FA(req.user.userId);
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verify 2FA code
router.post('/2fa/verify', async (req, res) => {
    try {
        const { userId, code } = req.body;
        const verified = await authService.verify2FACode(userId, code);
        
        if (verified) {
            // Generate new JWT with 2FA verified flag
            const token = jwt.sign(
                { 
                    userId, 
                    role: req.user.role,
                    jurisdictionId: req.user.jurisdictionId,
                    twoFactorVerified: true 
                }, 
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );
            
            res.json({ token });
        } else {
            res.status(400).json({ error: 'Invalid verification code' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Request SMS 2FA code
router.post('/2fa/send-sms', authenticateToken, async (req, res) => {
    try {
        const result = await authService.send2FACode(req.user.userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verify SMS 2FA code
router.post('/2fa/verify-sms', async (req, res) => {
    try {
        const { userId, code } = req.body;
        const verified = await authService.verifySMS2FA(userId, code);
        
        if (verified) {
            // Generate new JWT with 2FA verified flag
            const token = jwt.sign(
                { 
                    userId, 
                    role: req.user.role,
                    jurisdictionId: req.user.jurisdictionId,
                    twoFactorVerified: true 
                }, 
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );
            
            res.json({ token });
        } else {
            res.status(400).json({ error: 'Invalid verification code' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Generate recovery token
router.post('/2fa/recovery/generate', authenticateToken, async (req, res) => {
    try {
        const token = await authService.generateRecoveryToken(req.user.userId);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verify recovery token
router.post('/2fa/recovery/verify', async (req, res) => {
    try {
        const { userId, token } = req.body;
        const verified = await authService.verifyRecoveryToken(userId, token);
        
        if (verified) {
            // Generate new JWT with 2FA verified flag
            const token = jwt.sign(
                { 
                    userId, 
                    role: req.user.role,
                    jurisdictionId: req.user.jurisdictionId,
                    twoFactorVerified: true 
                }, 
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );
            
            res.json({ token });
        } else {
            res.status(400).json({ error: 'Invalid recovery token' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

// ======================================== FRONT END =================================================================================

// components/auth/TwoFactorSetup.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import axios from 'axios';

const TwoFactorSetup = ({ show, onClose, onComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [setupData, setSetupData] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);

    useEffect(() => {
        if (show && !setupData) {
            enable2FA();
        }
    }, [show]);

    const enable2FA = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/auth/2fa/enable');
            setSetupData(response.data);
            setBackupCodes(response.data.backupCodes);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to enable 2FA');
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async () => {
        if (!verificationCode) {
            setError('Please enter a verification code');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await axios.post('/api/auth/2fa/verify', {
                code: verificationCode
            });
            setSuccess('Two-factor authentication successfully enabled!');
            onComplete();
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Set Up Two-Factor Authentication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                {setupData && !success && (
                    <>
                        <Row className="mb-4">
                            <Col md={6}>
                                <h5>Step 1: Scan QR Code</h5>
                                <p>
                                    Scan this QR code with your authenticator app (Google Authenticator, 
                                    Authy, Microsoft Authenticator, etc.)
                                </p>
                                <div className="text-center">
                                    <QRCode value={`otpauth://totp/Budget%20Tracker:${encodeURIComponent(user.email)}?secret=${setupData.secret}&issuer=Kenya%20Government`} />
                                </div>
                                <p className="mt-2 text-muted small">
                                    Or enter this secret key manually: <code>{setupData.secret}</code>
                                </p>
                            </Col>
                            <Col md={6}>
                                <h5>Step 2: Verify Code</h5>
                                <p>
                                    Enter the 6-digit code from your authenticator app to verify setup.
                                </p>
                                <Form.Group>
                                    <Form.Label>Verification Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="123456"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                    />
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    onClick={verifyCode}
                                    disabled={loading}
                                    className="mt-3"
                                >
                                    {loading ? 'Verifying...' : 'Verify & Enable'}
                                </Button>
                            </Col>
                        </Row>
                        
                        <hr />
                        
                        <h5>Backup Codes</h5>
                        <p className="text-danger">
                            Save these backup codes in a secure place. You'll need them if you lose 
                            access to your authenticator app.
                        </p>
                        <div className="bg-light p-3 mb-3">
                            <Row>
                                {backupCodes.map((code, index) => (
                                    <Col key={index} sm={6} className="mb-2">
                                        <code>{code.code}</code>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <p className="text-muted small">
                            Each code can be used only once. You can generate new codes if needed.
                        </p>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TwoFactorSetup;


// components/auth/TwoFactorVerify.js
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const TwoFactorVerify = ({ show, userId, onSuccess, onRecovery }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [useRecovery, setUseRecovery] = useState(false);
    const [recoveryToken, setRecoveryToken] = useState('');

    const verifyCode = async () => {
        if (!code) {
            setError('Please enter a verification code');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/auth/2fa/verify', {
                userId,
                code
            });
            onSuccess(response.data.token);
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    const verifyRecoveryToken = async () => {
        if (!recoveryToken) {
            setError('Please enter a recovery token');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/auth/2fa/recovery/verify', {
                userId,
                token: recoveryToken
            });
            onSuccess(response.data.token);
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid recovery token');
        } finally {
            setLoading(false);
        }
    };

    const requestSMS = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post('/api/auth/2fa/send-sms', { userId });
            setError('SMS with verification code sent to your registered phone number');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send SMS');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Two-Factor Authentication Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                {!useRecovery ? (
                    <>
                        <p>
                            Enter the 6-digit code from your authenticator app or SMS to continue.
                        </p>
                        <Form.Group>
                            <Form.Label>Verification Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="123456"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button 
                                variant="primary" 
                                onClick={verifyCode}
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify'}
                            </Button>
                            <Button 
                                variant="link" 
                                onClick={() => setUseRecovery(true)}
                                disabled={loading}
                            >
                                Use Recovery Token
                            </Button>
                        </div>
                        <div className="text-center mt-3">
                            <Button 
                                variant="outline-secondary" 
                                onClick={requestSMS}
                                size="sm"
                            >
                                Send SMS Code
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>
                            Enter one of your recovery tokens to access your account.
                        </p>
                        <Form.Group>
                            <Form.Label>Recovery Token</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter recovery token"
                                value={recoveryToken}
                                onChange={(e) => setRecoveryToken(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between mt-3">
                            <Button 
                                variant="primary" 
                                onClick={verifyRecoveryToken}
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify Token'}
                            </Button>
                            <Button 
                                variant="link" 
                                onClick={() => setUseRecovery(false)}
                                disabled={loading}
                            >
                                Back to Code Verification
                            </Button>
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TwoFactorVerify;
