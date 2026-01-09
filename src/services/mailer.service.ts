import nodemailer from 'nodemailer';
import { env } from '@/config/env';
import { ContactInput } from '@/utils/validation';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  family: 4,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
} as nodemailer.TransportOptions);

export const sendContactEmail = async (data: ContactInput) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        :root {
          --bg-color: #f4f4f5;
          --card-bg: #ffffff;
          --text-color: #18181b;
          --border-color: #e4e4e7;
          --accent-color: #6366f1;
          --secondary-text: #71717a;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg-color: #18181b;
            --card-bg: #27272a;
            --text-color: #f4f4f5;
            --border-color: #3f3f46;
            --accent-color: #818cf8;
            --secondary-text: #a1a1aa;
          }
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: var(--bg-color);
          color: var(--text-color);
          margin: 0;
          padding: 20px;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: var(--card-bg);
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--border-color);
        }
        .header {
          margin-bottom: 24px;
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 16px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: var(--accent-color);
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-size: 14px;
          font-weight: 600;
          color: var(--secondary-text);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .value {
          font-size: 16px;
          background-color: var(--bg-color);
          padding: 12px;
          border-radius: 8px;
          white-space: pre-wrap;
          border: 1px solid var(--border-color);
        }
        .footer {
          margin-top: 32px;
          text-align: center;
          font-size: 12px;
          color: var(--secondary-text);
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
        }
      </style>
    </head>
    <body style="background-color: #f4f4f5; color: #18181b;">
      <div class="container" style="background-color: #ffffff; border-radius: 12px; padding: 32px;">
        <div class="header">
          <h1 style="color: #6366f1;">New Project Inquiry</h1>
        </div>
        
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${data.name}</div>
        </div>

        <div class="field">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none;">${data.email}</a></div>
        </div>

        ${
          data.phone
            ? `
        <div class="field">
          <div class="label">Phone</div>
          <div class="value">${data.phone}</div>
        </div>`
            : ''
        }

        ${
          data.budget
            ? `
        <div class="field">
          <div class="label">Budget</div>
          <div class="value">$${data.budget}</div>
        </div>`
            : ''
        }

        <div class="field">
          <div class="label">Message</div>
          <div class="value">${data.message}</div>
        </div>

        <div class="footer">
          Sent via Portfolio Contact Form
        </div>
      </div>
    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: `Portfolio <${env.EMAIL_FROM}>`,
    to: env.EMAIL_TO,
    subject: `New Inquiry from ${data.name}`,
    html,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nBudget: ${data.budget || 'N/A'}\nMessage: ${data.message}`,
  });

  return info;
};
