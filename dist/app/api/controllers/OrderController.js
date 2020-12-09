"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const responseServices_1 = require("../responses/responseServices");
const OrderService_1 = __importDefault(require("../services/OrderService"));
const ProductService_1 = __importDefault(require("../services/ProductService"));
//db.orders.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{$and:[{"_id" : "5f85d60f6bcd122df08a93d2"}]}},{$project:{"_id":1,"state":1,"description":1,"name":"$user.name","lastname":"$user.lastname","movil":"$user.movil"}}])
//db.orders.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{"_id" :ObjectId('5f85d60f6bcd122df08a93d2')}},{$project:{"_id":1,"state":1,"description":1,"name":"$user.name","lastname":"$user.lastname","movil":"$user.movil"}}])
//aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{"_id" :ObjectId('5f85d60f6bcd122df08a93d2')}},{$project:{"_id":1,"state":1,"description":1,"totalcost":1,"description":1,"name":"$user.name","lastname":"$user.lastname","movil":"$user.movil","address":"$user.address"}}])
class OrderController {
    constructor() {
        this.order_service = new OrderService_1.default();
        this.product_service = new ProductService_1.default();
    }
    create_Order(req, res) {
        var data = (req.body);
        // this check whether all the filds were send through the erquest or not
        if (req.body.user_id && req.body.date && req.body.state &&
            req.body.products &&
            req.body.totalcost || req.body.description || req.body.delivery_time || req.body.movil || req.body.address) {
            const store_params = {
                user_id: req.body.user_id,
                state: req.body.state,
                products: req.body.products,
                description: req.body.description,
                date: req.body.date,
                totalcost: req.body.totalcost,
                delivery_time: req.body.delivery_time,
                movil: req.body.movil,
                address: req.body.address,
            };
            this.order_service.createOrder(store_params, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_create, store_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            res.json(data);
        }
    }
    get_Order(req, res) {
        if (req.params.id) {
            const order_filter = { _id: req.params.id };
            this.order_service.filterOrder(order_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    //consulta desde Administracion de Ordenes por Id CON INFORMACION DE USERS
    get_OrderByIdOrderUser(req, res) {
        if (req.params.id) {
            const idstore = req.params.id;
            const order_filter = { '_id': mongoose_1.default.Types.ObjectId(idstore) };
            const queryagregate = [{ $lookup: { from: "users", localField: "user_id", foreignField: "_id", as: "user" } }, { $unwind: "$user" }, { $match: order_filter }, { $project: { "_id": 1, "state": 1, "description": 1, "totalcost": 1, "name": "$user.name", "lastname": "$user.lastname", "movil": "$user.movil", "address": "$user.address" } }];
            this.order_service.filterByUserByOrder(queryagregate, (err, result) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                if (result) {
                    responseServices_1.successResponse('encontrado', result, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    //consulta desde Administracion de Productos de Ordenes
    get_ProductsOrder(req, res) {
        if (req.params.id) {
            const order_filter = { _id: req.params.id };
            this.order_service.filterOrder(order_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    var products = this.product_service.getProductByIdOrder({ _id: { $in: store_data.products } }, (err, pro) => {
                        if (err) {
                            responseServices_1.mongoError(err, res);
                        }
                        else {
                            responseServices_1.successResponse(responseServices_1.sms_get, pro, res);
                        }
                    });
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    //consulta desde Administracion de Ordenes por estado
    find_OrderbyState(req, res) {
        if (req.params.state) {
            const order_filter = { state: req.params.state };
            const queryorder = { date: -1 };
            this.order_service.filterByOrder(order_filter, queryorder, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    //CONSULTA DE ORDENES DE USUARIO
    find_OrderbyUser(req, res) {
        if (req.params.iduser) {
            const order_filter = { user_id: req.params.iduser };
            const queryorder = { date: -1 };
            this.order_service.filterByOrder(order_filter, queryorder, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    //CONSULTA DE ORDENES DE USUARIO POR ESTADO
    find_OrderbyUserState(req, res) {
        if (req.params.iduser && req.params.state) {
            const order_filter = { 'user_id': mongoose_1.default.Types.ObjectId(req.params.iduser), state: req.params.state };
            const queryorder = { date: -1 };
            this.order_service.filterByOrder(order_filter, queryorder, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_all_Order(res) {
        this.order_service.getOrder((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    update_Order(req, res) {
        if (req.params.id &&
            req.body.user_id || req.body.date || req.body.state ||
            req.body.products ||
            req.body.totalcost || req.body.description || req.body.delivery_time || req.body.deleted_at || req.body.address || req.body.movil) {
            const order_filter = { _id: req.params.id };
            this.order_service.filterOrder(order_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        user_id: req.body.user_id ? req.body.user_id : store_data.user_id,
                        date: req.body.date ? req.body.date : store_data.date,
                        state: req.body.state ? req.body.state : store_data.state,
                        products: req.body.products ? req.body.products : store_data.products,
                        description: req.body.description ? req.body.description : store_data.description,
                        totalcost: req.body.totalcost ? req.body.totalcost : store_data.totalcost,
                        delivery_time: req.body.delivery_time ? req.body.delivery_time : store_data.delivery_time,
                        deleted_at: req.body.deleted_at ? req.body.deleted_at : store_data.deleted_at,
                        movil: req.body.movil ? req.body.movil : store_data.movil,
                        address: req.body.address ? req.body.address : store_data.address,
                    };
                    this.order_service.updateOrder(store_params, (err) => {
                        if (err) {
                            responseServices_1.mongoError(err, res);
                        }
                        else {
                            responseServices_1.successResponse(responseServices_1.sms_update, null, res);
                        }
                    });
                }
                else {
                    responseServices_1.failureResponse(responseServices_1.sms_notfound, null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    delete_Order(req, res) {
        if (req.params.id) {
            this.order_service.deleteOrder(req.params.id, (err, delete_details) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    responseServices_1.successResponse(responseServices_1.sms_delet, null, res);
                }
                else {
                    responseServices_1.failureResponse(responseServices_1.sms_notfound, null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
}
exports.OrderController = OrderController;
