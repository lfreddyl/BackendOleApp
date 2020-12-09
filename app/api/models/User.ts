import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
   
    name: {
        type: String,
        required:'El  nombre es requerido',
        uppercase:true,
    },
   lastname: {
        type: String,
        uppercase:true
    },
    email: {
        type: String,
        unique: true,
        
    },
    movil: {
        type: String,
        unique: true,
        index:true,
        required:'El  numero es requerido'
    },
    city: {
        type:String,
        default:"Riobamba"
       
    },
    password: {
        type: String,
        required:'El  password es requerido'
    },
    address: {
        type: Array
    },
    type:{
        type:String
    },
    picture:{
        type:String,
        default:null
    },
    deleted_at:{
        default:false,
        type:String
    }
},{ versionKey: false });