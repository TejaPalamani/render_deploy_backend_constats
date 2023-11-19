const mongoose = require("mongoose")

const contactSchema =new mongoose.Schema({
    user_id:{
        type :mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true, "constact name is required"]
    },
    email:{
        type:String,
        required:[true, "constact email is required"]
    },
    phoneNumber:{
        type:String,
        required:[true, "constact number is required"]
    }
},{
    timeStamps:true
}
)

module.exports = mongoose.model("Contact", contactSchema)