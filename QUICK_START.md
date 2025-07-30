# Quick Start Guide

## 🚀 Get Your Email Service Running in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Email (Optional for Testing)
The service will run in test mode by default. For real emails, edit `.env`:
```bash
cp .env.example .env
# Edit .env with your Gmail credentials
```

### Step 3: Start Both Servers
```bash
# Terminal 1: Start backend (email API)
node server.js

# Terminal 2: Start frontend server
node serve-frontend.js
```

### Step 4: Open the App
Open your browser and go to:
**http://localhost:8080**

## 🧪 Testing the Email Service

1. Enter any email address in the app
2. Click "Test Email" button
3. Check the browser console for debug logs
4. In test mode, you'll see: "Email sent successfully (test mode)"

## 🐛 Troubleshooting

### "Cannot connect to email service" error:
- Make sure backend is running: `node server.js`
- Check if port 3000 is available
- Open browser console (F12) for detailed error logs

### Backend not starting:
- Run: `npm install` first
- Check if port 3000 is already in use

### Real email not sending:
- Set up Gmail App Password (see main README)
- Update `.env` with real credentials
- Remove test credentials

## 📊 Service Status
- Backend: http://localhost:3000/health
- Frontend: http://localhost:8080
- Test endpoint: http://localhost:3000/test

## 🔧 Quick Commands
```bash
# Check backend health
curl http://localhost:3000/health

# Test email API directly
curl -X POST http://localhost:3000/send-email \
  -H "Content-Type: application/json" \
  -d '{"to_email":"test@example.com","product_name":"Test Product"}'
```