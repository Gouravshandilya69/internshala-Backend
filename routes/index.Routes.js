const express = require("express")
const router = express.Router()
const { homepage,studentsignup } = require("../controllers/indexControllers")

// get route
router.get("/",homepage)
// post student/signup 
router.post("/student/signup",studentsignup)



module.exports = router