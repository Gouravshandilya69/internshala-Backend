const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const employeeModel = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First name is required"],
            minLength: [4, "First name should be atleast 4 character long"]

        },
        lastname: {
            type: String,
            required: [true, "First name is required"],
            minLength: [4, "Last name should be atleast 4 character long"]

        },

        contact: {
            type: String,
            required: [true, "Contact is required"],
            maxLength: [10, "contact  should  not exceed  10"],

            minLength: [10, "contact should be atleast 10"]
        },
        
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            select: false,
            maxLength: [15, "password should not exceed more than 15 characters"],
            minLength: [6, "password should have atleast 6 characters"],
            required: [true, "Password is required"]
            // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]

        },
        resetPasswordToken: {
            type: String,
            default: "0"
        },
        organizationname: {
            type: String,
            required: [true, "organization is required"],
            minLength: [4, "First name should be atleast 4 character long"]

        },
        logo: {
            type: Object,
            default: {
                fileId: "",
                url: "https://images.unsplash.com/photo-1695802059994-006d0fb026ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
            }
        },
        internship:[
           {   type:mongoose.Schema.Types.ObjectId,
            ref:"internship"
        }
        ],
        jobs:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"jobs"
            }
        ]
        

    }, { timestamps: true })



// encrypting the password
employeeModel.pre("save", function () {

    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})



//password check
employeeModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}



//generating tokens
employeeModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const employee = mongoose.model("employee", employeeModel)

module.exports = employee