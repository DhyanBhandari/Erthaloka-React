// services/smsService.js
const twilio = require('twilio');

class SMSService {
  constructor() {
    this.provider = process.env.SMS_PROVIDER || 'mock'; // Default to mock for development
    this.initializeProvider();
  }

  initializeProvider() {
    if (this.provider === 'twilio' && process.env.TWILIO_ACCOUNT_SID) {
      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    }
  }

  async sendSMS(to, message) {
    try {
      if (this.provider === 'mock') {
        return await this.sendMockSMS(to, message);
      } else if (this.provider === 'twilio') {
        return await this.sendTwilioSMS(to, message);
      } else {
        throw new Error('Invalid SMS provider configured');
      }
    } catch (error) {
      console.error('SMS sending failed:', error);
      throw new Error('Failed to send SMS');
    }
  }

  async sendMockSMS(to, message) {
    // Mock implementation for development
    console.log('\n📱 ========== MOCK SMS ==========');
    console.log(`📞 To: ${to}`);
    console.log(`💬 Message: ${message}`);
    console.log(`⏰ Time: ${new Date().toISOString()}`);
    console.log('================================\n');
    
    // Simulate some delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      success: true, 
      messageId: `mock_${Date.now()}`, 
      provider: 'mock',
      cost: 0
    };
  }

  async sendTwilioSMS(to, message) {
    const result = await this.twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    console.log('Twilio SMS sent successfully:', result.sid);
    return { success: true, messageId: result.sid, provider: 'twilio' };
  }

  async sendOTP(phone, otp) {
    const message = `Your ErthaLoka verification code is: ${otp}. Valid for 10 minutes. Do not share this code with anyone.`;
    
    try {
      return await this.sendSMS(phone, message);
    } catch (error) {
      console.error('OTP sending failed:', error);
      throw error;
    }
  }

  async sendBookingConfirmation(phone, bookingDetails) {
    const message = `ErthaLoka: Your booking ${bookingDetails.reference} at ${bookingDetails.location} is confirmed for ${bookingDetails.checkIn}. See you soon!`;
    
    return await this.sendSMS(phone, message);
  }

  async sendBookingReminder(phone, bookingDetails) {
    const message = `ErthaLoka: Reminder - Your stay at ${bookingDetails.location} starts tomorrow (${bookingDetails.checkIn}). Check-in at 2 PM. Contact: +917829778299`;
    
    return await this.sendSMS(phone, message);
  }

  async sendPaymentConfirmation(phone, paymentDetails) {
    const amount = (paymentDetails.amount / 100).toLocaleString();
    const message = `ErthaLoka: Payment of ₹${amount} received successfully. Payment ID: ${paymentDetails.paymentId}. Thank you!`;
    
    return await this.sendSMS(phone, message);
  }

  async sendSubscriptionActivation(phone, subscriptionDetails) {
    const message = `ErthaLoka: Your ${subscriptionDetails.planName} subscription is now active! Welcome to the EcoVerse. Access your dashboard at erthaloka.com`;
    
    return await this.sendSMS(phone, message);
  }

  async sendEmergencyAlert(phone, message) {
    const alertMessage = `ErthaLoka ALERT: ${message}. If this is an emergency, please call +917829778299 immediately.`;
    
    return await this.sendSMS(phone, alertMessage);
  }

  // Bulk SMS functionality
  async sendBulkSMS(recipients, message) {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await this.sendSMS(recipient.phone, message);
        results.push({
          phone: recipient.phone,
          success: true,
          messageId: result.messageId
        });
      } catch (error) {
        results.push({
          phone: recipient.phone,
          success: false,
          error: error.message
        });
      }
    }
    
    return results;
  }

  // Validate phone number format
  validatePhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid Indian mobile number
    const indianMobileRegex = /^[6-9]\d{9}$/;
    
    if (cleaned.length === 10 && indianMobileRegex.test(cleaned)) {
      return `+91${cleaned}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned}`;
    } else if (cleaned.length === 13 && cleaned.startsWith('+91')) {
      return cleaned;
    }
    
    throw new Error('Invalid phone number format. Please provide a valid Indian mobile number.');
  }

  // Check SMS delivery status (mock implementation)
  async checkDeliveryStatus(messageId) {
    if (this.provider === 'mock') {
      return {
        messageId,
        status: 'delivered',
        dateCreated: new Date(),
        dateSent: new Date(),
        provider: 'mock'
      };
    } else if (this.provider === 'twilio') {
      try {
        const message = await this.twilioClient.messages(messageId).fetch();
        return {
          messageId,
          status: message.status,
          dateCreated: message.dateCreated,
          dateSent: message.dateSent,
          errorCode: message.errorCode,
          errorMessage: message.errorMessage
        };
      } catch (error) {
        console.error('Failed to check SMS delivery status:', error);
        throw error;
      }
    }
  }

  // Get SMS pricing information
  async getPricing(country = 'IN') {
    if (this.provider === 'mock') {
      return {
        country: 'IN',
        pricePerSMS: 0.00, // Free for mock
        currency: 'INR'
      };
    } else if (this.provider === 'twilio') {
      try {
        const pricing = await this.twilioClient.pricing.v2
          .countries(country)
          .fetch();
        return pricing;
      } catch (error) {
        console.error('Failed to get SMS pricing:', error);
        throw error;
      }
    }
  }

  // Log SMS activity
  logSMSActivity(phone, message, result) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      phone: phone.replace(/\d(?=\d{4})/g, '*'), // Mask phone number
      messageLength: message.length,
      provider: this.provider,
      success: result.success,
      messageId: result.messageId,
      cost: result.cost || 0
    };
    
    console.log('SMS Activity:', logEntry);
    
    // In production, you might want to store this in a database
    // await pool.query('INSERT INTO sms_logs (phone, message_length, provider, success, message_id, cost) VALUES ($1, $2, $3, $4, $5, $6)', 
    //   [phone, message.length, this.provider, result.success, result.messageId, result.cost]);
  }
}

module.exports = new SMSService();