import mongoose from "mongoose";
import { StoreSchema } from './Store';
const Schema = mongoose.Schema;
var Store=mongoose.model('store',StoreSchema)
export const ProductSchema = new Schema({
    
    store_id:{type: Schema.Types.ObjectId,ref: "Store",required:'El storeid es requerido'},
    qualification: {type:Number, default:null},
    description: {type:String,required:'La description es requerido'},
    price:{type:Number,required:'El precio es requerido'},
    minimun_order:{type:Number,required:'la orden minima es requerido'},
    delivery_time:{type:Number,default:null},
    deleted_at:{type:Boolean,default:false},
    type:{type:String,required:'El tipo es requerido'},
    oferta:{type:Boolean,default:null},
    off:{type:Number,default:null},
    state:{type:String,required:'El estado es requerido'},
    picture:{type:String,required:'La imagen es requerido'},
},{ versionKey: false });