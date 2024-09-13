import * as nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.PASSWORD,
    },
});

export const emailServices = {
    sendEmail: async (to: string, subject: string, text: string, html: string) => {
        const options = {
            from: process.env.EMAIL_HOST_USER,
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        try {
            const info = await transporter.sendMail(options);
            return info;
        } catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}