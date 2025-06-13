// services/smsService.js
const twilio = require('twilio');
const axios = require('axios');

class SMSService {
  constructor() {
    this.provider = process.env.SMS_PROVIDER || 'twilio'; // 'twilio' or 'msg91'
    this.initializeProvider();
  }

  initializeProvider() {
    if (this.provider === 'twilio') {
      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    }
  }

  async sendSMS(to, message) {
    try {
      if (this.provider === 'twilio') {
        return await this.sendTwilioSMS(to, message);
      } else if (this.provider === 'msg91') {
        return await this.sendMSG91SMS(to, message);
      } else {
        throw new Error('Invalid SMS provider configured');
      }
    } catch (error) {
      console.error('SMS sending failed:', error);
      throw new Error('Failed to send SMS');
    }
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

  async sendMSG91SMS(to, message) {
    const url = 'https://api.msg91.com/api/v5/flow/';
    const data = {
      template_id: process.env.MSG91_TEMPLATE_ID,
      short_url: "0",
      recipients: [
        {
          mobiles: to,
          var1: message
        }
      ]
    };

    const response = await axios.post(url, data, {
      headers: {
        'Authkey': process.env.MSG91_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('MSG91 SMS sent successfully:', response.data);
    return { success: true, messageId: response.data.request_id, provider: 'msg91' };
  }

  async sendOTP(phone, otp) {
    const message = `Your ErthaLoka verification code is: ${otp}. Valid for 10 minutes. Do not share this code with anyone.`;
    
    try {
      // In development, just log the OTP
      if (process.env.NODE_ENV === 'development') {
        console.log(`📱 OTP for ${phone}: ${otp}`);
        return { success: true, messageId: 'dev-mode', provider: 'development' };
      }

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

  // Template-based SMS (for MSG91)
  async sendTemplateSMS(phone, templateId, variables = {}) {
    if (this.provider !== 'msg91') {
      throw new Error('Template SMS is only supported with MSG91 provider');
    }

    const url = 'https://api.msg91.com/api/v5/flow/';
    const data = {
      template_id: templateId,
      short_url: "0",
      recipients: [
        {
          mobiles: phone,
          ...variables
        }
      ]
    };

    const response = await axios.post(url, data, {
      headers: {
        'Authkey': process.env.MSG91_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    return { success: true, messageId: response.data.request_id, provider: 'msg91' };
  }

  // SMS templates for different use cases
  getOTPTemplate(otp) {
    return {
      message: `Your ErthaLoka verification code is: ${otp}. Valid for 10 minutes. Do not share this code with anyone.`,
      variables: { var1: otp }
    };
  }

  getWelcomeTemplate(name) {
    return {
      message: `Welcome to ErthaLoka, ${name}! Start your regenerative journey at erthaloka.com. Questions? Call +917829778299`,
      variables: { var1: name }
    };
  }

  getBookingTemplate(bookingRef, location, checkIn) {
    return {
      message: `ErthaLoka: Booking ${bookingRef} confirmed at ${location} for ${checkIn}. Check-in: 2 PM. Contact: +917829778299`,
      variables: { 
        var1: bookingRef, 
        var2: location, 
        var3: checkIn 
      }
    };
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

  // Check SMS delivery status
  async checkDeliveryStatus(messageId) {
    try {
      if (this.provider === 'twilio') {
        const message = await this.twilioClient.messages(messageId).fetch();
        return {
          messageId,
          status: message.status,
          dateCreated: message.dateCreated,
          dateSent: message.dateSent,
          errorCode: message.errorCode,
          errorMessage: message.errorMessage
        };
      } else if (this.provider === 'msg91') {
        // MSG91 status check API
        const url = `https://api.msg91.com/api/v5/report/${messageId}`;
        const response = await axios.get(url, {
          headers: {
            'Authkey': process.env.MSG91_API_KEY
          }
        });
        
        return {
          messageId,
          status: response.data.status,
          data: response.data
        };
      }
    } catch (error) {
      console.error('Failed to check SMS delivery status:', error);
      throw error;
    }
  }

  // Get SMS pricing information
  async getPricing(country = 'IN') {
    if (this.provider === 'twilio') {
      try {
        const pricing = await this.twilioClient.pricing.v2
          .countries(country)
          .fetch();
        return pricing;
      } catch (error) {
        console.error('Failed to get SMS pricing:', error);
        throw error;
      }
    } else {
      // MSG91 has fixed pricing, you can return static data
      return {
        country: 'IN',
        pricePerSMS: 0.20, // ₹0.20 per SMS (approximate)
        currency: 'INR'
      };
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
      cost: result.cost || null
    };
    
    console.log('SMS Activity:', logEntry);
    
    // In production, you might want to store this in a database
    // await pool.query('INSERT INTO sms_logs (phone, message_length, provider, success, message_id, cost) VALUES ($1, $2, $3, $4, $5, $6)', 
    //   [phone, message.length, this.provider, result.success, result.messageId, result.cost]);
  }
}

module.exports = new SMSService();