const { catchAsyncErr } = require("../middlewares/catchAsyncErr")
const employeeModel = require("../models/employeeModel")
const internshipModel = require("../models/internship[Model")
const jobsModel = require("../models/jobModel")
const ErrorHandler = require("../utils/errorHandler")
const { sendtoken } = require("../utils/sendToken")
const { sendmail } = require("../utils/nodemailer")
const imagekit = require("../utils/imageKIt").initimagekit()
const path = require("path")


exports.homepage = catchAsyncErr(async (req, res, next) => {

    res.json({ message: "secure employee homepage!" })


})
//sign up route controller
exports.employeeSignup = catchAsyncErr(async (req, res, next) => {
    const employee = await new employeeModel(req.body).save()
    sendtoken(employee, 201, res)
    // res.status(201).json(Student)

})
//sign in route controller
exports.employeesignin = catchAsyncErr(async (req, res, next) => {
    const foundEmployee = await employeeModel.findOne({ email: req.body.email }).select("+password")

    if (!foundEmployee) return next(new ErrorHandler("User Not Found", 404))


    const isMatch = foundEmployee.comparepassword(req.body.password)

    if (!isMatch) return next(new ErrorHandler("wrong Credentials", 500))
    sendtoken(foundEmployee, 200, res)

    // res.json(foundStudent)
})
// current user details 
exports.currentEmployee = catchAsyncErr(async (req, res, next) => {
    const foundEmployee = await employeeModel.findById(req.id)

    res.json({ foundEmployee })


})

//sign out route controller
exports.employeeSignOut = catchAsyncErr(async (req, res, next) => {
    res.clearCookie("token")
    res.json({ message: "successfully signout" })


})

//forget password route controller
exports.employeeForget = catchAsyncErr(async (req, res, next) => {
    const foundEmployee = await employeeModel.findOne({ email: req.body.email }).exec()
if (!foundEmployee)
        return next(
            new ErrorHandler("Employee not found with this email address", 404)
        )
const url = `${req.protocol}://${req.get(`host`)}/employee/forget/link/${foundEmployee._id}`
sendmail(req, res, next, url)
foundEmployee.resetPasswordToken = "1"
    await foundEmployee.save()
    res.json({ foundEmployee, url })


})

//password change controller
exports.employeeForgetLink = catchAsyncErr(async (req, res, next) => {

    const foundEmployee = await employeeModel.findById({ _id: req.params.id })

    if (!foundEmployee)
        return next(
            new ErrorHandler("User not found with this email address", 404)
        )

    if (foundEmployee.resetPasswordToken == "1") {
        foundEmployee.resetPasswordToken = "0"
        foundEmployee.password = req.body.password
    } else {
        return next(
            new ErrorHandler("invalid reset password link", 404)
        )
    }
    await foundEmployee.save()


    res.status(200).json({
        message: "password has been successfully changed"
    })

})


//reset password controller
exports.employeeResetPassword = catchAsyncErr(async (req, res, next) => {

    const foundEmployee = await employeeModel.findById(req.id).exec()



    foundEmployee.password = req.body.password

    await foundEmployee.save()


    sendtoken(foundEmployee, 201, res)

})


//update details controller
exports.employeeUpdate =  catchAsyncErr(async (req, res, next) => {

   await employeeModel.findByIdAndUpdate(req.params.id , req.body).exec()
     res.status(200).json({
    success:true,
    message:"employee updated successfully!",

   })

})

//upload image controller
exports.employeeAvatarUpdate = catchAsyncErr(async (req, res, next) => {
const foundEmployee = await employeeModel.findById(req.params.id)
    const file = req.files.avatar
    const newFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`

    if(foundEmployee.logo.fileId!==""){
        await imagekit.deleteFile(foundEmployee.logo.fileId)
    }
    const {fileId,url }= await imagekit.upload({
        file:file.data,
        fileName:newFileName
    })

    foundEmployee.logo = {fileId , url}
    await foundEmployee.save()
    res.status(200).json({
        success:true,
        message:"Profile uploaded successfully!",
     })
    
    
 
 })

 //----------------------------INTERNSHIPS----------------------------


 // for creating internship
 exports.employeeCreateInternship = catchAsyncErr(async (req, res, next) => {
    const employee = await employeeModel.findById(req.id)
    const internshipp = await new internshipModel(req.body)
    internshipp.employee =employee._id
    employee.internship.push(internshipp._id)
    await internshipp.save()
    await employee.save()
     res.status(201).json({success:true,internshipp})
    })

//for reading all the internships
exports.employeeReadInternship =  catchAsyncErr(async (req, res, next) => {
    const {internship} = await employeeModel.findById(req.id).populate("internship")
    if(!internship) return new ErrorHandler(" No internships found")
  res.status(200).json({success:true,internship})
    // res.status(201).json(Student)

})

//for reading a single internship
exports.employeeSingleReadInternship =  catchAsyncErr(async (req, res, next) => {
    const internship = await internshipModel.findById(req.params.id)
    if(!internship){ return new ErrorHandler("internship not found")}
    res.status(200).json({success:true,internship})

})
