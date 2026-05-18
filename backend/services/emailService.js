const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@saasbilling.com',
      to,
      subject,
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const sendEmailVerification = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  const htmlContent = `
    <h2>Verify Your Email</h2>
    <p>Click the link below to verify your email address:</p>
    <a href="${verificationUrl}" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Verify Email
    </a>
    <p>Or copy and paste this link: ${verificationUrl}</p>
    <p>This link expires in 24 hours.</p>
  `;
  return sendEmail(email, 'Email Verification - SaaS Billing Portal', htmlContent);
};

const sendPasswordReset = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const htmlContent = `
    <h2>Reset Your Password</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Reset Password
    </a>
    <p>Or copy and paste this link: ${resetUrl}</p>
    <p>This link expires in 1 hour.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
  `;
  return sendEmail(email, 'Password Reset - SaaS Billing Portal', htmlContent);
};

const sendInvoice = async (email, invoiceNumber, pdfUrl) => {
  const htmlContent = `
    <h2>Your Invoice #${invoiceNumber}</h2>
    <p>Your invoice is ready. Download it by clicking the link below:</p>
    <a href="${pdfUrl}" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Download Invoice
    </a>
  `;
  return sendEmail(email, `Invoice #${invoiceNumber} - SaaS Billing Portal`, htmlContent);
};

module.exports = {
  sendEmail,
  sendEmailVerification,
  sendPasswordReset,
  sendInvoice,
};
