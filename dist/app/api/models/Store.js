"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.StoreSchema = new Schema({
    description: { type: String, required: 'La descripcion es requerido' },
    telephone: { type: String, required: 'El telefono es requerido' },
    atention_days: { type: Array, required: 'El dia de atencion es requerido' },
    atention_open: { type: Number, required: 'La hora es requerido' },
    atention_close: { type: Number, required: 'la hora es requerido' },
    type: { type: String, uppercase: true, required: 'El tipo es requerido' },
    deleted_at: { type: Boolean, default: false },
    picture: { type: String, required: 'la imagen es requerido' },
    rating: { type: Number, default: 0 },
    delivery_time: { type: Number, default: 0, required: 'El tiempo de entrega es requerida es requerido' },
    costo_envio: { type: Number, default: 1.00 },
    address: { type: String },
    categoria: { type: Array, required: 'La categoria es requerida' }
}, { versionKey: false });
