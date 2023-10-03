const express = require("express")
const router = express.Router()
const { homepage,
    employeeSignup,
    employeesignin,
    employeeSignOut,
    currentEmployee,
    employeeForget,
    employeeForgetLink,
    employeeResetPassword,
    employeeUpdate,
    employeeAvatarUpdate,
    employeeCreateInternship,
    employeeSingleReadInternship,
    employeeReadInternship } = require("../controllers/employeeControllers")
const { isAuthenticated } = require("../middlewares/auth")

// get route
router.get("/", homepage)
// post student/signup 
router.post("/signup", employeeSignup)
// post student/signin
router.post("/signin", employeesignin)
// post route /student
router.post("/details", isAuthenticated, currentEmployee)
// post student/signout
router.get("/signout", isAuthenticated, employeeSignOut)
// post student/forget
router.post("/forget", employeeForget)
// get /student/forget/link/:id
router.post("/forget/link/:id", employeeForgetLink)
// post /student/resetpassword route
router.post("/resetpassword", isAuthenticated, employeeResetPassword)
// post /student/update/:studentId route
router.post("/update/:id", isAuthenticated, employeeUpdate)
// post /student/avatar/:Id route
router.post("/logo/:id", isAuthenticated, employeeAvatarUpdate)

 //----------------------------INTERNSHIPS ROUTES----------------------------

// post /employee/internship/create route
router.post("/internship/create", isAuthenticated, employeeCreateInternship)
// post /employee/internship/read route for reading all the internship
router.post("/internship/read", isAuthenticated, employeeReadInternship)
// post /employee/internship/read/:id route only for reading a single internship data
router.post("/internship/read/:id", isAuthenticated, employeeSingleReadInternship)






module.exports = router