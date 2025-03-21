import nodemailer from 'nodemailer';
import { type ContactMessage } from '@shared/schema';

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact.beta.zbenyasystems@gmail.com',
    pass: 'rqlhxudokrhveugj', // App password
  },
});

// Function to send contact form email
export async function sendContactEmail(message: ContactMessage): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"BetaPreZbenya Website" <contact.beta.zbenyasystems@gmail.com>`,
      to: 'contact.beta.zbenyasystems@gmail.com',
      replyTo: message.email,
      subject: `New Contact Form Submission: ${message.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>Subject:</strong> ${message.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.message.replace(/\n/g, '<br>')}</p>
        <p><strong>Submitted at:</strong> ${new Date(message.createdAt).toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Contact email sent successfully for: ${message.email}`);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
}