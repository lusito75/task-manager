const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'paulo@lourenco.net.au',
//     from: 'paulo@lourenco.net.au',
//     subject: 'Test email from Node using Sendgrid service',
//     text: 'Just testing, hope it gets through ... :)'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sanitysoftware@gmail.com',
        subject: 'Thanks for joining Sanity\'s Task Manager Service!',
        text: `Welcome to the app, ${name}. Let me know how you get along with it`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sanitysoftware@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Sorry to see you leave ${name}, hope to see you back soon!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}