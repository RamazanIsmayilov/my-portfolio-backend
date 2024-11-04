const transporter = require('../config/nodemailer.config');

const sendContactMessage = (req, res) => {
    const { firstname, lastname, message } = req.body;

    if (!firstname || !lastname || !message) {
        return res.status(400).json({ error: 'Bütün sahələri doldurun!' });
    }

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com', 
        subject: 'Yeni əlaqə mesajı',
        text: `Ad: ${firstname}\nSoyad: ${lastname}\nMesaj: ${message}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Mesaj göndərilmədi.' });
        }
        res.status(200).json({ success: 'Mesajınız uğurla göndərildi!' });
    });
};

module.exports = { sendContactMessage };
