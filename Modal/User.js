import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
   },
   email: {
      type :String ,
      required:[true,'Email is Required'],
      unique:true
   },
   phone: {
    type: String,
    required: true,
    unique:true
   },
   profileImage : {
      type : String
   },
   password: {
    type: String,
    required: true,
   },
   address:{
      type:String,
   },
   forgotPasswordtoken: {
      type: String,
      required: true,
   }
   ,
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})

const user = mongoose.model('users',userSchema);

export default user;