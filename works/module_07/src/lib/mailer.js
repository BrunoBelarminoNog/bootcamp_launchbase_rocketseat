const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "43146cd6ccbff0",
        pass: "71e492d2dd518a"
    }
});
