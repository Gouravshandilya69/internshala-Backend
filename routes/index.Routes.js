const express = require("express")
const router = express.Router()
const { homepage,studentsignup,studentsignin,studentsignout } = require("../controllers/indexControllers")

// get route
router.get("/",homepage)
// post student/signup 
router.post("/student/signup",studentsignup)
// post student/signin
router.post("/student/signin",studentsignin)
// post student/signout
router.get("/student/signout",studentsignout)



module.exports = router