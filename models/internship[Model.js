const mongoose = require("mongoose")



const internshipModel = new mongoose.Schema(
    {
       profile: String,
       internshipType:{
        Type:String,
        emum:["In office","Remote"]
       },

        openings: Number,
        skills:String,
        startingDate:String,
        duration:String,
        responsibility:String,
        stipend:{
           status:{ type:String,
            emum:["fixed","negotiable","performance based","unpaid"]},
            amount:Number
        },
        perks:String,
        assesments:String,
        employee:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"employee"
            }
        
       
        

    }, { timestamps: true })




const internship = mongoose.model("internship", internshipModel)

module.exports = internship