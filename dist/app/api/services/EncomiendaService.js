"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Encomienda_1 = require("../models/Encomienda");
const mongoose_1 = __importDefault(require("mongoose"));
const encomienda = mongoose_1.default.model('encomiendas', Encomienda_1.EncomiendaSchema);
class encomiendaservice {
    createEncomienda(encomienda_params, callback) {
        const _session = new encomienda(encomienda_params);
        _session.save(callback);
    }
    getEncomienda(callback) {
        encomienda.find({}, callback);
    }
    filterEncomienda(query, callback) {
        encomienda.findOne(query, callback);
    }
    updateEncomienda(encomienda_params, callback) {
        const query = { _id: encomienda_params._id };
        encomienda.findOneAndUpdate(query, encomienda_params, callback);
    }
    deleteEncomienda(_id, callback) {
        const query = { _id: _id };
        encomienda.deleteOne(query, callback);
    }
}
exports.default = encomiendaservice;
