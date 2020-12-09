"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
const Product_1 = require("./Product");
const Schema = mongoose_1.default.Schema;
var User = mongoose_1.default.model('users', User_1.UserSchema);
var Products = mongoose_1.default.model('products', Product_1.ProductSchema);
exports.OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: 'El  store_id es requerido' },
    delivery_time: { type: Number, default: null },
    date: { type: Date, required: 'La fecha es requerido' },
    state: { type: String, required: 'El estado es requerido' },
    deleted_at: { type: Boolean, default: false },
    description: { type: String, default: "" },
    totalcost: { type: Number, required: 'El costo es requerido' },
    products: { type: Array, required: 'El  store_id es requerido' },
    address: { type: String, required: 'La direccion es requerido' },
    movil: { type: String, required: 'El telefono es requerido' },
}, { versionKey: false });
