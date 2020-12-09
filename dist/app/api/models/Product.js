"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Store_1 = require("./Store");
const Schema = mongoose_1.default.Schema;
var Store = mongoose_1.default.model('store', Store_1.StoreSchema);
exports.ProductSchema = new Schema({
    store_id: { type: Schema.Types.ObjectId, ref: "Store", required: 'El storeid es requerido' },
    qualification: { type: Number, default: null },
    description: { type: String, required: 'La description es requerido' },
    price: { type: Number, required: 'El precio es requerido' },
    minimun_order: { type: Number, required: 'la orden minima es requerido' },
    delivery_time: { type: Number, default: null },
    deleted_at: { type: Boolean, default: false },
    type: { type: String, required: 'El tipo es requerido' },
    oferta: { type: Boolean, default: null },
    off: { type: Number, default: null },
    state: { type: String, required: 'El estado es requerido' },
    picture: { type: String, required: 'La imagen es requerido' },
}, { versionKey: false });
