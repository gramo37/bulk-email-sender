import nodemailer from "nodemailer";

export async function sendMail(
    to: string,
    subject: string,
    html: string
) {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log("Something went wrong while sending mail", error);
        return false;
    }
}
