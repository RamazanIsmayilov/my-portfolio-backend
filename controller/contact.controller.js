const transporter = require('../config/nodemailer.config');

const sendContactMessage = (req, res) => {
    const {email, firstname, lastname, message } = req.body;

    if (!firstname || !lastname || !message) {
        return res.status(400).json({ error: 'Fill in all fields!' });
    }

    const mailOptions = {
        from: email,
        to: 'ramazandev2024@gmail.com', 
        subject: `Message from ${firstname}`,
        text: `Firstname: ${firstname}\nLastname: ${lastname}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Message not sent.' });
        }
        res.status(200).json({ success: 'Your message has been successfully sent!' });
    });
};

module.exports = { sendContactMessage };
