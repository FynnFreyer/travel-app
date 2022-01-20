const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
})

function sendVerificationMail(toAddress, verificationToken) {
    transport.sendMail({
        from: `"Travel App" <${process.env.SMTP_USER}>`,
        to: toAddress,
        subject: 'Please verify your email address',
        html: `<p>Click <a href="https://htw-berlin-webtech-freyer-abdelwadoud.netlify.app/api/users/${verificationToken}">here</a> to verify your account</p>`
    })
}

module.exports = sendVerificationMail
