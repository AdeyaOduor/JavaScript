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


// controllers/feeController.js
const mpesaService = require('../services/mpesaService');
const db = require('../models');

exports.initiateMpesaPayment = async (req, res) => {
  try {
    const { learnerId, phoneNumber, amount, term, academicYear } = req.body;
    
    const result = await mpesaService.initiateSTKPush(
      phoneNumber,
      amount,
      learnerId,
      term,
      academicYear
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.handleMpesaCallback = async (req, res) => {
  try {
    await mpesaService.handleCallback(req.body);
    res.status(200).send('Callback processed successfully');
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).send('Error processing callback');
  }
};

exports.getFeeBalance = async (req, res) => {
  try {
    const { learnerId } = req.params;
    const { term, academicYear } = req.query;
    
    const balance = await db.FeeBalance.findOne({
      where: {
        learner_id: learnerId,
        term: term || await getCurrentTerm(),
        academic_year: academicYear || await getCurrentAcademicYear()
      },
      attributes: ['total_fee', 'amount_paid', 'balance', 'last_updated']
    });
    
    res.json({
      success: true,
      data: balance || {
        total_fee: 0,
        amount_paid: 0,
        balance: 0,
        last_updated: null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const { learnerId } = req.params;
    const { term, academicYear, limit } = req.query;
    
    const whereClause = { learner_id: learnerId };
    if (term) whereClause.term = term;
    if (academicYear) whereClause.academic_year = academicYear;
    
    const payments = await db.FeePayment.findAll({
      where: whereClause,
      order: [['payment_date', 'DESC']],
      limit: parseInt(limit) || 10,
      attributes: ['payment_reference', 'amount', 'payment_date', 'status', 'term', 'academic_year']
    });
    
    res.json({
      success: true,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper functions
async function getCurrentTerm() {
  // Implement your logic to determine current term
  return 'Term 1';
}

async function getCurrentAcademicYear() {
  // Implement your logic to determine current academic year
  return '2023-2024';
}


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
