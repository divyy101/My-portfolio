import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  try {
    // 1. Send the email to yourself with the message details
    const mailOptionsToMe = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // 2. Send the 'Thank you' email to the user who contacted you
    const mailOptionsToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting me, ${name}!`,
      text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nDivyansh`,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToMe);
    await transporter.sendMail(mailOptionsToUser);

    res.status(200).json({ success: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please check server configuration.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
