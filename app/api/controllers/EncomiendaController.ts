
import mongoose from "mongoose";
import { Encomienda } from '../interfaces/interfaces';
import { insufficientParameters, mongoError, successResponse, failureResponse, sms_update, sms_create, sms_get, sms_notfound, sms_delet } from '../responses/responseServices';
import { Request, Response } from 'express';
import EncomiendaService from '../services/EncomiendaService';
import { usuariosConectados } from '../../../sockets/sockets';

import e = require('express');


export class EncomiendaController{

    private encomienda_service: EncomiendaService = new EncomiendaService();
    public create_encomienda(req: Request, res: Response) {

        var data=(req.body);
        // this check whether all the filds were send through the erquest or not
        if (req.body.user_id && req.body.movil && req.body.addrestart&&
            req.body.addresend &&
            req.body.description &&
            req.body.cost||req.body.state) {
            const store_params: Encomienda = {
                user_id:req.body.user_id,
                addrestart:req.body.addrestart,
                addresend: req.body.addresend,
                description: req.body.description,
                movil: req.body.movil,
                cost: req.body.cost,
                state:req.body.state
                
            };
            this.encomienda_service.createEncomienda(store_params, (err: any, store_data: Encomienda) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_create, store_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            res.json(data)
        }
    }

    public get_encomienda(req: Request, res: Response) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.encomienda_service.filterEncomienda(store_filter, (err: any, store_data: Encomienda) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public get_encomiendaByState(req: Request, res: Response) {
        if (req.params.state) {
            const store_filter = { state: req.params.state };
            this.encomienda_service.filterEncomienda(store_filter, (err: any, store_data: Encomienda) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    


    public find_storebyUser(req: Request, res: Response) {
        if (req.params.iduser) {
            const store_filter = { user_id: req.params.iduser };
            this.encomienda_service.filterEncomienda(store_filter, (err: any, store_data: Encomienda) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public get_all_encomienda( res: Response) {
        
            
            this.encomienda_service.getEncomienda((err: any, store_data: Encomienda) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        
    }

    public update_encomienda(req: Request, res: Response) {
        if (req.params.id &&
            req.body.user_id || req.body.movil || req.body.addrestart||
            req.body.addresend ||
            req.body.description ||
            req.body.cost) {
            const store_filter = { _id: req.params.id };
            this.encomienda_service.filterEncomienda(store_filter, (err: any, store_data: Encomienda) => {
                if (err) {
                    mongoError(err, res);
                } else if (store_data) {
                    const store_params: Encomienda = {
                        _id: req.params.id,
                        user_id: req.body.user_id ?req.body.user_id: store_data.user_id,
                        addresend: req.body.addresend ? req.body.addresend : store_data.addresend,
                        addrestart: req.body.addrestart ? req.body.addrestart : store_data.addrestart,
                        movil: req.body.movil?req.body.movil: store_data.movil,
                        description: req.body.description?req.body.description: store_data.description,
                        cost: req.body.cost?req.body.cost: store_data.cost,
                        
                    };
                    this.encomienda_service.updateEncomienda(store_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse(sms_update, null, res);
                        }
                    });
                } else {
                    failureResponse(sms_notfound, null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public update_encomiendaState(req: Request, res: Response) {
        if (req.params.state&&req.params.id) {
            const store_filter = { _id: req.params.id };
            this.encomienda_service.filterEncomienda(store_filter, (err: any, store_data: Encomienda) => {
                if (err) {
                    mongoError(err, res);
                } else if (store_data) {
                    const store_params: Encomienda = {
                        _id:req.params.id,
                        user_id:store_data.user_id,
                        addresend:store_data.addresend,
                        addrestart:store_data.addrestart,
                        movil:store_data.movil,
                        description:store_data.description,
                        cost:store_data.cost,
                        state:req.params.state
                    };
                    this.encomienda_service.updateEncomienda(store_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse(sms_update, null, res);
                        }
                    });
                } else {
                    failureResponse(sms_notfound, null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_encomienda(req: Request, res: Response) {
        if (req.params.id) {
            this.encomienda_service.deleteEncomienda(req.params.id, (err: any, delete_details:any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse(sms_delet, null, res);
                } else {
                    failureResponse(sms_notfound, null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
} 