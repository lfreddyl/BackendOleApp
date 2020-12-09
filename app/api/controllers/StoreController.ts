import mongoose from "mongoose";
import { Store, Encomienda, CategoryStores } from "../interfaces/interfaces";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
  sms_update,
  sms_create,
  sms_get,
  sms_notfound,
  sms_delet,
} from "../responses/responseServices";
import { Request, Response } from "express";
import StoreService from "../services/StoreService";
import TstoreService from "../services/TstoreService";
import CategoryStore from "../services/CategoryStore";

import { usuariosConectados } from "../../../sockets/sockets";

import e = require("express");

export class StoreController {
  private store_service: StoreService = new StoreService();
  private tstore_service: TstoreService = new TstoreService();
  private categoryStore: CategoryStore = new CategoryStore();

  public create_store(req: Request, res: Response) {
    var data = req.body;
    // this check whether all the filds were send through the erquest or not
    if (
      req.body.description &&
      req.body.telephone &&
      req.body.atention_days &&
      req.body.atention_open &&
      req.body.atention_close &&
      req.body.type &&
      req.body.picture &&
      req.body.delivery_time &&
      req.body.address &&
      req.body.category
    ) {
      const store_params: Store = {
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
      this.store_service.createStore(
        store_params,
        (err: any, store_data: Store) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_create, store_data, res);
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public get_store(req: Request, res: Response) {
    if (req.params.id) {
      const store_filter = { _id: req.params.id };
      this.store_service.filterStore(
        store_filter,
        (err: any, store_data: Store) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  //servicio para obtener los tipos de stores con imagenes
  public get_type_store(res: Response) {
    this.tstore_service.gett_store((err: any, store_data: any) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse(sms_get, store_data, res);
      }
    });
  }

  public find_storebyType(req: Request, res: Response) {
    if (req.params.type) {
      const store_filter = { type: req.params.type };
      this.store_service.filterStoremore(
        store_filter,
        (err: any, store_data: Store) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public find_storebyCategory(req: Request, res: Response) {
    var queryorder=null
    var store_filter=null
    
      if(req.params.ordenarPor==='Calificacion'){
        queryorder={rating: -1}
      }
      if(req.params.ordenarPor==='Tiempo Entrega'){
        queryorder={delivery_time: 1}
      }
      if(req.params.ordenarPor==='Precio Envío'){
        queryorder={costo_envio: 1}
      }
      if(req.params.category==='null'){
        store_filter = {};
        console.log(req.params.category)
      }
      else{
        store_filter = { category: req.params.category };
      }
      this.store_service.filterByOrder(
        store_filter,queryorder,
        (err: any, store_data: Store) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
  
  }

  public get_stores(res: Response) {
    this.store_service.getStore((err: any, store_data: Encomienda) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse(sms_get, store_data, res);
      }
    });
  }

  //obtener todas las categorias de las tiendas

  public get_category_stores(res: Response) {
    this.categoryStore.getCategory((err: any, store_data: CategoryStores) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse(sms_get, store_data, res);
      }
    });
  }

  

  public update_store(req: Request, res: Response) {
    if (
      (req.params.id && req.body.description) ||
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
      req.body.category
    ) {
      const store_filter = { _id: req.params.id };
      this.store_service.filterStore(
        store_filter,
        (err: any, store_data: Store) => {
          if (err) {
            mongoError(err, res);
          } else if (store_data) {
            const store_params: Store = {
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
            this.store_service.updateStore(store_params, (err: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse(sms_update, null, res);
              }
            });
          } else {
            failureResponse(sms_notfound, null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public delete_store(req: Request, res: Response) {
    if (req.params.id) {
      this.store_service.deleteStore(
        req.params.id,
        (err: any, delete_details: any) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse(sms_delet, null, res);
          } else {
            failureResponse(sms_notfound, null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

}
