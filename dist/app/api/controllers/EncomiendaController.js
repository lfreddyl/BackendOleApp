"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncomiendaController = void 0;
const responseServices_1 = require("../responses/responseServices");
const EncomiendaService_1 = __importDefault(require("../services/EncomiendaService"));
class EncomiendaController {
    constructor() {
        this.encomienda_service = new EncomiendaService_1.default();
    }
    create_encomienda(req, res) {
        var data = (req.body);
        // this check whether all the filds were send through the erquest or not
        if (req.body.user_id && req.body.movil && req.body.addrestart &&
            req.body.addresend &&
            req.body.description &&
            req.body.cost || req.body.state) {
            const store_params = {
                user_id: req.body.user_id,
                addrestart: req.body.addrestart,
                addresend: req.body.addresend,
                description: req.body.description,
                movil: req.body.movil,
                cost: req.body.cost,
                state: req.body.state
            };
            this.encomienda_service.createEncomienda(store_params, (err, store_data) => {
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
    get_encomienda(req, res) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.encomienda_service.filterEncomienda(store_filter, (err, store_data) => {
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
    get_encomiendaByState(req, res) {
        if (req.params.state) {
            const store_filter = { state: req.params.state };
            this.encomienda_service.filterEncomienda(store_filter, (err, store_data) => {
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
    find_storebyUser(req, res) {
        if (req.params.iduser) {
            const store_filter = { user_id: req.params.iduser };
            this.encomienda_service.filterEncomienda(store_filter, (err, store_data) => {
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
    get_all_encomienda(res) {
        this.encomienda_service.getEncomienda((err, store_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse(responseServices_1.sms_get, store_data, res);
            }
        });
    }
    update_encomienda(req, res) {
        if (req.params.id &&
            req.body.user_id || req.body.movil || req.body.addrestart ||
            req.body.addresend ||
            req.body.description ||
            req.body.cost) {
            const store_filter = { _id: req.params.id };
            this.encomienda_service.filterEncomienda(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        user_id: req.body.user_id ? req.body.user_id : store_data.user_id,
                        addresend: req.body.addresend ? req.body.addresend : store_data.addresend,
                        addrestart: req.body.addrestart ? req.body.addrestart : store_data.addrestart,
                        movil: req.body.movil ? req.body.movil : store_data.movil,
                        description: req.body.description ? req.body.description : store_data.description,
                        cost: req.body.cost ? req.body.cost : store_data.cost,
                    };
                    this.encomienda_service.updateEncomienda(store_params, (err) => {
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
    update_encomiendaState(req, res) {
        if (req.params.state && req.params.id) {
            const store_filter = { _id: req.params.id };
            this.encomienda_service.filterEncomienda(store_filter, (err, store_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (store_data) {
                    const store_params = {
                        _id: req.params.id,
                        user_id: store_data.user_id,
                        addresend: store_data.addresend,
                        addrestart: store_data.addrestart,
                        movil: store_data.movil,
                        description: store_data.description,
                        cost: store_data.cost,
                        state: req.params.state
                    };
                    this.encomienda_service.updateEncomienda(store_params, (err) => {
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
    delete_encomienda(req, res) {
        if (req.params.id) {
            this.encomienda_service.deleteEncomienda(req.params.id, (err, delete_details) => {
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
exports.EncomiendaController = EncomiendaController;
