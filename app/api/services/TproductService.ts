import { T_Product } from '../interfaces/interfaces';
import { TproductSchema } from '../models/Tproduct';
import mongoose from "mongoose";

const t_product= mongoose.model('t_products',TproductSchema);
export default class TproductService {
    
    public createTproduct(store_params: T_Product, callback: any) {
        const _session = new t_product(store_params);
        _session.save(callback);
        
    }

    public getTproduct(callback: any) {
        t_product.find({}, callback);
    }
    public filterTproduct(query: any, callback: any) {
        t_product.findOne(query, callback);
    }

    public updateTproduct(store_params: T_Product, callback: any) {
        const query = { _id: store_params._id };
        t_product.findOneAndUpdate(query, store_params, callback);
    }
    
    public deleteTproduct(_id: String, callback: any) {
        const query = { _id: _id };
        t_product.deleteOne(query, callback);
    }

}