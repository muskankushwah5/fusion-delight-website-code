import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
   },
   description: {
      type :String ,
      required : true
   },
   prize: {
    type: Number,
    required: true
   },
   cuisine_type : {
    type : String
   },
   dish_type : {
    type: String
   },
   choices:[
    {
        choice_type : {
            type : String
        },
        choice_prize : {
            type : Number
        }
    }
   ],
   dishUrl: {
      type: String,
      required : false
   }
   ,
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})

const dish = mongoose.model('dishes',dishSchema);

export default dish;