"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const responseServices_1 = require("../responses/responseServices");
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    constructor() {
        this.user_service = new UserService_1.default();
    }
    create_user(req, res) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.name && req.body.type &&
            req.body.movil &&
            req.body.password) {
            //Comprobar si el numero ya esta registrado
            const user_filter = { movil: req.body.movil };
            this.user_service.filterUser(user_filter, (err, user_exits) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    if (user_exits === null) {
                        const user_params = {
                            name: req.body.name,
                            lastname: req.body.lastname,
                            movil: req.body.movil,
                            type: req.body.type,
                            password: req.body.password,
                        };
                        this.user_service.createUser(user_params, (err, user_data) => {
                            if (err) {
                                responseServices_1.mongoError(err, res);
                            }
                            else {
                                responseServices_1.successResponse('create user successfull', user_data, res);
                            }
                        });
                    }
                    else {
                        responseServices_1.failureResponse('El numero ingresado ya se encuentra registrado', null, res);
                    }
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            responseServices_1.insufficientParameters(res);
        }
    }
    get_user(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse('get user successfull', user_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    find_userbymovil(req, res) {
        if (req.params.id) {
            const user_filter = { movil: req.body.movil };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    responseServices_1.successResponse('get user successfull', user_data, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    get_users(res) {
        this.user_service.getUser((err, user_data) => {
            if (err) {
                responseServices_1.mongoError(err, res);
            }
            else {
                responseServices_1.successResponse('get user successfull', user_data, res);
            }
        });
    }
    update_user(req, res) {
        if (req.params.id &&
            req.body.name || req.body.lastname || req.body.type || req.body.email ||
            req.body.movil || req.body.password || req.body.address || req.body.picture || req.body.lastname || req.body.city) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (user_data) {
                    const user_params = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : user_data.name,
                        email: req.body.email ? req.body.email : user_data.email,
                        movil: req.body.movil ? req.body.movil : user_data.movil,
                        lastname: req.body.lastname ? req.body.lastname : user_data.lastname,
                        deleted_at: req.body.deleted_at ? req.body.deleted_at : user_data.deleted_at,
                        picture: req.body.picture ? req.body.picture : user_data.picture,
                        password: req.body.password ? req.body.password : user_data.password,
                        type: req.body.type ? req.body.type : user_data.type,
                        city: req.body.city ? req.body.city : user_data.city,
                        address: req.body.address ? req.body.address : user_data.address,
                    };
                    this.user_service.updateUser(user_params, (err) => {
                        if (err) {
                            responseServices_1.mongoError(err, res);
                        }
                        else {
                            responseServices_1.successResponse('update user successfull', null, res);
                        }
                    });
                }
                else {
                    responseServices_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    delete_user(req, res) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err, delete_details) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    responseServices_1.successResponse('delete user successfull', null, res);
                }
                else {
                    responseServices_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
    login(req, res) {
        if (req.body.movilcorreo && req.body.password) {
            const user_filter = { movil: req.body.movilcorreo,
                password: req.body.password };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    responseServices_1.mongoError(err, res);
                }
                else {
                    if (user_data !== null) {
                        responseServices_1.successResponse('login successfull', user_data, res);
                    }
                    else {
                        responseServices_1.failureResponse('invalid user', null, res);
                        //LOGIN POR CORREO Y PASWORD
                        /* this.user_service.filterUser(user_filter2, (err: any, user_data:any) => {
                             if (err) {
                                 mongoError(err, res);
                             } else {
                                 if(user_data!==null){
                                     successResponse('login successfull', user_data, res);
                                 }
                                 else{
                                     failureResponse('credenciales invalidas', null, res);
                                 }
                             }
                         });*/
                    }
                }
            });
        }
        else {
            responseServices_1.insufficientParameters(res);
        }
    }
}
exports.UserController = UserController;
