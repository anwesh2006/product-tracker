# ProductTracker

A real-time product availability monitor that notifies you when products are back in stock. Now featuring a custom Node.js backend with Nodemailer for reliable email notifications.

## Features

- 🔍 Real-time product availability monitoring
- 📧 Email notifications when products are back in stock
- 📊 Monitoring statistics and uptime tracking
- 🎨 Modern, responsive web interface
- 🚀 Custom Node.js backend with reliable email delivery

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd product-tracker
```

### 2. Backend Setup

#### Install Dependencies
```bash
npm install
```

#### Configure Email Service
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your email configuration:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
PORT=3000
```

#### For Gmail Setup:
1. Enable 2-factor authentication on your Google account
2. Generate an app-specific password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASSWORD` (not your regular password)

#### Start the Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

### 3. Frontend Setup

Open `index.html` in your browser. The frontend is configured to connect to the backend at `http://localhost:3000`.

For production, update the `EMAIL_API_URL` in `index.html` to your deployed backend URL.

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /test` - Test endpoint to verify service is running
- `POST /send-email` - Send email notification

### Email API Usage
```javascript
fetch('http://localhost:3000/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to_email: 'user@example.com',
    to_name: 'User Name',
    product_name: 'Product Name',
    price: '$99.99',
    product_url: 'https://example.com/product',
    current_time: new Date().toLocaleString()
  })
});
```

## Deployment

### Backend Deployment
You can deploy the backend to any Node.js hosting service:
- Heroku
- Vercel
- Railway
- DigitalOcean App Platform
- AWS EC2

Remember to:
1. Set environment variables on your hosting platform
2. Update the `EMAIL_API_URL` in `index.html` to your deployed backend URL

### Frontend Deployment
The frontend is a static HTML file that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Email Service Options

The backend supports multiple email services:
- **Gmail** (recommended)
- **Outlook/Hotmail**
- **Yahoo Mail**
- **Custom SMTP servers**

For custom SMTP, add these variables to your `.env`:
```env
EMAIL_SERVICE=custom
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Troubleshooting

### Common Issues:

1. **"Failed to send email" error**
   - Check your email credentials in `.env`
   - Ensure 2FA is enabled and you're using an app-specific password
   - Verify the email service is supported

2. **Backend connection failed**
   - Ensure the backend server is running
   - Check the `EMAIL_API_URL` in `index.html`
   - Verify CORS is properly configured

3. **Gmail authentication issues**
   - Enable 2-factor authentication
   - Use app-specific password, not your regular password
   - Check if "Less secure app access" needs to be enabled (not recommended)

## Contributing

Feel free to submit issues and enhancement requests!
