const express = require("express")
const router = express.Router()
const { homepage,studentsignup,studentsignin,studentsignout,currentUser,studentForget } = require("../controllers/indexControllers")
const { isAuthenticated } = require("../middlewares/auth")

// get route
router.get("/",isAuthenticated, homepage)
// post route /student
router.post("/student",isAuthenticated, currentUser)
// post student/signup 
router.post("/student/signup",studentsignup)
// post student/signin
router.post("/student/signin",studentsignin)
// post student/signout
router.get("/student/signout", isAuthenticated,studentsignout)
// post student/forget
router.post("/student/forget",studentForget)



module.exports = router