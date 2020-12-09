
import mongoose from "mongoose";
import { Product } from '../interfaces/interfaces';
import { insufficientParameters, mongoError, successResponse, failureResponse, sms_update, sms_create, sms_get, sms_notfound, sms_delet } from '../responses/responseServices';
import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import TproductService from '../services/TproductService';
import { usuariosConectados } from '../../../sockets/sockets';

import e = require('express');


export class ProductController{

    private Product_service: ProductService = new ProductService();
    private tProduct_service: TproductService = new TproductService();

    public create_Product(req: Request, res: Response) {

        var data=(req.body);
        // this check whether all the filds were send through the erquest or not
        if (req.body.description && req.body.price && req.body.store_id&&
            req.body.state &&
            req.body.description&&req.body.type||req.body.qualification||req.body.delivery_time||req.body.picture ) {
            const store_params: Product = {
                description:req.body.description,
                store_id:req.body.store_id,
                state: req.body.state,
                minimun_order: req.body.minimun_order,
                price: req.body.price,
                delivery_time:req.body.delivery_time,
                qualification:req.body.qualification,
                picture:req.body.picture,
                type:req.body.type
            };
            this.Product_service.createProduct(store_params, (err: any, store_data: Product) => {
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

    public get_Product(req: Request, res: Response) {
        if (req.params.id) {
            const store_filter = { _id: req.params.id };
            this.Product_service.filterProduct(store_filter, (err: any, store_data: Product) => {
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

    public find_ProductName(req: Request, res: Response) {
        if (req.params.name) {
            const name=req.params.name
            const store_filter = { description: { $regex: '.*' + name + '.*' }    };
            const queryorder={price: 1}
            this.Product_service.filterProductOrder(store_filter,queryorder, (err: any, store_data: Product) => {
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
    public get_all_Product( res: Response) {
        
            
        this.Product_service.getProduct((err: any, store_data: Product) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse(sms_get, store_data, res);
            }
        });
    
    }
    //servicios para litar los tipos de comida con imagenes
    public get_all_Type_Product( res: Response) {
        this.tProduct_service.getTproduct((err: any, store_data: Product) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse(sms_get, store_data, res);
            }
        });
    
    }

    public find_ProductLowerCost(req: Request, res: Response) {
            const store_filter = { };
            const queryorder={price: 1}
            this.Product_service.filterProductOrder(store_filter,queryorder, (err: any, store_data: Product) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
    }

    public find_ProductHigherCost(req: Request, res: Response) {
        const store_filter = { };
        const queryorder={price: -1}
        this.Product_service.filterProductOrder(store_filter,queryorder, (err: any, store_data: Product) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse(sms_get, store_data, res);
            }
        });
}
    
    public find_ProductByStore(req: Request, res: Response) {
        if (req.params.idstore) {
            const store_filter = { store_id: req.params.idstore };
            const queryorder={price: 1}
            this.Product_service.filterProductOrder(store_filter,queryorder, (err: any, store_data: Product) => {
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

    public find_ProductByOferta(req: Request, res: Response) {
        
            const store_filter = { oferta: true };
            const queryorder={price: 1}
            this.Product_service.filterProductOrder(store_filter,queryorder, (err: any, store_data: Product) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
     
    }
    public find_ProductByOff(req: Request, res: Response) {
        
            const store_filter = { off:{ $gt:0 , $lte: 100 } };
            const queryorder={price: 1}
            this.Product_service.filterProductOrder(store_filter,queryorder, (err: any, store_data: Product) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse(sms_get, store_data, res);
                }
            });
      
    }
  
    public update_Product(req: Request, res: Response) {
        if (req.params.id &&
            req.body.description || req.body.price || req.body.store_id||
            req.body.state ||
            req.body.description ||req.body.deleted_at||req.body.qualification||req.body.delivery_time
            ||req.body.type||req.body.oferta||req.body.off
            ) {
            const store_filter = { _id: req.params.id };
            this.Product_service.filterProduct(store_filter, (err: any, store_data: Product) => {
                if (err) {
                    mongoError(err, res);
                } else if (store_data) {
                    const store_params: Product = {
                        _id: req.params.id,
                        store_id: req.body.store_id ?req.body.store_id: store_data.store_id,
                        description: req.body.description ? req.body.description : store_data.description,
                        qualification: req.body.qualification ? req.body.qualification : store_data.qualification,
                        price: req.body.price?req.body.price: store_data.price,
                        minimun_order: req.body.minimun_order?req.body.minimun_order: store_data.minimun_order,
                        delivery_time: req.body.delivery_time?req.body.delivery_time: store_data.delivery_time,
                        deleted_at: req.body.deleted_at?req.body.deleted_at: store_data.deleted_at,
                        state: req.body.state?req.body.state: store_data.state,
                        type: req.body.type?req.body.type: store_data.type,
                        oferta: req.body.oferta?req.body.oferta: store_data.oferta,
                        off: req.body.off?req.body.off: store_data.off
                        
                    };
                    this.Product_service.updateProduct(store_params, (err: any) => {
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
    public find_ProductByType(req: Request, res: Response) {
        if (req.params.type) {
            const store_filter = { type:req.params.type };
            const queryorder={price: 1}
            this.Product_service.filterProductOrder(store_filter,queryorder, (err: any, store_data: Product) => {
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

  

    public delete_Product(req: Request, res: Response) {
        if (req.params.id) {
            this.Product_service.deleteProduct(req.params.id, (err: any, delete_details:any) => {
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