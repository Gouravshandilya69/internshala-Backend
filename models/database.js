const mongoose = require("mongoose")

exports.connectDatabase = async()=>{
 try {
    await mongoose.connect(process.env.mongoDb_url)
    console.log("Database connected")
 } catch (error) {
    console.log("err"+ " " +error.message)
 }
}