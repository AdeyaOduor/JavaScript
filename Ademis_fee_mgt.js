


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
