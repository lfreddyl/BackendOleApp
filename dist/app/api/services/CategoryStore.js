"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryStore_1 = require("../models/CategoryStore");
const mongoose_1 = __importDefault(require("mongoose"));
const category = mongoose_1.default.model('category_stores', CategoryStore_1.CategoryStoreSchema);
class TproductService {
    createCategory(categoryparams, callback) {
        const _session = new category(categoryparams);
        _session.save(callback);
    }
    getCategory(callback) {
        category.find({}, callback);
    }
    filterCategory(query, callback) {
        category.findOne(query, callback);
    }
    updateCategory(categoryparams, callback) {
        const query = { _id: categoryparams._id };
        category.findOneAndUpdate(query, categoryparams, callback);
    }
    deleteCategory(_id, callback) {
        const query = { _id: _id };
        category.deleteOne(query, callback);
    }
}
exports.default = TproductService;
