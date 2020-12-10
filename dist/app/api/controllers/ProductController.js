"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const responseServices_1 = require("../responses/responseServices");
const ProductService_1 = __importDefault(require("../services/ProductService"));
const TproductService_1 = __importDefault(require("../services/TproductService"));
class ProductController {
    constructor() {
        this.Product_service = new ProductService_1.default();
        this.tProduct_service = new TproductService_1.default();
    }
    create_Product(req, res) {
        var data = req.body;
        // this check whether all the filds were send through the erquest or not
        if ((req.body.description &&
            req.body.price &&
            req.body.store_id &&
            req.body.state &&
            req.body.description &&
            req.body.type) ||
            req.body.qualification ||
            req.body.delivery_time ||
            req.body.picture) {
            const store_params = {
                description: req.body.description,
                store_id: req.body.store_id,
                state: req.body.state,
                minimun_order: req.body.minimun_order,
                price: req.body.price,
                delivery_time: req.body.delivery_time,
                qualification: req.body.qualification,
                picture: req.body.picture,
                type: req.body.type,
            };
            this.Product_service.createProduct(store_params, (err, store_data) => {
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
    get_Product(req, res) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.Product_service.filterProduct(store_filter, (err, store_data) => {
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
    find_ProductName(req, res) {
        if (req.params.name) {
            const name = req.params.name;
            const store_filter = { description: { $regex: name, $options: "i" }, store_id: req.params.id_store };
            const queryorder = { price: 1 };
            this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    if (store_data.length < 1) {
                        const store_filter = { type: { $regex: name, $options: "i" }, store_id: req.params.id_store };
                        this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
                            if (err) {
                                responseServices_1.mongoError(err, res);
                            }
                            else {
                                if (store_data.length < 1) {
                                    const store_filter = { titulo: { $regex: name, $options: "i" }, store_id: req.params.id_store };
                                    this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
                                        if (err) {
                                            responseServices_1.mongoError(err, res);
                                        }
                                        else {
                                            responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                                        }
                                    });
                                }
                                else {
                                    responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                                }
                            }
                        });
                    }
                    else {
                        responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
                    }
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_all_Product(res) {
        this.Product_service.getProduct((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    //servicios para litar los tipos de comida con imagenes
    get_all_Type_Product(res) {
        this.tProduct_service.getTproduct((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    find_ProductLowerCost(req, res) {
        const store_filter = {};
        const queryorder = { price: 1 };
        this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    find_ProductHigherCost(req, res) {
        const store_filter = {};
        const queryorder = { price: -1 };
        this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    find_ProductByStore(req, res) {
        if (req.params.idstore) {
            const store_filter = { store_id: req.params.idstore };
            const queryorder = { price: 1 };
            this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
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
    find_ProductByOferta(req, res) {
        const store_filter = { oferta: true, store_id: req.params.id_store };
        const queryorder = { price: 1 };
        this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    find_ProductByOff(req, res) {
        const store_filter = { off: { $gt: 0, $lte: 100 } };
        const queryorder = { price: 1 };
        this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    update_Product(req, res) {
        if ((req.params.id && req.body.description) ||
            req.body.price ||
            req.body.store_id ||
            req.body.state ||
            req.body.description ||
            req.body.deleted_at ||
            req.body.qualification ||
            req.body.delivery_time ||
            req.body.type ||
            req.body.oferta ||
            req.body.off) {
            const store_filter = { _id: req.params.id };
            this.Product_service.filterProduct(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        store_id: req.body.store_id
                            ? req.body.store_id
                            : store_data.store_id,
                        description: req.body.description
                            ? req.body.description
                            : store_data.description,
                        qualification: req.body.qualification
                            ? req.body.qualification
                            : store_data.qualification,
                        price: req.body.price ? req.body.price : store_data.price,
                        minimun_order: req.body.minimun_order
                            ? req.body.minimun_order
                            : store_data.minimun_order,
                        delivery_time: req.body.delivery_time
                            ? req.body.delivery_time
                            : store_data.delivery_time,
                        deleted_at: req.body.deleted_at
                            ? req.body.deleted_at
                            : store_data.deleted_at,
                        state: req.body.state ? req.body.state : store_data.state,
                        type: req.body.type ? req.body.type : store_data.type,
                        oferta: req.body.oferta ? req.body.oferta : store_data.oferta,
                        off: req.body.off ? req.body.off : store_data.off,
                    };
                    this.Product_service.updateProduct(store_params, (err) => {
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
    find_ProductByType(req, res) {
        if (req.params.type) {
            const store_filter = { type: req.params.type };
            const queryorder = { price: 1 };
            this.Product_service.filterProductOrder(store_filter, queryorder, (err, store_data) => {
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
    delete_Product(req, res) {
        if (req.params.id) {
            this.Product_service.deleteProduct(req.params.id, (err, delete_details) => {
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
exports.ProductController = ProductController;
