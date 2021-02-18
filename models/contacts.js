const mongoose=require("mongoose")
const{ObjectId}=mongoose.Schema.Types

const ContactSchema=mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    phone:{
        type:String,
        required:true
    },
    type:{
        type:String
    }
})

module.exports=mongoose.model("Contacts",ContactSchema)