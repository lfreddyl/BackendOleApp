"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tproduct_1 = require("../models/Tproduct");
const mongoose_1 = __importDefault(require("mongoose"));
const t_product = mongoose_1.default.model('t_products', Tproduct_1.TproductSchema);
class TproductService {
    createTproduct(store_params, callback) {
        const _session = new t_product(store_params);
        _session.save(callback);
    }
    getTproduct(callback) {
        t_product.find({}, callback);
    }
    filterTproduct(query, callback) {
        t_product.findOne(query, callback);
    }
    updateTproduct(store_params, callback) {
        const query = { _id: store_params._id };
        t_product.findOneAndUpdate(query, store_params, callback);
    }
    deleteTproduct(_id, callback) {
        const query = { _id: _id };
        t_product.deleteOne(query, callback);
    }
}
exports.default = TproductService;
