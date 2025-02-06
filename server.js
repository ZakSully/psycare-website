const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files

// Email configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

// Handle form submissions
app.post('/api/submit-form', async (req, res) => {
    try {
        const { email, formType, recaptchaToken } = req.body;

        // Verify reCAPTCHA
        const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`);
        const recaptchaData = await recaptchaResponse.json();

        if (!recaptchaData.success) {
            return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
        }

        // Send email
        await transporter.sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: process.env.MAIL_TO_ADDRESS,
            subject: `New ${formType} Submission`,
            html: `
                <h2>New Form Submission</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Form Type:</strong> ${formType}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            `
        });

        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ success: false, message: 'Failed to submit form' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 