import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    
    totalPrize : {
        type:Number,
        default : 0
    },
    payementStatus : {
        type : Number,
        default : 0
    },
    foodDescription : [{
        foodTitle : {
            type : String ,
            required : true,
        },
        foodCuisine : {
            type : String ,
            required : true,
        },
        foodDish : {
            type : String ,
            required : true,
        },
        foodChoices : [{
            choice_type : {
                type:String
            },
            choice_prize : {
                type:Number
            },
         }],
        prize : {
            type : Number ,
            required : true,
        },
        Quantity:{
            type:Number,
            default : 1
        }
        
    }],
    email: {
        type :String 
     },
     phone: {
      type: String,
      required: true
     },
     orderStatus : {
        ///not_started , preparing , delivering , delivered
        type : String,
        default : "not_started",
     },
     deliveryInfo : {
        type : {
            name : {
                type : String
            },
            number:{
                type : Number
            }
        },
        default : {}
     },
     address:{
        type:String,
     },

    createdAt: {
        type: Date,
        default: Date.now, 
    }
});


const order = mongoose.model('orders',orderSchema);

export default order;