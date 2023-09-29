require("dotenv").config({ path: "./.env" })
const express = require("express")
const app = express()




//mongoDb connection
require("./models/database").connectDatabase()



//logger
const logger = require("morgan")
app.use(logger("tiny"))

//body parser

app.use(express.json())
app.use(express.urlencoded({extended:false}))




// Routes
app.use('/', require("./routes/index.Routes"))






// error handling
const ErrorHandler = require("./utils/errorHandler")
const { generatedErrors } = require("./middlewares/errors")


app.all("*", (req, res, next) => {
    next(new ErrorHandler(`PAGE NOT FOUND ${req.url}`, 404))
})
app.use(generatedErrors)




app.listen(process.env.Port, console.log(`server is running on ${process.env.Port}`))