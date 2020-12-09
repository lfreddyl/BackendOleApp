
import mongoose from "mongoose";
import {User} from '../interfaces/interfaces';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../responses/responseServices';
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { usuariosConectados } from '../../../sockets/sockets';


export class UserController{

    private user_service: UserService = new UserService();
    public create_user(req: Request, res: Response) {

        
        // this check whether all the filds were send through the erquest or not
        if (req.body.name && req.body.type&&
            req.body.movil &&
            req.body.password) {

            //Comprobar si el numero ya esta registrado
            const user_filter = { movil: req.body.movil };
            this.user_service.filterUser(user_filter, (err: any, user_exits:any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if(user_exits===null){
                        const user_params: User = {
                            name:req.body.name,
                            lastname:req.body.lastname,
                            movil: req.body.movil,
                            type: req.body.type,
                            password: req.body.password,
                        };
                        this.user_service.createUser(user_params, (err: any, user_data: User) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                successResponse('create user successfull', user_data, res);
                            }
                        });
                    }
                    else{
                        failureResponse('El numero ingresado ya se encuentra registrado', null, res);
                    }
                }
            });
          
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: User) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public find_userbymovil(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { movil: req.body.movil };
            this.user_service.filterUser(user_filter, (err: any, user_data: User) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    
    public get_users( res: Response) {
        
            
            this.user_service.getUser((err: any, user_data: User) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', user_data, res);
                }
            });
        
    }

    public update_user(req: Request, res: Response) {
        if (req.params.id &&
            req.body.name || req.body.lastname || req.body.type|| req.body.email ||
            req.body.movil || req.body.password|| req.body.address|| req.body.picture|| req.body.lastname|| req.body.city) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter, (err: any, user_data: User) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    const user_params: User = {
                        _id: req.params.id,
                        name: req.body.name ?req.body.name: user_data.name,
                        email: req.body.email ? req.body.email : user_data.email,
                        movil: req.body.movil ? req.body.movil : user_data.movil,
                        lastname: req.body.lastname ? req.body.lastname : user_data.lastname,
                        deleted_at: req.body.deleted_at ? req.body.deleted_at : user_data.deleted_at,
                        picture: req.body.picture ? req.body.picture : user_data.picture,
                        password: req.body.password?req.body.password: user_data.password,
                        type: req.body.type?req.body.type: user_data.type,
                        city: req.body.city?req.body.city: user_data.city,
                        address: req.body.address?req.body.address: user_data.address,
                    };
                    this.user_service.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update user successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id, (err: any, delete_details:any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public login(req: Request, res: Response) {
        if (req.body.movilcorreo&&req.body.password) {
            const user_filter = {movil:req.body.movilcorreo,
                                password:req.body.password};
        
            this.user_service.filterUser(user_filter, (err: any, user_data:any) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if(user_data!==null){
                        successResponse('login successfull', user_data, res);
                    }
                    else{
                        failureResponse('invalid user', null, res);
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
        } else {
            insufficientParameters(res);
        }
    }

    


}