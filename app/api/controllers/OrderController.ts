
import mongoose from "mongoose";
import { Order, Product } from '../interfaces/interfaces';
import { insufficientParameters, mongoError, successResponse, failureResponse, sms_update, sms_create, sms_get, sms_notfound, sms_delet } from '../responses/responseServices';
import { Request, Response } from 'express';
import OrderService from '../services/OrderService';
import ProductService from '../services/ProductService';
import { usuariosConectados } from '../../../sockets/sockets';
import e = require('express');

//db.orders.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{$and:[{"_id" : "5f85d60f6bcd122df08a93d2"}]}},{$project:{"_id":1,"state":1,"description":1,"name":"$user.name","lastname":"$user.lastname","movil":"$user.movil"}}])
//db.orders.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{"_id" :ObjectId('5f85d60f6bcd122df08a93d2')}},{$project:{"_id":1,"state":1,"description":1,"name":"$user.name","lastname":"$user.lastname","movil":"$user.movil"}}])
//aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{"_id" :ObjectId('5f85d60f6bcd122df08a93d2')}},{$project:{"_id":1,"state":1,"description":1,"totalcost":1,"description":1,"name":"$user.name","lastname":"$user.lastname","movil":"$user.movil","address":"$user.address"}}])
export class OrderController{

    private order_service: OrderService = new OrderService();
    private product_service: ProductService = new ProductService();
    public create_Order(req: Request, res: Response) {

        var data=(req.body);
        // this check whether all the filds were send through the erquest or not
        if (req.body.user_id && req.body.date && req.body.state&&
            req.body.products &&          
            req.body.totalcost|| req.body.description|| req.body.delivery_time|| req.body.movil|| req.body.address) {
            const store_params: Order= {
                user_id:req.body.user_id,
                state:req.body.state,
                products: req.body.products,
                description: req.body.description,
                date: req.body.date,
                totalcost: req.body.totalcost,
                delivery_time: req.body.delivery_time,
                movil: req.body.movil,
                address: req.body.address,

            };
            this.order_service.createOrder(store_params, (err: any, store_data: Order) => {
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

    public get_Order(req: Request, res: Response) {
        if (req.params.id) {
            const order_filter = { _id: req.params.id };
            this.order_service.filterOrder(order_filter, (err: any, store_data: Order) => {
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
    //consulta desde Administracion de Ordenes por Id CON INFORMACION DE USERS
    public get_OrderByIdOrderUser(req: Request, res: Response) {
        if (req.params.id) {
            const idstore=req.params.id 
            const order_filter = { '_id': mongoose.Types.ObjectId(idstore)};
            const queryagregate=[{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:order_filter},{$project:{"_id":1,"state":1,"description":1,"totalcost":1,"name":"$user.name","lastname":"$user.lastname","movil":"$user.movil","address":"$user.address"}}]
            this.order_service.filterByUserByOrder(queryagregate, (err:any, result:any)=>{
                if (err) {
                    mongoError(err, res);
                }
                if (result) {
                    successResponse('encontrado', result, res);
                }
          });
        } else {
            insufficientParameters(res);
        }
    }
    //consulta desde Administracion de Productos de Ordenes
    public get_ProductsOrder(req: Request, res: Response) {
         
        if (req.params.id) {
            const order_filter = { _id: req.params.id };
            this.order_service.filterOrder(order_filter, (err: any, store_data: Order) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    var products=this.product_service.getProductByIdOrder({_id: { $in : store_data.products} } ,(err: any, pro: Product)=>{
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse(sms_get, pro, res);
                        }
                    }) 
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    //consulta desde Administracion de Ordenes por estado

    public find_OrderbyState(req: Request, res: Response) {
        if (req.params.state) {
            const order_filter = { state: req.params.state };
            const queryorder={date: -1}
            this.order_service.filterByOrder(order_filter,queryorder, (err: any, store_data: Order) => {
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
    //CONSULTA DE ORDENES DE USUARIO
    public find_OrderbyUser(req: Request, res: Response) {
        if (req.params.iduser) {
            const order_filter = { user_id: req.params.iduser };
            const queryorder={date: -1}
            this.order_service.filterByOrder(order_filter,queryorder, (err: any, store_data: Order) => {
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
    //CONSULTA DE ORDENES DE USUARIO POR ESTADO
    
    public find_OrderbyUserState(req: Request, res: Response) { 
        if (req.params.iduser&&req.params.state) {
            const order_filter = { 'user_id': mongoose.Types.ObjectId(req.params.iduser),state:req.params.state };
            const queryorder={date: -1}
            this.order_service.filterByOrder(order_filter,queryorder, (err: any, store_data: Order) => {
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
   
    public get_all_Order( res: Response) {
            this.order_service.getOrder((err: any, store_data: Order) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
        
    }

    public update_Order(req: Request, res: Response) {
        if (req.params.id &&
            req.body.user_id || req.body.date || req.body.state||
            req.body.products ||          
            req.body.totalcost|| req.body.description|| req.body.delivery_time|| req.body.deleted_at|| req.body.address|| req.body.movil) {
            const order_filter = { _id: req.params.id };
            this.order_service.filterOrder(order_filter, (err: any, store_data: Order) => {
                if (err) {
                    mongoError(err, res);
                } else if (store_data) {
                    const store_params: Order= {
                        _id: req.params.id,
                        user_id: req.body.user_id ?req.body.user_id: store_data.user_id,
                        date: req.body.date ? req.body.date : store_data.date,
                        state: req.body.state ? req.body.state : store_data.state,
                        products: req.body.products?req.body.products: store_data.products,
                        description: req.body.description?req.body.description: store_data.description,
                        totalcost: req.body.totalcost?req.body.totalcost: store_data.totalcost,
                        delivery_time: req.body.delivery_time?req.body.delivery_time: store_data.delivery_time,
                        deleted_at: req.body.deleted_at?req.body.deleted_at: store_data.deleted_at,
                        movil: req.body.movil?req.body.movil: store_data.movil,
                        address: req.body.address?req.body.address: store_data.address,

                        
                    };
                    this.order_service.updateOrder(store_params, (err: any) => {
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

    public delete_Order(req: Request, res: Response) {
        if (req.params.id) {
            this.order_service.deleteOrder(req.params.id, (err: any, delete_details:any) => {
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