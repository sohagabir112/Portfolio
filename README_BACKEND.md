# Backend Server for Contact Form

This backend server handles contact form submissions and stores them in an Excel file.

## Features

- ✅ **Express.js Server** - Fast and lightweight Node.js server
- ✅ **Excel Storage** - Saves all form submissions to `contact_submissions.xlsx`
- ✅ **CORS Support** - Allows cross-origin requests from your portfolio
- ✅ **Input Validation** - Validates form data before saving
- ✅ **Error Handling** - Proper error responses and logging
- ✅ **Admin API** - Download Excel file and get submission count

## Installation

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### POST `/api/contact`
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to work with you!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Please enter a valid email address"
}
```

### GET `/api/download-excel?token=admin123`
Download the Excel file with all submissions.

**Security Note:** Change the token in `server.js` for production use.

### GET `/api/submissions/count`
Get the total number of submissions.

**Response:**
```json
{
  "count": 25
}
```

## Excel File Structure

The server creates `contact_submissions.xlsx` with the following columns:

| ID | Name | Email | Message | Date Submitted | IP Address |
|----|------|-------|---------|----------------|------------|
| 1  | John Doe | john@example.com | Hello... | 12/15/2025, 2:30:15 PM | 192.168.1.1 |

## Configuration

### Port Configuration
Change the port in `server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change 3001 to your desired port
```

### Security Token
Update the download token for better security:
```javascript
if (authToken !== 'your-secure-token-here') {
    return res.status(403).json({ error: 'Unauthorized' });
}
```

## Deployment

### For Production Deployment:

1. **Environment Variables**:
   ```bash
   export PORT=3001
   export NODE_ENV=production
   ```

2. **Process Manager** (PM2):
   ```bash
   npm install -g pm2
   pm2 start server.js --name "portfolio-server"
   ```

3. **Cloud Deployment**:
   - **Railway**: Connect your GitHub repo
   - **Render**: Deploy from GitHub
   - **Vercel**: Use serverless functions
   - **Heroku**: Traditional deployment

## Troubleshooting

### Common Issues:

1. **Port Already in Use**:
   ```bash
   # Find process using port 3001
   lsof -i :3001
   # Kill the process
   kill -9 <PID>
   ```

2. **Excel File Permission Error**:
   ```bash
   # Make sure the application has write permissions
   chmod 755 .
   ```

3. **CORS Issues**:
   - Make sure the frontend is running on a different port
   - Update CORS settings in `server.js` if needed

## File Structure

```
portfolio/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── contact_submissions.xlsx # Auto-generated Excel file
├── index.html            # Your portfolio (served statically)
├── scripts/main.js       # Updated with API calls
└── README_BACKEND.md     # This documentation
```

## Security Notes

- ⚠️ **Change the download token** before production deployment
- ⚠️ **Add proper authentication** for admin endpoints
- ⚠️ **Implement rate limiting** to prevent spam
- ⚠️ **Add input sanitization** for production use
- ⚠️ **Use HTTPS** in production

## Development

To modify the server:

1. **Add new fields**: Update the Excel columns in `initializeExcelFile()`
2. **Change validation**: Modify the validation logic in the `/api/contact` endpoint
3. **Add features**: Extend the API with new endpoints as needed

## Support

For issues with the backend server:
- Check the console logs for error messages
- Verify Node.js and npm versions
- Ensure all dependencies are installed
- Check file permissions for Excel file creation
