const express = require("express")
const router = express.Router()
const { resume  ,addeducation,editeducation,deleteeducation } = require("../controllers/resumeControllers")

const { isAuthenticated } = require("../middlewares/auth")

// get route
router.get("/",isAuthenticated, resume)
// post route /add-education
router.post("/add_education",isAuthenticated, addeducation)
// post route /add-education/update
router.post("/add_education/update/:eduid",isAuthenticated, editeducation)
// post route /add-education/delete
router.post("/add-education/delete/:eduid",isAuthenticated, deleteeducation)

module.exports = router