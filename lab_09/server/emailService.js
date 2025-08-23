const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('📧 Email configuration check:');
console.log('   EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('   EMAIL_USER:', process.env.EMAIL_USER);
console.log('   EMAIL_PASSWORD set:', !!process.env.EMAIL_PASSWORD);
console.log('   EMAIL_FROM:', process.env.EMAIL_FROM);

// Create transporter (only once)
const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log('SMTP connection failed:', error);
      } else {
        console.log('SMTP server is ready to send emails');
      }
    });

    return transporter;
  } catch (error) {
    console.error('Failed to create transporter:', error.message);
    throw error;
  }
};

const emailTemplates = {
  bookingConfirmation: (bookingData) => ({
    subject: 'Booking Confirmation - Hotel Booking',
    text: `
      Dear ${bookingData.name},
      
      Thank you for your booking with Hotel Booking!
      
      Booking Details:
      - Booking ID: ${bookingData.bookingId}
      - Hotel: ${bookingData.hotel}
      - Room Type: ${bookingData.room_type}
      - Check-in: ${bookingData.check_in}
      - Check-out: ${bookingData.check_out}
      - Guests: ${bookingData.guests}
      - Total Amount: $${bookingData.total_amount}
      
      We look forward to hosting you!
      
      Best regards,
      Hotel Booking Team
    `,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 30px; }
          .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; }
          .booking-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .detail-item { margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed! 🎉</h1>
          </div>
          
          <div class="content">
            <p>Dear <strong>${bookingData.name}</strong>,</p>
            <p>Thank you for choosing Hotel Booking! Your reservation has been confirmed.</p>
            
            <div class="booking-details">
              <h2>Booking Details</h2>
              <div class="detail-item"><strong>Booking ID:</strong> ${bookingData.bookingId}</div>
              <div class="detail-item"><strong>Hotel:</strong> ${bookingData.hotel}</div>
              <div class="detail-item"><strong>Room Type:</strong> ${bookingData.room_type}</div>
              <div class="detail-item"><strong>Check-in:</strong> ${bookingData.check_in}</div>
              <div class="detail-item"><strong>Check-out:</strong> ${bookingData.check_out}</div>
              <div class="detail-item"><strong>Guests:</strong> ${bookingData.guests}</div>
              <div class="detail-item"><strong>Total Amount:</strong> $${bookingData.total_amount}</div>
              ${bookingData.special_requests ? `<div class="detail-item"><strong>Special Requests:</strong> ${bookingData.special_requests}</div>` : ''}
            </div>
            
            <p>We look forward to welcoming you! If you have any questions, please contact us.</p>
          </div>
          
          <div class="footer">
            <p>Hotel Booking Service</p>
            <p>Email: support@hotelbooking.com | Phone: +1 (555) 123-4567</p>
            <p>© 2023 Hotel Booking. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};


// Send email
const sendEmail = async (to, templateName, data) => {
  console.log(`\nAttempting to send email to: ${to}`);
  console.log(`Template: ${templateName}`);

  const template = emailTemplates[templateName](data);

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully! ID:', result.messageId);

    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
