import mongoose, { Schema } from "mongoose";

const bookTableSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date : {
        type : Date,
        required : true
    },
    tableNumber : {
        type : Number
    },
    time : {
        type : String,
        required : true
    },
    preferences : {
        type : String,
        required : false
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    }
});


const bookTable = mongoose.model('bookTables',bookTableSchema);

export default bookTable;