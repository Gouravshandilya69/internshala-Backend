exports.generatedErrors = (err, req, res, next) => {
    const statuscode = err.statuscode || 500

    // user exist err
if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key ")){
    err.message="Student With This Email Address Already Exist"
}


// default err
    res.status(statuscode).json({
        message: err.message,
        errName: err.name,
        // stack:err.stack
    })
}