"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../models/Store");
const mongoose_1 = __importDefault(require("mongoose"));
const store = mongoose_1.default.model('stores', Store_1.StoreSchema);
class storeservice {
    createStore(store_params, callback) {
        const _session = new store(store_params);
        _session.save(callback);
    }
    getStore(callback) {
        store.find({}, callback);
    }
    filterByOrder(query, query2, callback) {
        store.find(query, callback).sort(query2);
    }
    filterStore(query, callback) {
        store.findOne(query, callback);
    }
    filterStoremore(query, callback) {
        store.find(query, callback);
    }
    updateStore(store_params, callback) {
        const query = { _id: store_params._id };
        store.findOneAndUpdate(query, store_params, callback);
    }
    deleteStore(_id, callback) {
        const query = { _id: _id };
        store.deleteOne(query, callback);
    }
}
exports.default = storeservice;
