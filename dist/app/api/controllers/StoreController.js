"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const responseServices_1 = require("../responses/responseServices");
const StoreService_1 = __importDefault(require("../services/StoreService"));
const TstoreService_1 = __importDefault(require("../services/TstoreService"));
const CategoryStore_1 = __importDefault(require("../services/CategoryStore"));
class StoreController {
    constructor() {
        this.store_service = new StoreService_1.default();
        this.tstore_service = new TstoreService_1.default();
        this.categoryStore = new CategoryStore_1.default();
    }
    create_store(req, res) {
        var data = req.body;
        // this check whether all the filds were send through the erquest or not
        if (req.body.description &&
            req.body.telephone &&
            req.body.atention_days &&
            req.body.atention_open &&
            req.body.atention_close &&
            req.body.type &&
            req.body.picture &&
            req.body.delivery_time &&
            req.body.address &&
            req.body.category) {
            const store_params = {
                description: req.body.description,
                atention_days: req.body.atention_days,
                atention_open: req.body.atention_open,
                atention_close: req.body.atention_close,
                telephone: req.body.telephone,
                type: req.body.type,
                delivery_time: req.body.delivery_time,
                address: req.body.address,
                category: req.body.category,
            };
            this.store_service.createStore(store_params, (err, store_data) => {
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
            responseServices_1.insufficientParameters(res);
        }
    }
    get_store(req, res) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.store_service.filterStore(store_filter, (err, store_data) => {
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
    //servicio para obtener los tipos de stores con imagenes
    get_type_store(res) {
        this.tstore_service.gett_store((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    find_storebyType(req, res) {
        if (req.params.type) {
            const store_filter = { type: req.params.type };
            this.store_service.filterStoremore(store_filter, (err, store_data) => {
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
    find_storebyCategory(req, res) {
        var queryorder = null;
        var store_filter = null;
        if (req.params.ordenarPor === 'Calificacion') {
            queryorder = { rating: -1 };
        }
        if (req.params.ordenarPor === 'Tiempo Entrega') {
            queryorder = { delivery_time: 1 };
        }
        if (req.params.ordenarPor === 'Precio Envío') {
            queryorder = { costo_envio: 1 };
        }
        if (req.params.category === 'null') {
            store_filter = {};
            console.log(req.params.category);
        }
        else {
            store_filter = { category: req.params.category };
        }
        this.store_service.filterByOrder(store_filter, queryorder, (err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    get_stores(res) {
        this.store_service.getStore((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    //obtener todas las categorias de las tiendas
    get_category_stores(res) {
        this.categoryStore.getCategory((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    update_store(req, res) {
        if ((req.params.id && req.body.description) ||
            req.body.atention_open ||
            req.body.type ||
            req.body.telephone ||
            req.body.atention_days ||
            req.body.atention_close ||
            req.body.deleted_at ||
            req.body.picture ||
            req.body.delivery_time ||
            req.body.rating ||
            req.body.costo_envio ||
            req.body.delivery_time ||
            req.body.address ||
            req.body.category) {
            const store_filter = { _id: req.params.id };
            this.store_service.filterStore(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        description: req.body.description
                            ? req.body.description
                            : store_data.description,
                        telephone: req.body.telephone
                            ? req.body.telephone
                            : store_data.telephone,
                        atention_days: req.body.atention_days
                            ? req.body.atention_days
                            : store_data.atention_days,
                        atention_open: req.body.atention_open
                            ? req.body.atention_open
                            : store_data.atention_open,
                        deleted_at: req.body.deleted_at
                            ? req.body.deleted_at
                            : store_data.deleted_at,
                        atention_close: req.body.atention_close
                            ? req.body.atention_close
                            : store_data.atention_close,
                        type: req.body.type ? req.body.type : store_data.type,
                        picture: req.body.picture ? req.body.picture : store_data.picture,
                        rating: req.body.rating ? req.body.rating : store_data.rating,
                        costo_envio: req.body.costo_envio
                            ? req.body.costo_envio
                            : store_data.costo_envio,
                        delivery_time: req.body.delivery_time
                            ? req.body.delivery_time
                            : store_data.delivery_time,
                        address: req.body.address ? req.body.address : store_data.address,
                        category: req.body.category
                            ? req.body.category
                            : store_data.category,
                    };
                    this.store_service.updateStore(store_params, (err) => {
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
    delete_store(req, res) {
        if (req.params.id) {
            this.store_service.deleteStore(req.params.id, (err, delete_details) => {
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
exports.StoreController = StoreController;
