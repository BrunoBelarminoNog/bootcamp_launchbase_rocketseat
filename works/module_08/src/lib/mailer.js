const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "69c9551e6f358c",
        pass: "ada13f562217dc"
    }
});
