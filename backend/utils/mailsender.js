import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    auth: {
        user: 'us59908@gmail.com',
        pass: 'evgv sbcp ynow fecj'
    }
});

export const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'us59908@gmail.com',
        // from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);  
        });
    });
};
