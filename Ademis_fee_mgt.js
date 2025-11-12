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


// SMS Notification Template
Dear Parent/Guardian,
Payment of KES {amount} received for {learnerName} ({grade}) for {term} {academicYear}.
Receipt: {receiptNumber}
New Balance: KES {balance}
Thank you.


// email.html
<!DOCTYPE html><html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .details { margin: 20px 0; }
        .receipt { background: #f9f9f9; padding: 15px; border-radius: 5px; }
        .footer { margin-top: 20px; font-size: 0.9em; color: #7f8c8d; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Payment Receipt</h2>
            <p>{institutionName}</p>
        </div>
        
        <div class="details">
            <p><strong>Learner:</strong> {learnerName}</p>
            <p><strong>Grade:</strong> {grade}</p>
            <p><strong>Term:</strong> {term} {academicYear}</p>
        </div>
        
        <div class="receipt">
            <h3>Payment Details</h3>
            <p><strong>Amount:</strong> KES {amount}</p>
            <p><strong>Date:</strong> {paymentDate}</p>
            <p><strong>Receipt Number:</strong> {receiptNumber}</p>
            <p><strong>Payment Method:</strong> M-Pesa</p>
            <p><strong>Current Balance:</strong> KES {balance}</p>
        </div>
        
        <div class="footer">
            <p>This is an automated receipt. Please keep it for your records.</p>
            <p>Contact the school office for any queries.</p>
        </div>
    </div>
</body>
</html>


// Scheduled Tasks for Reminders
// tasks/feeReminders.js
const cron = require('node-cron');
const db = require('../models');
const smsService = require('../services/smsService');
const emailService = require('../services/emailService');

// Run every Monday at 9am
cron.schedule('0 9 * * 1', async () => {
  try {
    const currentTerm = await getCurrentTerm();
    const currentYear = await getCurrentAcademicYear();
    
    // Get learners with outstanding balances
    const balances = await db.FeeBalance.findAll({
      where: {
        term: currentTerm,
        academic_year: currentYear,
        balance: { [db.Sequelize.Op.gt]: 0 }
      },
      include: [{
        model: db.Learner,
        attributes: ['id', 'first_name', 'last_name', 'parent_guardian_phone', 'parent_guardian_email']
      }]
    });
    
    for (const balance of balances) {
      // Send SMS reminder
      if (balance.learner.parent_guardian_phone) {
        const smsContent = `Fee Reminder: ${balance.learner.first_name} has KES ${balance.balance} balance for ${currentTerm}. Please pay before due date.`;
        await smsService.send(balance.learner.parent_guardian_phone, smsContent);
      }
      
      // Send email reminder
      if (balance.learner.parent_guardian_email) {
        await emailService.sendFeeReminder(balance.learner, balance.balance, currentTerm, currentYear);
      }
    }
    
    console.log(`Sent fee reminders to ${balances.length} parents`);
  } catch (error) {
    console.error('Fee reminder job failed:', error);
  }
});
