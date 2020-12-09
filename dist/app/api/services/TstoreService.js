"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tstore_1 = require("../models/Tstore");
const mongoose_1 = __importDefault(require("mongoose"));
const t_store = mongoose_1.default.model('T_Stores', Tstore_1.TstoreSchema);
class t_storeservice {
    createt_store(t_store_params, callback) {
        const _session = new t_store(t_store_params);
        _session.save(callback);
    }
    gett_store(callback) {
        t_store.find({}, callback);
    }
    filtert_store(query, callback) {
        t_store.findOne(query, callback);
    }
    updatet_store(t_store_params, callback) {
        const query = { _id: t_store_params._id };
        t_store.findOneAndUpdate(query, t_store_params, callback);
    }
    deletet_store(_id, callback) {
        const query = { _id: _id };
        t_store.deleteOne(query, callback);
    }
}
exports.default = t_storeservice;
