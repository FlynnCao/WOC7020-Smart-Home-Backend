// API Server
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/abc', (req, res) => {
    res.send('Hello ABC!')
})


// Email Server
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        port: 587, // port for secure SMTP
        auth: {
            user: "flynncao2008@gmail.com",
            pass: "tefzhkltnwcmkhet"
        },

    });

    // Verify email
    transporter.verify().then(console.log).catch(console.error);


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "westwoodcao@hotmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
