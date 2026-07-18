import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function testEmail() {
  const user = process.env.EMAIL_USER || 'divyanshsingh74178@gmail.com';
  const pass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '');

  console.log('Testing Gmail SMTP with user:', user);
  console.log('Pass length:', pass.length);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const senderEmail = 'divyanshsingh74178@gmail.com';
  const senderName = 'Test User';
  const message = 'Hello Divyansh! Testing live portfolio mail delivery and auto-reply service.';

  // 1. Owner notification
  const ownerMail = {
    from: `"Portfolio Contact Form" <${user}>`,
    to: 'divyanshsingh74178@gmail.com',
    replyTo: senderEmail,
    subject: `📬 Portfolio Contact Test from ${senderName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `
  };

  // 2. Sender Auto-Reply
  const senderMail = {
    from: `"Divyansh Singh" <${user}>`,
    to: senderEmail,
    subject: `Thanks for contacting me! - Divyansh Singh`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
        <h2 style="color: #10b981;">Thanks for reaching out, ${senderName}!</h2>
        <p>I have received your message and will get back to you shortly.</p>
        <blockquote style="background: #f1f5f9; padding: 10px;">"${message}"</blockquote>
        <p>Best regards,<br/><strong>Divyansh Singh</strong></p>
      </div>
    `
  };

  try {
    const res1 = await transporter.sendMail(ownerMail);
    console.log('Owner email sent! ID:', res1.messageId);

    const res2 = await transporter.sendMail(senderMail);
    console.log('Auto-reply email sent! ID:', res2.messageId);
    console.log('✅ Success! Gmail SMTP is fully operational!');
  } catch (err) {
    console.error('❌ Email test failed:', err);
  }
}

testEmail();
