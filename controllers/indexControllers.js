const { catchAsyncErr } = require("../middlewares/catchAsyncErr")
const student = require("../models/studentModel")
const ErrorHandler = require("../utils/errorHandler")
const { sendtoken } = require("../utils/sendToken")


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