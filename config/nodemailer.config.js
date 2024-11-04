const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ismayiloff522@gmail.com', 
        pass: 'ramazan522', 
    },
});

module.exports = transporter 