import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const TstoreSchema = new Schema({
    
    description:{type:String, },
    img: {type:String,},
    
},{ versionKey: false });