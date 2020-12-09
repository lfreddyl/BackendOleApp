"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.UserSchema = new Schema({
    name: {
        type: String,
        required: 'El  nombre es requerido',
        uppercase: true,
    },
    lastname: {
        type: String,
        uppercase: true
    },
    email: {
        type: String,
        unique: true,
    },
    movil: {
        type: String,
        unique: true,
        index: true,
        required: 'El  numero es requerido'
    },
    city: {
        type: String,
        default: "Riobamba"
    },
    password: {
        type: String,
        required: 'El  password es requerido'
    },
    address: {
        type: Array
    },
    type: {
        type: String
    },
    picture: {
        type: String,
        default: null
    },
    deleted_at: {
        default: false,
        type: String
    }
}, { versionKey: false });
