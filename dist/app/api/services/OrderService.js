"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../models/Order");
const mongoose_1 = __importDefault(require("mongoose"));
const order = mongoose_1.default.model('orders', Order_1.OrderSchema);
class orderservice {
    createOrder(order_params, callback) {
        const _session = new order(order_params);
        _session.save(callback);
    }
    getOrder(callback) {
        order.find({}, callback);
    }
    filterByOrder(query, query2, callback) {
        order.find(query, callback).sort(query2);
    }
    filterByUserByOrder(query, callback) {
        //  order.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{query}}])
        order.aggregate(query).exec(callback);
    }
    filterOrder(query, callback) {
        order.findOne(query, callback);
    }
    updateOrder(order_params, callback) {
        const query = { _id: order_params._id };
        order.findOneAndUpdate(query, order_params, callback);
    }
    deleteOrder(_id, callback) {
        const query = { _id: _id };
        order.deleteOne(query, callback);
    }
}
exports.default = orderservice;
