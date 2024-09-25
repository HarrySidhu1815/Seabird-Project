import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, text }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'learningwithseabird@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'learningwithseabird@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error
    }
}
