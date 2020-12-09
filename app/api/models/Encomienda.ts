import mongoose from "mongoose";
import { UserSchema } from './User';
const Schema = mongoose.Schema;
var User=mongoose.model('users',UserSchema);
export const EncomiendaSchema = new Schema({
    
    user_id:{type: Schema.Types.ObjectId,ref:"User", required:'El  userid es requerido'},
    addrestart: {type:String,required:'La direccion inicial es requerido'},
    addresend:{type:String,required:'La direccion final  es requerido'},
    movil:{type:String,required:'El movil es requerido'},
    description:{type:String,required:'La descripcion es requerido'},
    cost:{type:Number,required:'El costo es requerido'},
    state:{type:String,default:"pendiente"}, 
},{ versionKey: false });