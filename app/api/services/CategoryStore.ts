import { CategoryStores } from '../interfaces/interfaces';
import { CategoryStoreSchema } from '../models/CategoryStore';
import mongoose from "mongoose";

const category= mongoose.model('category_stores',CategoryStoreSchema);
export default class TproductService {
    
    public createCategory(categoryparams: CategoryStores, callback: any) {
        const _session = new category(categoryparams);
        _session.save(callback);
        
    }

    public getCategory(callback: any) {
        category.find({}, callback);
    }
    public filterCategory(query: any, callback: any) {
        category.findOne(query, callback);
    }

    public updateCategory(categoryparams: CategoryStores, callback: any) {
        const query = { _id: categoryparams._id };
        category.findOneAndUpdate(query, categoryparams, callback);
    }
    
    public deleteCategory(_id: String, callback: any) {
        const query = { _id: _id };
        category.deleteOne(query, callback);
    }

}