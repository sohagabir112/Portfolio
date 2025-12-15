const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const EXCEL_FILE = 'contact_submissions.xlsx';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Create Excel file with headers if it doesn't exist
async function initializeExcelFile() {
    try {
        // Check if file exists
        if (!fs.existsSync(EXCEL_FILE)) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Contact Submissions');

            // Add headers
            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Name', key: 'name', width: 20 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Message', key: 'message', width: 50 },
                { header: 'Date Submitted', key: 'date', width: 20 },
                { header: 'IP Address', key: 'ip', width: 15 }
            ];

            // Style the header row
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF3498DB' }
            };

            await workbook.xlsx.writeFile(EXCEL_FILE);
            console.log('✅ Excel file initialized successfully');
        }
    } catch (error) {
        console.error('❌ Error initializing Excel file:', error);
    }
}

// Handle contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const ip = req.ip || req.connection.remoteAddress;
        const date = new Date().toLocaleString();

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Read existing Excel file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(EXCEL_FILE);
        const worksheet = workbook.getWorksheet('Contact Submissions');

        // Get the next ID
        const lastRow = worksheet.lastRow ? worksheet.lastRow.number : 1;
        const nextId = lastRow;

        // Add new row
        worksheet.addRow({
            id: nextId,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            date: date,
            ip: ip
        });

        // Save the file
        await workbook.xlsx.writeFile(EXCEL_FILE);

        console.log(`📝 New contact form submission from ${name} (${email})`);
        console.log(`🔗 SharePoint Link: https://northernunivbd-my.sharepoint.com/:x:/g/personal/sohag_41230301656_nub_ac_bd/IQA_tVlLsrCPRZuVSunfOTCmAZWpRiChb4Cbsu3sFuJXUfY?e=CmCTCu`);

        res.json({
            success: true,
            message: 'Thank you for your message! I\'ll get back to you soon.',
            sharepointLink: 'https://northernunivbd-my.sharepoint.com/:x:/g/personal/sohag_41230301656_nub_ac_bd/IQA_tVlLsrCPRZuVSunfOTCmAZWpRiChb4Cbsu3sFuJXUfY?e=CmCTCu'
        });

    } catch (error) {
        console.error('❌ Error saving contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.'
        });
    }
});

// API endpoint to download Excel file (optional, for admin access)
app.get('/api/download-excel', (req, res) => {
    // Simple authentication - you should implement proper auth in production
    const authToken = req.query.token;
    if (authToken !== 'admin123') { // Change this to a secure token
        return res.status(403).json({ error: 'Unauthorized' });
    }

    res.download(EXCEL_FILE, 'contact_submissions.xlsx', (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).json({ error: 'Error downloading file' });
        }
    });
});

// API endpoint to get submission count
app.get('/api/submissions/count', async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(EXCEL_FILE);
        const worksheet = workbook.getWorksheet('Contact Submissions');

        const count = worksheet.rowCount - 1; // Subtract header row
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error getting count' });
    }
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Excel file: ${EXCEL_FILE}`);

    // Initialize Excel file
    await initializeExcelFile();

    console.log('\n📧 Contact form submissions will be saved to Excel');
    console.log('📥 To download submissions: GET /api/download-excel?token=admin123');
    console.log('📊 To get count: GET /api/submissions/count');
});
