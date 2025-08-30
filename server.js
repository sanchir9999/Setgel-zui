// server.js
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Body parser
app.use(express.json());

// Мэйл илгээх тохиргоо
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'monhbatsanchir1@gmail.com', // Таны мэйл хаяг
        pass: 'Suren@4321',  // Таны мэйлын нууц үг
    },
});

// Мэйл илгээх API
app.post('/send-mail', (req, res) => {
    const { email, subject, htmlContent } = req.body;

    const mailOptions = {
        from: 'monhbatsanchir1@gmail.com', // Таны имэйл хаяг
        to: email, // Хүлээн авагчийн имэйл хаяг
        subject: subject || 'Тайлан',  // Тухайн хариулттай тайлангийн гарчиг
        html: htmlContent || '<h1>Таны судалгааны тайлан</h1>', // HTML агуулга
    };

    // Мэйл илгээх
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error occurred: ' + error.message);
        }
        res.status(200).send('Message sent: ' + info.messageId);
    });
});

// Серверийг эхлүүлэх
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
