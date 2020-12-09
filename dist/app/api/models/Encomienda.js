"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomiendaSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
const Schema = mongoose_1.default.Schema;
var User = mongoose_1.default.model('users', User_1.UserSchema);
exports.EncomiendaSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: 'El  userid es requerido' },
    addrestart: { type: String, required: 'La direccion inicial es requerido' },
    addresend: { type: String, required: 'La direccion final  es requerido' },
    movil: { type: String, required: 'El movil es requerido' },
    description: { type: String, required: 'La descripcion es requerido' },
    cost: { type: Number, required: 'El costo es requerido' },
    state: { type: String, default: "pendiente" },
}, { versionKey: false });
