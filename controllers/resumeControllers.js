const { catchAsyncErr } = require("../middlewares/catchAsyncErr")
const student = require("../models/studentModel")
const ErrorHandler = require("../utils/errorHandler")
const imagekit = require("../utils/imageKIt").initimagekit()
const path = require("path")
const { v4: uuidv4 } = require('uuid')


// get resumee controller
exports.resume = catchAsyncErr(async (req, res, next) => {
  const { resume } = await student.findById(req.id)
  res.json({ resume })
})

// add resume controller
exports.addeducation = catchAsyncErr(async (req, res, next) => {
  const Student = await student.findById(req.id)
  Student.resume.education.push({ ...req.body, id: uuidv4() })
  await Student.save()
  res.json({ message: "education added" })



})
//edit resumee controller
exports.editeducation = catchAsyncErr(async (req, res, next) => {
  const Student = await student.findById(req.id)
  const eduIndex = await Student.resume.education.findIndex(i=>i.id==req.params.eduid)
  
  Student.resume.education[eduIndex] = {...Student.resume.education[eduIndex],...req.body}

  await Student.save()
  res.json({ message: "education updated" })



})
//edit resumee controller
exports.deleteeducation = catchAsyncErr(async (req,res,next)=>{
  const Student = await student.findById(req.id)
  const filteredEducation = await Student.resume.education.filter(i=>i.id!==req.params.eduid)

  Student.resume.education = filteredEducation

  await Student.save()
  res.json({ message: "education deleted" })

})