const { catchAsyncErr } = require("../middlewares/catchAsyncErr")
const student = require("../models/studentModel")


exports.homepage =catchAsyncErr( async (req, res, next) => {
   
    res.json({ message: "Madarchod homepage" })
        
   
})

exports.studentsignup = catchAsyncErr( async (req, res, next) => {
   const Student =  await new student(req.body).save()
        res.status(201).json(Student)
    //   console.log(Student)   
  
   
})