import sgMail from '@sendgrid/mail'
import html from './msg.js'
import dotenv from 'dotenv'
dotenv.config()
const sendEmail = async (to, name, verificationToken, email, origin) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to,
        from: process.env.EMAIL,
        subject: 'Email Verification',
        text: `hello ${name} By clicking on the following link, you are confirming your email address. `,
        html: html(verificationToken, email, origin),
    }
    const info = await sgMail.send(msg)
}

export default sendEmail