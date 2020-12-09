import { Store } from '../interfaces/interfaces';
import { StoreSchema } from '../models/Store';
import mongoose from "mongoose";

const store= mongoose.model('stores',StoreSchema);
export default class storeservice {
    
    public createStore(store_params: Store, callback: any) {
        const _session = new store(store_params);
        _session.save(callback);
        
    }

    public getStore(callback: any) {
        store.find({}, callback);
    }
    public filterByOrder(query: any,query2:any, callback: any) {
        store.find(query, callback).sort(query2); 
    }

    public filterStore(query: any, callback: any) {
        store.findOne(query, callback);
    }
    public filterStoremore(query: any, callback: any) {
        store.find(query, callback);
    }

    public updateStore(store_params: Store, callback: any) {
        const query = { _id: store_params._id };
        store.findOneAndUpdate(query, store_params, callback);
    }
    
    public deleteStore(_id: String, callback: any) {
        const query = { _id: _id };
        store.deleteOne(query, callback);
    }

}