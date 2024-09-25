import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, text }, next) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harjobanpreet15@gmail.com',
            pass: 'ueqe rcgn sdbz lsmx',
        },
    });

    const mailOptions = {
        from: 'harjobanpreet15@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        next(error)
    }
}
