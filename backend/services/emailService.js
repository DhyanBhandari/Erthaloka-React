// services/emailService.js
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  createTransporter() {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendEmail(to, subject, html, text = null) {
    try {
      const mailOptions = {
        from: `"ErthaLoka" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text: text || this.htmlToText(html)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendWelcomeEmail(user) {
    const subject = 'Welcome to ErthaLoka - Your Regenerative Journey Begins! 🌱';
    const html = this.getWelcomeEmailTemplate(user);
    
    return this.sendEmail(user.email, subject, html);
  }

  async sendSubscriptionConfirmation(user, subscription) {
    const subject = 'Subscription Activated - Welcome to the EcoVerse! 🎉';
    const html = this.getSubscriptionConfirmationTemplate(user, subscription);
    
    return this.sendEmail(user.email, subject, html);
  }

  async sendPaymentConfirmation(user, payment) {
    const subject = 'Payment Confirmation - ErthaLoka';
    const html = this.getPaymentConfirmationTemplate(user, payment);
    
    return this.sendEmail(user.email, subject, html);
  }

  async sendBookingConfirmation(user, booking) {
    const subject = `Booking Confirmed - ${booking.space_location} | ErthaLoka`;
    const html = this.getBookingConfirmationTemplate(user, booking);
    
    return this.sendEmail(user.email, subject, html);
  }

  async sendPasswordReset(user, resetToken) {
    const subject = 'Reset Your ErthaLoka Password';
    const html = this.getPasswordResetTemplate(user, resetToken);
    
    return this.sendEmail(user.email, subject, html);
  }

  async sendEmailVerification(user, verificationToken) {
    const subject = 'Verify Your Email - ErthaLoka';
    const html = this.getEmailVerificationTemplate(user, verificationToken);
    
    return this.sendEmail(user.email, subject, html);
  }

  // Email templates
  getWelcomeEmailTemplate(user) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ErthaLoka</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 40px 20px; }
          .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .feature { margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌱 Welcome to ErthaLoka!</h1>
            <p>Your regenerative journey begins now</p>
          </div>
          
          <div class="content">
            <h2>Hello ${user.name}! 👋</h2>
            
            <p>We're thrilled to welcome you to the ErthaLoka community - a global network of regenerative pioneers working together to create a sustainable future.</p>
            
            <div class="feature">
              <h3>🏡 What's Next?</h3>
              <ul>
                <li>Explore our Lokations spaces across India</li>
                <li>Connect with like-minded changemakers</li>
                <li>Join events and workshops in your area</li>
                <li>Consider upgrading to access exclusive benefits</li>
              </ul>
            </div>
            
            <div class="feature">
              <h3>🌍 Join the Movement</h3>
              <p>Be part of building regenerative communities that heal the planet while creating prosperous livelihoods for all.</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'https://erthaloka.com'}/dashboard" class="button">
                Explore Your Dashboard
              </a>
            </div>
            
            <p>If you have any questions, our team is here to help. Simply reply to this email or visit our support center.</p>
            
            <p>Welcome to the future of living!</p>
            <p><strong>The ErthaLoka Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 ErthaLoka. Building regenerative communities worldwide.</p>
            <p>MDR 1115, Kaatu Meetu Vidhi, Kuilapalyam, Near Auroville, Tamil Nadu - 605101</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getSubscriptionConfirmationTemplate(user, subscription) {
    const planNames = {
      resident: 'EcoVerse Resident',
      ambassador: 'EcoVerse Ambassador',
      warrior: 'EcoVerse Warrior'
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Activated</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 40px 20px; }
          .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
          .subscription-card { background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border: 2px solid #0ea5e9; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Subscription Activated!</h1>
            <p>Welcome to the EcoVerse</p>
          </div>
          
          <div class="content">
            <h2>Congratulations ${user.name}!</h2>
            
            <p>Your subscription has been successfully activated. You're now part of our exclusive community of regenerative leaders.</p>
            
            <div class="subscription-card">
              <h3>📋 Subscription Details</h3>
              <p><strong>Plan:</strong> ${planNames[subscription.plan_id] || subscription.plan_name}</p>
              <p><strong>Status:</strong> Active ✅</p>
              <p><strong>Started:</strong> ${new Date(subscription.start_date).toLocaleDateString()}</p>
              <p><strong>Next Billing:</strong> ${new Date(subscription.end_date).toLocaleDateString()}</p>
            </div>
            
            <h3>🚀 What You Can Do Now:</h3>
            <ul>
              <li>Book stays at Lokations spaces</li>
              <li>Access exclusive events and workshops</li>
              <li>Connect with community members</li>
              <li>Join our monthly regeneration circles</li>
              ${subscription.plan_id === 'ambassador' || subscription.plan_id === 'warrior' ? '<li>Host your own community events</li>' : ''}
              ${subscription.plan_id === 'warrior' ? '<li>Access global network and investment opportunities</li>' : ''}
            </ul>
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'https://erthaloka.com'}/dashboard" class="button">
                Access Your Dashboard
              </a>
            </div>
            
            <p>Thank you for being part of the regenerative revolution!</p>
            <p><strong>The ErthaLoka Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 ErthaLoka. Building regenerative communities worldwide.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getBookingConfirmationTemplate(user, booking) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmed</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 40px 20px; }
          .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
          .booking-card { background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 20px; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏡 Booking Confirmed!</h1>
            <p>Your Lokations space is reserved</p>
          </div>
          
          <div class="content">
            <h2>Hello ${user.name}!</h2>
            
            <p>Great news! Your booking has been confirmed. We're excited to host you at our regenerative space.</p>
            
            <div class="booking-card">
              <h3>📋 Booking Details</h3>
              <p><strong>Booking Reference:</strong> ${booking.booking_reference}</p>
              <p><strong>Space:</strong> ${booking.space_type}</p>
              <p><strong>Location:</strong> ${booking.space_location}</p>
              <p><strong>Check-in:</strong> ${new Date(booking.check_in_date).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> ${new Date(booking.check_out_date).toLocaleDateString()}</p>
              <p><strong>Guests:</strong> ${booking.guest_count}</p>
              <p><strong>Total Amount:</strong> ₹${(booking.total_amount / 100).toLocaleString()}</p>
            </div>
            
            <h3>📍 What to Expect:</h3>
            <ul>
              <li>Check-in starts at 2:00 PM</li>
              <li>Check-out by 11:00 AM</li>
              <li>Sustainable amenities included</li>
              <li>Community activities and workshops</li>
              <li>Organic meals available (optional)</li>
            </ul>
            
            ${booking.special_requests ? `<p><strong>Special Requests:</strong> ${booking.special_requests}</p>` : ''}
            
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'https://erthaloka.com'}/dashboard" class="button">
                View Booking Details
              </a>
            </div>
            
            <p>If you have any questions or need to modify your booking, please contact us at <a href="mailto:bookings@erthaloka.com">bookings@erthaloka.com</a></p>
            
            <p>Looking forward to welcoming you!</p>
            <p><strong>The ErthaLoka Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 ErthaLoka. Building regenerative communities worldwide.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordResetTemplate(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL || 'https://erthaloka.com'}/reset-password?token=${resetToken}`;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 40px 20px; }
          .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .warning { background: #fef2f2; border: 1px solid #fca5a5; color: #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Reset Your Password</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${user.name},</h2>
            
            <p>We received a request to reset your password for your ErthaLoka account.</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">
                Reset Password
              </a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This link expires in 1 hour</li>
                <li>Only use this link if you requested the password reset</li>
                <li>If you didn't request this, please ignore this email</li>
              </ul>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            
            <p><strong>The ErthaLoka Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 ErthaLoka. Building regenerative communities worldwide.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getEmailVerificationTemplate(user, verificationToken) {
    const verificationUrl = `${process.env.FRONTEND_URL || 'https://erthaloka.com'}/verify-email?token=${verificationToken}`;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 40px 20px; }
          .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Verify Your Email</h1>
            <p>Complete your ErthaLoka registration</p>
          </div>
          
          <div class="content">
            <h2>Hello ${user.name}!</h2>
            
            <p>Thank you for joining ErthaLoka! To complete your registration and access all features, please verify your email address.</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">
                Verify Email Address
              </a>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            
            <p>This verification link expires in 24 hours. If you didn't create an account with us, you can safely ignore this email.</p>
            
            <p>Welcome to the regenerative future!</p>
            <p><strong>The ErthaLoka Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 ErthaLoka. Building regenerative communities worldwide.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPaymentConfirmationTemplate(user, payment) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation</title>
        <style>
          body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 40px 20px; text-align: center; }
          .content { padding: 40px 20px; }
          .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; }
          .payment-card { background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 20px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💳 Payment Confirmed</h1>
            <p>Thank you for your payment</p>
          </div>
          
          <div class="content">
            <h2>Hello ${user.name}!</h2>
            
            <p>We've successfully received your payment. Here are the details:</p>
            
            <div class="payment-card">
              <h3>💰 Payment Details</h3>
              <p><strong>Amount:</strong> ₹${(payment.amount / 100).toLocaleString()}</p>
              <p><strong>Payment ID:</strong> ${payment.razorpay_payment_id}</p>
              <p><strong>Date:</strong> ${new Date(payment.created_at).toLocaleDateString()}</p>
              <p><strong>Status:</strong> Completed ✅</p>
            </div>
            
            <p>Your payment has been processed successfully and your services are now active.</p>
            
            <p>If you have any questions about this payment, please contact us at <a href="mailto:support@erthaloka.com">support@erthaloka.com</a></p>
            
            <p>Thank you for supporting our regenerative mission!</p>
            <p><strong>The ErthaLoka Team</strong></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2025 ErthaLoka. Building regenerative communities worldwide.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Helper method to convert HTML to plain text
  htmlToText(html) {
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }
}

module.exports = new EmailService();