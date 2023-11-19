const mongoose = require("mongoose");
const contactModel = require("./contactModel");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "user field is required"]
    },
    email:{
        type:String,
        required:[true, "email field is required"],
        unique:[true, "email is already registered"]

    },
    password:{
        type:String,
        required:[true, "password field is required"]
    }
},{
    timeStamps:true
})

module.exports = mongoose.model("User", UserSchema)