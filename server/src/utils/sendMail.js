import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

const generateCode = () => {
    return crypto.randomInt(100000, 999999).toString();
};
const sendRegisterationMail = (email, username) => {
    const code = generateCode();
    const html = `<div >
            <h1>Registeration Code</h1>
            <h2>Hi ${username}!</h2>
            <p>
                We noticed a new registeration from your email. Kindly fill the
                code below to complete your registeration.
            </p>
            <p>
                ${code}
            </p>
        </div>`;
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Email Verification Code",
        html: html,
    };

    try {
        transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
        return code;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to send verification email: ${error.message}`);
    }
};

export { sendRegisterationMail };
