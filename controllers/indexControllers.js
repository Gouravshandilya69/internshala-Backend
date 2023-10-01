const { catchAsyncErr } = require("../middlewares/catchAsyncErr")
const student = require("../models/studentModel")
const ErrorHandler = require("../utils/errorHandler")
const { sendtoken } = require("../utils/sendToken")
const { sendmail } = require("../utils/nodemailer")

exports.homepage = catchAsyncErr(async (req, res, next) => {

    res.json({ message: "secure homepage!" })


})

// current user details 
exports.currentUser = catchAsyncErr(async (req, res, next) => {
    const Student = await student.findById(req.id)

    res.json({ Student })


})
//sign up route controller
exports.studentsignup = catchAsyncErr(async (req, res, next) => {
    const Student = await new student(req.body).save()
    sendtoken(Student, 201, res)
    // res.status(201).json(Student)

})

//sign in route controller
exports.studentsignin = catchAsyncErr(async (req, res, next) => {
    const foundStudent = await student.findOne({ email: req.body.email }).select("+password").exec()
    if (!foundStudent) return next(new ErrorHandler("User Not Found", 404))


    const isMatch = foundStudent.comparepassword(req.body.password)
    if (!isMatch) return next(new ErrorHandler("wrong Credentials", 500))
    sendtoken(foundStudent, 200, res)

    // res.json(foundStudent)
})


//sign out route controller
exports.studentsignout = catchAsyncErr(async (req, res, next) => {
    res.clearCookie("token")
    res.json({ message: "successfully signout" })


})

//forget password route controller
exports.studentForget = catchAsyncErr(async (req, res, next) => {

    const Student = await student.findOne({ email: req.body.email }).exec()

    if (!Student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        )


    const url = `${req.protocol}://${req.get("host")}/student/forget/link/${Student._id}`


    sendmail(req, res, next, url)
    Student.resetPasswordToken = "1"
    await Student.save()
    res.json({ Student, url })


})

//password change controller
exports.studentforgetlink = catchAsyncErr(async (req, res, next) => {

    const Student = await student.findById({ _id: req.params.id }).exec()

    if (!Student)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        )

    if (Student.resetPasswordToken == "1") {
        Student.resetPasswordToken = "0"
        Student.password = req.body.password
    } else {
        return next(
            new ErrorHandler("invalid reset password link", 404)
        )
    }
    await Student.save()


    res.status(200).json({
        message: "password has been successfully changed"
    })

})


//reset password controller
exports.studentresetpassword = catchAsyncErr(async (req, res, next) => {

    const Student = await student.findById(req.id).exec()



    Student.password = req.body.password

    await Student.save()


    sendtoken(Student, 201, res)

})