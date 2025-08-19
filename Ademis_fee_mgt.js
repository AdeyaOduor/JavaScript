// sql
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


// services/mpesaService.js
const axios = require('axios');
const crypto = require('crypto');
const db = require('../models');

class MpesaService {
  constructor() {
    this.config = {
      baseUrl: process.env.MPESA_API_URL || 'https://api.safaricom.co.ke',
      consumerKey: process.env.MPESA_CONSUMER_KEY,
      consumerSecret: process.env.MPESA_CONSUMER_SECRET,
      passKey: process.env.MPESA_PASSKEY,
      businessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
      callbackUrl: process.env.MPESA_CALLBACK_URL
    };
  }

  async generateAccessToken() {
    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString('base64');
    
    try {
      const response = await axios.get(`${this.config.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: {
          Authorization: `Basic ${auth}`
        }
      });
      
      return response.data.access_token;
    } catch (error) {
      console.error('M-Pesa token generation failed:', error.response?.data || error.message);
      throw new Error('Failed to generate M-Pesa access token');
    }
  }

  async initiateSTKPush(phoneNumber, amount, learnerId, term, academicYear) {
    const accessToken = await this.generateAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -3);
    const password = Buffer.from(`${this.config.businessShortCode}${this.config.passKey}${timestamp}`).toString('base64');
    const transactionRef = `EDU${Date.now()}`;
    
    const requestData = {
      BusinessShortCode: this.config.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber.replace(/^0/, '254'),
      PartyB: this.config.businessShortCode,
      PhoneNumber: phoneNumber.replace(/^0/, '254'),
      CallBackURL: this.config.callbackUrl,
      AccountReference: `EDU-${learnerId}`,
      TransactionDesc: `School Fees ${term} ${academicYear}`
    };

    try {
      const response = await axios.post(`${this.config.baseUrl}/mpesa/stkpush/v1/processrequest`, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      // Save payment record with pending status
      const payment = await db.FeePayment.create({
        payment_reference: transactionRef,
        learner_id: learnerId,
        mpesa_transaction_id: response.data.CheckoutRequestID,
        amount: amount,
        term: term,
        academic_year: academicYear,
        recorded_by: 'SYSTEM',
        status: 'PENDING'
      });

      return {
        success: true,
        message: 'Payment request initiated',
        checkoutRequestId: response.data.CheckoutRequestID,
        paymentId: payment.id
      };
    } catch (error) {
      console.error('M-Pesa STK push failed:', error.response?.data || error.message);
      throw new Error('Failed to initiate M-Pesa payment');
    }
  }

  async handleCallback(notificationData) {
    // Validate the callback data
    if (notificationData.Body.stkCallback.ResultCode !== 0) {
      return this.handleFailedPayment(notificationData);
    }
    
    const callback = notificationData.Body.stkCallback;
    const metadata = callback.CallbackMetadata.Item;
    
    const amount = metadata.find(item => item.Name === 'Amount').Value;
    const mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber').Value;
    const phoneNumber = metadata.find(item => item.Name === 'PhoneNumber').Value;
    const checkoutRequestId = callback.CheckoutRequestID;
    
    try {
      // Update payment record
      const payment = await db.FeePayment.findOne({
        where: { mpesa_transaction_id: checkoutRequestId }
      });
      
      if (!payment) {
        throw new Error('Payment record not found');
      }
      
      await payment.update({
        mpesa_confirmation_code: mpesaReceiptNumber,
        status: 'COMPLETED',
        payment_date: new Date()
      });
      
      // Update fee balance
      await this.updateFeeBalance(payment.learner_id, payment.term, payment.academic_year, amount);
      
      // Send notification to parent
      await this.sendPaymentNotification(payment.id, amount);
      
      return { success: true, message: 'Payment processed successfully' };
    } catch (error) {
      console.error('Payment callback processing failed:', error);
      throw error;
    }
  }

  async updateFeeBalance(learnerId, term, academicYear, amountPaid) {
    const [balance, created] = await db.FeeBalance.findOrCreate({
      where: { learner_id: learnerId, term, academic_year: academicYear },
      defaults: {
        total_fee: await this.getTermFee(learnerId, term, academicYear),
        amount_paid: amountPaid
      }
    });
    
    if (!created) {
      await balance.increment('amount_paid', { by: amountPaid });
    }
  }

  async getTermFee(learnerId, term, academicYear) {
    const learner = await db.Learner.findByPk(learnerId, {
      include: [{
        model: db.Institution,
        attributes: ['id']
      }]
    });
    
    const feeStructure = await db.FeeStructure.findOne({
      where: {
        institution_id: learner.institution.id,
        grade_level: learner.current_grade,
        term,
        academic_year: academicYear
      }
    });
    
    return feeStructure ? feeStructure.amount : 0;
  }

  async sendPaymentNotification(paymentId, amount) {
    const payment = await db.FeePayment.findByPk(paymentId, {
      include: [{
        model: db.Learner,
        attributes: ['id', 'parent_guardian_phone', 'parent_guardian_email']
      }]
    });
    
    // Send SMS notification
    if (payment.learner.parent_guardian_phone) {
      try {
        const smsContent = `Dear Parent, KES ${amount} received for ${payment.term} ${payment.academic_year}. New balance: KES ${await this.getCurrentBalance(payment.learner_id, payment.term, payment.academic_year)}. Ref: ${payment.mpesa_confirmation_code}`;
        
        await db.PaymentNotification.create({
          payment_id: paymentId,
          notification_type: 'SMS',
          recipient: payment.learner.parent_guardian_phone,
          status: 'SENT',
          sent_at: new Date()
        });
        
        // In production: Call your SMS gateway
        // await smsService.send(payment.learner.parent_guardian_phone, smsContent);
      } catch (error) {
        await db.PaymentNotification.create({
          payment_id: paymentId,
          notification_type: 'SMS',
          recipient: payment.learner.parent_guardian_phone,
          status: 'FAILED',
          error_message: error.message
        });
      }
    }
    
    // Send Email notification
    if (payment.learner.parent_guardian_email) {
      try {
        await db.PaymentNotification.create({
          payment_id: paymentId,
          notification_type: 'EMAIL',
          recipient: payment.learner.parent_guardian_email,
          status: 'SENT',
          sent_at: new Date()
        });
        
        // In production: Call your email service
        // await emailService.sendPaymentReceipt(...);
      } catch (error) {
        await db.PaymentNotification.create({
          payment_id: paymentId,
          notification_type: 'EMAIL',
          recipient: payment.learner.parent_guardian_email,
          status: 'FAILED',
          error_message: error.message
        });
      }
    }
  }

  async getCurrentBalance(learnerId, term, academicYear) {
    const balance = await db.FeeBalance.findOne({
      where: { learner_id: learnerId, term, academic_year: academicYear }
    });
    
    return balance ? balance.balance : await this.getTermFee(learnerId, term, academicYear);
  }
}

module.exports = new MpesaService();


// routes/feeRoutes.js
const express = require('express');
const router = express.Router();
const feeController = require('../controllers/feeController');
const { validatePayment } = require('../validators/feeValidator');

// Initiate M-Pesa payment
router.post('/payments/mpesa', validatePayment, feeController.initiateMpesaPayment);

// M-Pesa callback endpoint
router.post('/payments/mpesa/callback', feeController.handleMpesaCallback);

// Get fee balance
router.get('/learners/:learnerId/balance', feeController.getFeeBalance);

// Get payment history
router.get('/learners/:learnerId/payments', feeController.getPaymentHistory);

module.exports = router;
