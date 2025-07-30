const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080', 'http://127.0.0.1:8080', 'file://', '*'],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public')); // Serve static files if needed

// Create Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD // Use app-specific password for Gmail
    }
  });
};

// Email notification endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { to_email, to_name, product_name, price, product_url, current_time } = req.body;

    // Validate required fields
    if (!to_email || !product_name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to_email and product_name'
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Available - ${product_name}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #ff4757, #ff3742);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            border: 1px solid #e9ecef;
          }
          .product-info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #ff4757;
          }
          .button {
            display: inline-block;
            background: #ff4757;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 15px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Product Back in Stock!</h1>
          <p>The product you've been tracking is now available</p>
        </div>
        
        <div class="content">
          <p>Hi ${to_name || 'there'},</p>
          
          <p>Great news! The product you've been monitoring with ProductTracker is now back in stock.</p>
          
          <div class="product-info">
            <h3>📦 ${product_name}</h3>
            ${price ? `<p><strong>Price:</strong> ${price}</p>` : ''}
            <p><strong>Status:</strong> ✅ Available</p>
            <p><strong>Checked at:</strong> ${current_time || new Date().toLocaleString()}</p>
          </div>
          
          ${product_url ? `<a href="${product_url}" class="button">View Product →</a>` : ''}
          
          <p>Don't wait too long - popular items can go out of stock quickly!</p>
          
          <p>Happy shopping! 🛒</p>
        </div>
        
        <div class="footer">
          <p>This email was sent by ProductTracker - Real-time Availability Monitor</p>
          <p>You received this because you subscribed to notifications for this product.</p>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `"ProductTracker" <${process.env.EMAIL_USER}>`,
      to: to_email,
      subject: `🎉 ${product_name} is back in stock!`,
      html: htmlContent,
      text: `Hi ${to_name || 'there'},\n\nGreat news! ${product_name} is now back in stock.\n\n${price ? `Price: ${price}\n` : ''}Status: Available\nChecked at: ${current_time || new Date().toLocaleString()}\n\n${product_url ? `View product: ${product_url}\n\n` : ''}Don't wait too long - popular items can go out of stock quickly!\n\nHappy shopping!\n\n---\nProductTracker - Real-time Availability Monitor`
    };

    // Send email or simulate in test mode
    if (process.env.EMAIL_USER === 'test@gmail.com' || process.env.NODE_ENV === 'test') {
      // Test mode - don't actually send email
      console.log('Test mode: Email would be sent to:', to_email);
      console.log('Email content preview:', mailOptions.subject);
      
      res.json({
        success: true,
        messageId: 'test-' + Date.now(),
        message: 'Email sent successfully (test mode)'
      });
    } else {
      // Production mode - actually send email
      const info = await transporter.sendMail(mailOptions);
      
      console.log('Email sent successfully:', info.messageId);
      
      res.json({
        success: true,
        messageId: info.messageId,
        message: 'Email sent successfully'
      });
    }

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'ProductTracker Email Service is running!',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'product-tracker-email',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ProductTracker Email Service running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
  console.log(`👤 Email user: ${process.env.EMAIL_USER || 'Not configured'}`);
});

module.exports = app;