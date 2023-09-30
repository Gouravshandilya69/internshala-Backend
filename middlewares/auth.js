// authentication

const jwt = require("jsonwebtoken")
const errorHandler = require("../utils/errorHandler")
const { catchAsyncErr } = require("./catchAsyncErr")




exports.isAuthenticated = catchAsyncErr(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new errorHandler("please login", 401))
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.id = id
    next()
})