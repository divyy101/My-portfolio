import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  const user = process.env.EMAIL_USER || process.env.GMAIL_USER || process.env.SMTP_USER || 'divyanshsingh74178@gmail.com';
  const pass = (process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.PASS || 'qsyr yijy fyyz tjdz').trim().replace(/\s+/g, '');
  const receiverEmail = process.env.NOTIFICATION_EMAIL || 'divyanshsingh74178@gmail.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const ownerMailOptions = {
    from: `"Portfolio Contact Form" <${user}>`,
    to: receiverEmail,
    replyTo: email,
    subject: `📬 New Portfolio Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #2563eb; margin-top: 0;">New Portfolio Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; margin: 0; color: #1e293b; font-size: 1rem;">
          ${message.replace(/\n/g, '<br/>')}
        </blockquote>
      </div>
    `,
  };

  const autoReplyMailOptions = {
    from: `"Divyansh Singh" <${user}>`,
    to: email,
    subject: `Thanks for contacting me! - Divyansh Singh`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #10b981; margin-top: 0;">Thanks for reaching out, ${name}!</h2>
        <p style="color: #334155; font-size: 1rem;">Hello ${name},</p>
        <p style="color: #334155; font-size: 1rem; line-height: 1.5;">
          Thank you for contacting me through my portfolio. I have received your message and will review it and get back to you shortly.
        </p>
        <br/>
        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px;">
          <p style="margin: 0 0 8px 0; font-size: 0.85rem; color: #64748b; font-weight: bold;">A copy of your message:</p>
          <p style="margin: 0; color: #334155; font-style: italic;">"${message.replace(/\n/g, '<br/>')}"</p>
        </div>
        <br/>
        <p style="color: #334155; font-size: 1rem; margin-bottom: 4px;">Best regards,</p>
        <p style="color: #1e293b; font-size: 1rem; margin-top: 0;">
          <strong>Divyansh Singh</strong><br/>
          <span style="color: #64748b; font-size: 0.9rem;">Software Engineer & Full Stack Developer</span><br/>
          <a href="mailto:divyanshsingh74178@gmail.com" style="color: #2563eb; text-decoration: none;">divyanshsingh74178@gmail.com</a> | +91 9555807076<br/>
          <a href="https://github.com/divyy101" style="color: #2563eb; text-decoration: none;">github.com/divyy101</a>
        </p>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(autoReplyMailOptions)
    ]);
    return res.status(200).json({ success: true, delivered: true, message: 'Message delivered successfully!' });
  } catch (err) {
    console.error('Vercel Serverless Contact Mail Error:', err);
    return res.status(500).json({ error: err.message || 'Failed to deliver email.' });
  }
}
