import mongoose from "mongoose";
import { UserSchema } from './User';
import { ProductSchema } from './Product';
const Schema = mongoose.Schema;
var User=mongoose.model('users',UserSchema);
var Products=mongoose.model('products',ProductSchema)
export const OrderSchema = new Schema({
    user_id:{type: Schema.Types.ObjectId,ref:"User", required:'El  store_id es requerido'},
    delivery_time: {type:Number,default:null},
    date:{type:Date,required:'La fecha es requerido'},
    state:{type:String,required:'El estado es requerido'},
    deleted_at:{type:Boolean, default:false},
    description:{type:String,default:""},
    totalcost:{type:Number,required:'El costo es requerido'},
    products:{type: Array, required:'El  store_id es requerido'},
    address:{type:String,required:'La direccion es requerido'},
    movil:{type:String,required:'El telefono es requerido'},
},{ versionKey: false });