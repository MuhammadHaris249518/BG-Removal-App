import mongoose, { mongo } from "mongoose";
const userSchema=new mongoose.Schema({
    clerkId:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    photo:{type:String,required:true},
    firstname:{type:String,},
     lastname:{type:String},
    creditBalance:{type:String,default:5}
    
    
})
const userModel=mongoose.models.user||mongoose.model("user",userSchema)