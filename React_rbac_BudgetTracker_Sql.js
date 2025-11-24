/*include components from React_BudgetTracker_Sql.js to implement this RBAC modules*/

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

// ==================== Back End =========================================================================================================

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

// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TwoFactorVerify from '../components/auth/TwoFactorVerify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requires2FA, setRequires2FA] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get('/api/auth/check');
                
                if (response.data.requires2FA) {
                    setRequires2FA(true);
                    setUser(response.data.user);
                    setPermissions(response.data.permissions);
                } else {
                    setUser(response.data.user);
                    setPermissions(response.data.permissions);
                }
            } catch (error) {
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('/api/auth/login', credentials);
            
            if (response.data.requires2FA) {
                setRequires2FA(true);
                setUser(response.data.user);
                return { requires2FA: true };
            }

            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            
            setUser(response.data.user);
            setPermissions(response.data.permissions);
            
            return { success: true };
        } catch (error) {
            throw error;
        }
    };

    const verify2FA = async (code) => {
        try {
            const response = await axios.post('/api/auth/2fa/verify', {
                userId: user.id,
                code
            });
            
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            
            setRequires2FA(false);
            return true;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
        } finally {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            setPermissions([]);
            navigate('/login');
        }
    };

    const hasPermission = (requiredRole, jurisdictionId = null) => {
        if (!user) return false;
        
        // Super admin has all permissions
        if (permissions.some(p => p.role === 'Super Admin')) return true;
        
        return permissions.some(p => 
            p.role === requiredRole && 
            (jurisdictionId === null || p.jurisdiction_id === jurisdictionId)
        );
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            permissions, 
            loading, 
            login, 
            logout, 
            verify2FA,
            requires2FA,
            hasPermission
        }}>
            {children}
            {requires2FA && (
                <TwoFactorVerify 
                    show={requires2FA}
                    userId={user?.id}
                    onSuccess={(token) => {
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        setRequires2FA(false);
                    }}
                    onRecovery={() => {
                        // Handle recovery flow
                    }}
                />
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



// BackEnd API endpoints for authentication and authorization
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Get user from database
        const [user] = await db.query(`
            SELECT u.*, 
                   ur.role_id, 
                   r.name as role_name,
                   j.id as jurisdiction_id,
                   j.name as jurisdiction_name,
                   j.level as jurisdiction_level
            FROM users u
            JOIN user_roles ur ON u.id = ur.user_id
            JOIN roles r ON ur.role_id = r.id
            JOIN jurisdictions j ON ur.jurisdiction_id = j.id
            WHERE u.username = ? AND u.is_active = TRUE
        `, [username]);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Get all permissions for the user
        const [permissions] = await db.query(`
            SELECT r.name as role, 
                   j.id as jurisdiction_id, 
                   j.name as jurisdiction_name,
                   j.level as jurisdiction_level,
                   d.id as department_id,
                   d.name as department_name
            FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            JOIN jurisdictions j ON ur.jurisdiction_id = j.id
            LEFT JOIN departments d ON ur.department_id = d.id
            WHERE ur.user_id = ?
        `, [user.id]);
        
        // Create JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                role: user.role_name,
                jurisdictionId: user.jurisdiction_id,
                jurisdictionLevel: user.jurisdiction_level
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                role: user.role_name,
                jurisdiction_id: user.jurisdiction_id,
                jurisdiction_name: user.jurisdiction_name,
                jurisdiction_level: user.jurisdiction_level
            },
            permissions
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Check auth status
router.get('/check', authenticateToken, async (req, res) => {
    try {
        // Get user details
        const [user] = await db.query(`
            SELECT u.*, 
                   r.name as role_name,
                   j.id as jurisdiction_id,
                   j.name as jurisdiction_name,
                   j.level as jurisdiction_level
            FROM users u
            JOIN user_roles ur ON u.id = ur.user_id
            JOIN roles r ON ur.role_id = r.id
            JOIN jurisdictions j ON ur.jurisdiction_id = j.id
            WHERE u.id = ?
            ORDER BY r.hierarchy_level DESC
            LIMIT 1
        `, [req.user.userId]);
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        // Get all permissions
        const [permissions] = await db.query(`
            SELECT r.name as role, 
                   j.id as jurisdiction_id, 
                   j.name as jurisdiction_name,
                   j.level as jurisdiction_level,
                   d.id as department_id,
                   d.name as department_name
            FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            JOIN jurisdictions j ON ur.jurisdiction_id = j.id
            LEFT JOIN departments d ON ur.department_id = d.id
            WHERE ur.user_id = ?
        `, [req.user.userId]);
        
        res.json({ user, permissions });
        
    } catch (error) {
        console.error('Auth check error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Authorization middleware for jurisdiction access
function authorizeAccess(requiredRole, jurisdictionLevel = null) {
    return (req, res, next) => {
        // Super admin bypasses all checks
        if (req.user.role === 'Super Admin') return next();
        
        // Check if user has the required role
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        
        // If jurisdiction level is specified, check it matches
        if (jurisdictionLevel && req.user.jurisdictionLevel !== jurisdictionLevel) {
            return res.status(403).json({ error: 'Access restricted to specific jurisdiction level' });
        }
        
        next();
    };
}

// Get national budget data
router.get('/budget/national', authenticateToken, authorizeAccess('National Admin', 'national'), async (req, res) => {
    try {
        // Only Super Admin or National Admin can access this
        if (req.user.role !== 'Super Admin' && req.user.role !== 'National Admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const [results] = await db.query(`
            SELECT 
                SUM(allocated_amount) as totalAllocated,
                SUM(spent_amount) as totalSpent
            FROM budgets
            WHERE jurisdiction_id IN (
                SELECT id FROM jurisdictions WHERE level = 'national'
            )
        `);
        
        const [counties] = await db.query(`
            SELECT 
                j.id,
                j.name,
                SUM(b.allocated_amount) as allocated,
                SUM(b.spent_amount) as spent,
                ROUND((SUM(b.spent_amount) / SUM(b.allocated_amount)) * 100, 2) as utilization
            FROM jurisdictions j
            LEFT JOIN budgets b ON j.id = b.jurisdiction_id
            WHERE j.level = 'county'
            GROUP BY j.id, j.name
        `);
        
        res.json({
            totalAllocated: results[0].totalAllocated || 0,
            totalSpent: results[0].totalSpent || 0,
            counties
        });
        
    } catch (error) {
        console.error('Error fetching national budget:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get county budget data
router.get('/budget/county/:countyId', authenticateToken, async (req, res) => {
    try {
        const { countyId } = req.params;
        
        // Check if user has access to this county
        if (req.user.role !== 'Super Admin' && 
            (req.user.role !== 'County Admin' || req.user.jurisdiction_id != countyId)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const [results] = await db.query(`
            SELECT 
                SUM(allocated_amount) as totalAllocated,
                SUM(spent_amount) as totalSpent
            FROM budgets
            WHERE jurisdiction_id = ?
        `, [countyId]);
        
        const [departments] = await db.query(`
            SELECT 
                d.id,
                d.name,
                SUM(b.allocated_amount) as allocated,
                SUM(b.spent_amount) as spent,
                ROUND((SUM(b.spent_amount) / SUM(b.allocated_amount)) * 100, 2) as utilization
            FROM departments d
            LEFT JOIN budgets b ON d.id = b.department_id
            WHERE d.jurisdiction_id = ?
            GROUP BY d.id, d.name
        `, [countyId]);
        
        res.json({
            totalAllocated: results[0].totalAllocated || 0,
            totalSpent: results[0].totalSpent || 0,
            departments
        });
        
    } catch (error) {
        console.error('Error fetching county budget:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get national budget summary
router.get('/national-summary', async (req, res) => {
    try {
        const [results] = await db.query('CALL GetNationalBudgetSummary(NULL)');
        
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No budget data found' });
        }
        
        // Process the results for the frontend
        const nationalTotal = results.find(r => r.level === NULL);
        const levelBreakdown = results.filter(r => r.level !== NULL);
        
        res.json({
            total_allocated: nationalTotal?.total_allocated || 0,
            total_spent: nationalTotal?.total_spent || 0,
            utilization_percentage: nationalTotal?.utilization_percentage || 0,
            level_breakdown: levelBreakdown.map(item => ({
                level: item.level,
                jurisdiction_count: item.jurisdiction_count,
                total_allocated: item.total_allocated,
                total_spent: item.total_spent,
                utilization_percentage: item.utilization_percentage
            }))
        });
    } catch (error) {
        console.error('Error fetching national summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search budget data
router.get('/search', async (req, res) => {
    try {
        const { query, year, level } = req.query;
        
        const fiscalYear = year ? parseInt(year) : NULL;
        const levelFilter = level || NULL;
        const searchQuery = query || NULL;
        
        const [results] = await db.query(
            'CALL SearchPublicBudgetData(?, ?, ?)',
            [searchQuery, fiscalYear, levelFilter]
        );
        
        res.json(results[0] || []);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


// ==================== Front End======================================================================================================================
// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/check');
                setUser(response.data.user);
                setPermissions(response.data.permissions);
            } catch (error) {
                setUser(null);
                setPermissions([]);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const response = await axios.post('/api/auth/login', credentials);
        setUser(response.data.user);
        setPermissions(response.data.permissions);
    };

    const logout = async () => {
        await axios.post('/api/auth/logout');
        setUser(null);
        setPermissions([]);
        navigate('/login');
    };

    // Check if user has permission for a specific jurisdiction and role
    const hasPermission = (requiredRole, jurisdictionId = null) => {
        if (!user) return false;
        
        // Super admin has all permissions
        if (permissions.some(p => p.role === 'Super Admin')) return true;
        
        return permissions.some(p => 
            p.role === requiredRole && 
            (jurisdictionId === null || p.jurisdiction_id === jurisdictionId)
        );
    };

    // Get accessible jurisdictions for the user
    const getAccessibleJurisdictions = () => {
        if (!user) return [];
        
        if (hasPermission('Super Admin')) {
            return ['all'];
        }
        
        return permissions.map(p => ({
            id: p.jurisdiction_id,
            level: p.jurisdiction_level,
            name: p.jurisdiction_name
        }));
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            permissions, 
            loading, 
            login, 
            logout, 
            hasPermission,
            getAccessibleJurisdictions
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


// src/components/ProtectedRoute.js
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole, jurisdictionLevel = null }) => {
    const { user, loading, hasPermission } = useAuth();

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && !hasPermission(requiredRole, jurisdictionLevel)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;


// src/layouts/DashboardLayout.js
import React from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const { user, permissions, logout, hasPermission } = useAuth();

    const getNavItems = () => {
        const items = [];
        
        // Super Admin gets all navigation
        if (hasPermission('Super Admin')) {
            items.push(
                { path: '/national', label: 'National Dashboard', icon: 'globe' },
                { path: '/counties', label: 'Counties Overview', icon: 'map' },
                { path: '/sub-counties', label: 'Sub-Counties Overview', icon: 'map-marked' },
                { path: '/users', label: 'User Management', icon: 'users' }
            );
        }
        
        // National level access
        if (hasPermission('National Admin')) {
            items.push(
                { path: '/national', label: 'National Dashboard', icon: 'globe' },
                { path: '/counties', label: 'Counties Overview', icon: 'map' }
            );
        }
        
        // County level access
        if (hasPermission('County Admin')) {
            items.push(
                { path: '/county', label: 'County Dashboard', icon: 'building' }
            );
        }
        
        // Sub-County level access
        if (hasPermission('Sub-County Admin')) {
            items.push(
                { path: '/sub-county', label: 'Sub-County Dashboard', icon: 'map-marker-alt' }
            );
        }
        
        // Department level access
        if (hasPermission('Department Head')) {
            items.push(
                { path: '/department', label: 'Department Dashboard', icon: 'sitemap' }
            );
        }
        
        // Common items
        items.push(
            { path: '/reports', label: 'Reports', icon: 'file-alt' },
            { path: '/profile', label: 'Profile', icon: 'user' }
        );
        
        return items;
    };

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="bg-dark text-white min-vh-100 p-0">
                    <div className="p-3">
                        <h4 className="text-center">Budget Tracker</h4>
                        <div className="text-center mb-4">
                            <span className="badge bg-primary">
                                {user?.role} | {user?.jurisdiction_name}
                            </span>
                        </div>
                    </div>
                    <Nav className="flex-column">
                        {getNavItems().map((item, index) => (
                            <Nav.Link 
                                as={Link} 
                                to={item.path} 
                                key={index}
                                className="text-white py-3 px-3 border-bottom border-secondary"
                            >
                                <i className={`fas fa-${item.icon} me-2`}></i>
                                {item.label}
                            </Nav.Link>
                        ))}
                        <Nav.Link 
                            onClick={logout}
                            className="text-white py-3 px-3 border-bottom border-secondary"
                        >
                            <i className="fas fa-sign-out-alt me-2"></i>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Col>
                <Col md={10} className="p-4">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardLayout;


// src/views/dashboards/NationalDashboard.js
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const NationalDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [budgetData, setBudgetData] = useState([]);
    const [counties, setCounties] = useState([]);
    const { hasPermission } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [budgetRes, countiesRes] = await Promise.all([
                    axios.get('/api/budget/national'),
                    axios.get('/api/jurisdictions/counties')
                ]);
                
                setBudgetData(budgetRes.data);
                setCounties(countiesRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container>
            <h2 className="mb-4">National Government Budget Overview</h2>
            
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title>Total Budget Allocation</Card.Title>
                            <Card.Text className="display-6">
                                KSh {budgetData.totalAllocated?.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title>Total Expenditure</Card.Title>
                            <Card.Text className="display-6 text-danger">
                                KSh {budgetData.totalSpent?.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title>Balance</Card.Title>
                            <Card.Text className="display-6 text-success">
                                KSh {(budgetData.totalAllocated - budgetData.totalSpent)?.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Card className="shadow mb-4">
                <Card.Header>
                    <h5>County Budget Summary</h5>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>County</th>
                                <th>Allocated (KSh)</th>
                                <th>Spent (KSh)</th>
                                <th>Utilization %</th>
                                {hasPermission('Super Admin') && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {counties.map(county => (
                                <tr key={county.id}>
                                    <td>{county.name}</td>
                                    <td>{county.allocated?.toLocaleString()}</td>
                                    <td>{county.spent?.toLocaleString()}</td>
                                    <td>
                                        <div className="progress">
                                            <div 
                                                className={`progress-bar ${county.utilization >= 80 ? 'bg-danger' : county.utilization >= 50 ? 'bg-warning' : 'bg-success'}`}
                                                style={{ width: `${county.utilization}%` }}
                                            >
                                                {county.utilization}%
                                            </div>
                                        </div>
                                    </td>
                                    {hasPermission('Super Admin') && (
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary me-2">
                                                Details
                                            </button>
                                            <button className="btn btn-sm btn-outline-warning">
                                                Adjust
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NationalDashboard;


// src/views/dashboards/CountyDashboard.js
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Spinner, Table } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CountyDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [budgetData, setBudgetData] = useState(null);
    const [departments, setDepartments] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [budgetRes, deptRes] = await Promise.all([
                    axios.get(`/api/budget/county/${user.jurisdiction_id}`),
                    axios.get(`/api/departments?jurisdiction=${user.jurisdiction_id}`)
                ]);
                
                setBudgetData(budgetRes.data);
                setDepartments(deptRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [user.jurisdiction_id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container>
            <h2 className="mb-4">{user.jurisdiction_name} County Budget Overview</h2>
            
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title>County Allocation</Card.Title>
                            <Card.Text className="display-6">
                                KSh {budgetData.totalAllocated?.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title>County Expenditure</Card.Title>
                            <Card.Text className="display-6 text-danger">
                                KSh {budgetData.totalSpent?.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title>Remaining Balance</Card.Title>
                            <Card.Text className="display-6 text-success">
                                KSh {(budgetData.totalAllocated - budgetData.totalSpent)?.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Card className="shadow mb-4">
                <Card.Header>
                    <h5>Department Budget Utilization</h5>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Department</th>
                                <th>Allocated (KSh)</th>
                                <th>Spent (KSh)</th>
                                <th>Utilization %</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(dept => (
                                <tr key={dept.id}>
                                    <td>{dept.name}</td>
                                    <td>{dept.allocated?.toLocaleString()}</td>
                                    <td>{dept.spent?.toLocaleString()}</td>
                                    <td>
                                        <div className="progress">
                                            <div 
                                                className={`progress-bar ${dept.utilization >= 80 ? 'bg-danger' : dept.utilization >= 50 ? 'bg-warning' : 'bg-success'}`}
                                                style={{ width: `${dept.utilization}%` }}
                                            >
                                                {dept.utilization}%
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
            <Row>
                <Col md={6}>
                    <Card className="shadow">
                        <Card.Header>
                            <h5>Sub-Counties Allocation</h5>
                        </Card.Header>
                        <Card.Body>
                            {/* Sub-counties chart or table would go here */}
                            <div className="text-center py-4">
                                <i className="fas fa-chart-pie fa-3x text-muted"></i>
                                <p className="mt-2">Sub-Counties Budget Distribution</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow">
                        <Card.Header>
                            <h5>Recent Transactions</h5>
                        </Card.Header>
                        <Card.Body>
                            {/* Recent transactions would go here */}
                            <div className="text-center py-4">
                                <i className="fas fa-list-alt fa-3x text-muted"></i>
                                <p className="mt-2">Recent Budget Transactions</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CountyDashboard;


// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import NationalDashboard from './views/dashboards/NationalDashboard';
import CountyDashboard from './views/dashboards/CountyDashboard';
import SubCountyDashboard from './views/dashboards/SubCountyDashboard';
import DepartmentDashboard from './views/dashboards/DepartmentDashboard';
import Login from './views/auth/Login';
import Unauthorized from './views/auth/Unauthorized';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                <Route element={<DashboardLayout />}>
                    {/* Super Admin and National Admin routes */}
                    <Route element={<ProtectedRoute requiredRole="National Admin" />}>
                        <Route path="/national" element={<NationalDashboard />} />
                    </Route>
                    
                    {/* County Admin routes */}
                    <Route element={<ProtectedRoute requiredRole="County Admin" />}>
                        <Route path="/county" element={<CountyDashboard />} />
                    </Route>
                    
                    {/* Sub-County Admin routes */}
                    <Route element={<ProtectedRoute requiredRole="Sub-County Admin" />}>
                        <Route path="/sub-county" element={<SubCountyDashboard />} />
                    </Route>
                    
                    {/* Department Head routes */}
                    <Route element={<ProtectedRoute requiredRole="Department Head" />}>
                        <Route path="/department" element={<DepartmentDashboard />} />
                    </Route>
                    
                    {/* Common routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    
                    {/* Super Admin only routes */}
                    <Route element={<ProtectedRoute requiredRole="Super Admin" />}>
                        <Route path="/counties" element={<CountiesOverview />} />
                        <Route path="/sub-counties" element={<SubCountiesOverview />} />
                        <Route path="/users" element={<UserManagement />} />
                    </Route>
                </Route>
                
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;


// src/views/public/LandingPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';

Chart.register(...registerables);

const LandingPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear());
    const [levelFilter, setLevelFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [nationalSummary, setNationalSummary] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNationalSummary();
    }, []);

    const fetchNationalSummary = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/public/national-summary');
            setNationalSummary(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load national budget data');
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.get('/api/public/search', {
                params: { query: searchQuery, year: fiscalYear, level: levelFilter }
            });
            setSearchResults(response.data);
            setLoading(false);
        } catch (err) {
            setError('Search failed. Please try again.');
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    // Prepare data for charts
    const allocationChartData = {
        labels: nationalSummary?.level_breakdown.map(item => item.level),
        datasets: [
            {
                label: 'Allocated (KSh)',
                data: nationalSummary?.level_breakdown.map(item => item.total_allocated / 1000000),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Spent (KSh)',
                data: nationalSummary?.level_breakdown.map(item => item.total_spent / 1000000),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const utilizationChartData = {
        labels: searchResults.map(item => item.name),
        datasets: [
            {
                data: searchResults.map(item => item.utilization_percentage),
                backgroundColor: searchResults.map(item => 
                    item.utilization_percentage >= 80 ? 'rgba(255, 99, 132, 0.6)' :
                    item.utilization_percentage >= 50 ? 'rgba(255, 206, 86, 0.6)' :
                    'rgba(75, 192, 192, 0.6)'
                ),
                borderColor: searchResults.map(item => 
                    item.utilization_percentage >= 80 ? 'rgba(255, 99, 132, 1)' :
                    item.utilization_percentage >= 50 ? 'rgba(255, 206, 86, 1)' :
                    'rgba(75, 192, 192, 1)'
                ),
                borderWidth: 1
            }
        ]
    };

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Kenya Government Budget Tracker</h1>
                    <p className="text-center text-muted">
                        Transparency in national, county, and sub-county budget allocations and expenditures
                    </p>
                </Col>
            </Row>
            
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
            
            {/* National Summary Section */}
            <Row className="mb-5">
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <h3>National Budget Overview - FY {fiscalYear}</h3>
                        </Card.Header>
                        <Card.Body>
                            {loading ? (
                                <div className="text-center py-5">
                                    <Spinner animation="border" />
                                </div>
                            ) : nationalSummary ? (
                                <>
                                    <Row>
                                        <Col md={4}>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>Total Allocation</Card.Title>
                                                    <Card.Text className="display-6 text-primary">
                                                        KSh {(nationalSummary.total_allocated / 1000000000).toFixed(2)}B
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>Total Expenditure</Card.Title>
                                                    <Card.Text className="display-6 text-danger">
                                                        KSh {(nationalSummary.total_spent / 1000000000).toFixed(2)}B
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Card.Title>Utilization Rate</Card.Title>
                                                    <Card.Text className="display-6">
                                                        <span className={nationalSummary.utilization_percentage >= 80 ? 'text-danger' : 
                                                                        nationalSummary.utilization_percentage >= 50 ? 'text-warning' : 'text-success'}>
                                                            {nationalSummary.utilization_percentage}%
                                                        </span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col md={8}>
                                            <div className="chart-container" style={{ height: '400px' }}>
                                                <Bar 
                                                    data={allocationChartData}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        scales: {
                                                            y: {
                                                                beginAtZero: true,
                                                                title: {
                                                                    display: true,
                                                                    text: 'Amount (Millions KSh)'
                                                                }
                                                            }
                                                        },
                                                        plugins: {
                                                            tooltip: {
                                                                callbacks: {
                                                                    label: function(context) {
                                                                        return `${context.dataset.label}: KSh ${(context.raw * 1000000).toLocaleString()}`;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <Card.Header>
                                                    <h5>Breakdown by Level</h5>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Level</th>
                                                                <th>Allocated</th>
                                                                <th>Spent</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {nationalSummary.level_breakdown.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.level}</td>
                                                                    <td>KSh {(item.total_allocated / 1000000).toFixed(2)}M</td>
                                                                    <td>KSh {(item.total_spent / 1000000).toFixed(2)}M</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </>
                            ) : (
                                <Alert variant="warning">No national budget data available</Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Search Section */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow">
                        <Card.Header>
                            <h3>Search Budget Data</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSearch}>
                                <Row>
                                    <Col md={5}>
                                        <Form.Group controlId="searchQuery">
                                            <Form.Label>Search Jurisdiction</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter county or sub-county name"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="fiscalYear">
                                            <Form.Label>Fiscal Year</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={fiscalYear}
                                                onChange={(e) => setFiscalYear(e.target.value)}
                                            >
                                                <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                                                <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                                                <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="levelFilter">
                                            <Form.Label>Jurisdiction Level</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={levelFilter}
                                                onChange={(e) => setLevelFilter(e.target.value)}
                                            >
                                                <option value="">All Levels</option>
                                                <option value="national">National</option>
                                                <option value="county">County</option>
                                                <option value="subcounty">Sub-County</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1} className="d-flex align-items-end">
                                        <button type="submit" className="btn btn-primary w-100">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
                <Row className="mb-5">
                    <Col>
                        <Card className="shadow">
                            <Card.Header>
                                <h3>Search Results</h3>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <div className="chart-container" style={{ height: '400px' }}>
                                            <Pie 
                                                data={utilizationChartData}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        tooltip: {
                                                            callbacks: {
                                                                label: function(context) {
                                                                    return `${context.label}: ${context.raw}% utilization`;
                                                                }
                                                            }
                                                        },
                                                        legend: {
                                                            position: 'right'
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Jurisdiction</th>
                                                    <th>Level</th>
                                                    <th>Allocated</th>
                                                    <th>Spent</th>
                                                    <th>Utilization</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchResults.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <span className={`badge ${
                                                                item.level === 'national' ? 'bg-primary' :
                                                                item.level === 'county' ? 'bg-success' : 'bg-info'
                                                            }`}>
                                                                {item.level}
                                                            </span>
                                                        </td>
                                                        <td>KSh {item.total_allocated?.toLocaleString()}</td>
                                                        <td>KSh {item.total_spent?.toLocaleString()}</td>
                                                        <td>
                                                            <div className="progress" style={{ height: '20px' }}>
                                                                <div 
                                                                    className={`progress-bar ${
                                                                        item.utilization_percentage >= 80 ? 'bg-danger' :
                                                                        item.utilization_percentage >= 50 ? 'bg-warning' : 'bg-success'
                                                                    }`}
                                                                    style={{ width: `${item.utilization_percentage}%` }}
                                                                >
                                                                    {item.utilization_percentage}%
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
            
            {/* Login Prompt for Authorized Users */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow">
                        <Card.Body className="text-center">
                            <h4>Government Officials</h4>
                            <p className="text-muted">
                                Authorized personnel can log in to enter or update budget data
                            </p>
                            <button 
                                onClick={handleLoginRedirect}
                                className="btn btn-primary"
                            >
                                <i className="fas fa-sign-in-alt me-2"></i>
                                Login to Dashboard
                            </button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
