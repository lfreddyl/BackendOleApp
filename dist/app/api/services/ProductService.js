"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const mongoose_1 = __importDefault(require("mongoose"));
const product = mongoose_1.default.model('products', Product_1.ProductSchema);
class encomiendaservice {
    createProduct(product_params, callback) {
        const _session = new product(product_params);
        _session.save(callback);
    }
    getProduct(callback) {
        product.find({}, callback);
    }
    filterProduct(query, callback) {
        product.findOne(query, callback);
    }
    filterProductOrder(query, query2, callback) {
        product.find(query, callback).sort(query2);
    }
    updateProduct(product_params, callback) {
        const query = { _id: product_params._id };
        product.findOneAndUpdate(query, product_params, callback);
    }
    deleteProduct(_id, callback) {
        const query = { _id: _id };
        product.deleteOne(query, callback);
    }
    getProductByIdOrder(query, callback) {
        product.find(query, callback);
    }
}
exports.default = encomiendaservice;
