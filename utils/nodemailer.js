const nodemailer = require("nodemailer")
const ErrorHandler = require("./errorHandler")



exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        post: 465,
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_EMAIL_PASSWORD
        }
    })

    const mailoptions = {
        from: "Gourav Shandilya <gouravshandilya48@gmail.com>",
        to: req.body.email,
        subject: "password reset link ",
        text: "do not share it with anyone",
        html: `<h1>Click below link to reset password</ht>
          <a href="${url}">Reset Password</a>
        `

    }

    transport.sendMail(mailoptions, (err, info) => {
        if (err) return next(
            new ErrorHandler(err, 500))

        console.log(info)
        
        return res.status(200).json({
            message: "email send successfully",

        })
    })
}