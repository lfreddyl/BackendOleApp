import { T_Store } from '../interfaces/interfaces';
import { TstoreSchema } from '../models/Tstore';
import mongoose from "mongoose";

const t_store= mongoose.model('T_Stores',TstoreSchema);
export default class t_storeservice {
    
    public createt_store(t_store_params: T_Store, callback: any) {
        const _session = new t_store(t_store_params);
        _session.save(callback);
        
    }

    public gett_store(callback: any) {
        t_store.find({}, callback);
    }
    public filtert_store(query: any, callback: any) {
        t_store.findOne(query, callback);
    }

    public updatet_store(t_store_params: T_Store, callback: any) {
        const query = { _id: t_store_params._id };
        t_store.findOneAndUpdate(query, t_store_params, callback);
    }
    
    public deletet_store(_id: String, callback: any) {
        const query = { _id: _id };
        t_store.deleteOne(query, callback);
    }

}