import { Product} from '../interfaces/interfaces';
import { ProductSchema } from '../models/Product';
import mongoose from "mongoose";

const product= mongoose.model('products',ProductSchema);
export default class encomiendaservice {
    
    public createProduct(product_params: Product, callback: any) {
        const _session = new product(product_params);
        _session.save(callback);
        
    }

    public getProduct(callback: any) {
        product.find({}, callback);
    }
    public filterProduct(query: any, callback: any) {
        product.findOne(query, callback);
    }

    public filterProductOrder(query: any,query2:any, callback: any) {
        product.find(query, callback).sort(query2);
    }

    public updateProduct(product_params: Product, callback: any) {
        const query = { _id: product_params._id };
        product.findOneAndUpdate(query, product_params, callback);
    }
    
    public deleteProduct(_id: String, callback: any) {
        const query = { _id: _id };
        product.deleteOne(query, callback);
    }
    public getProductByIdOrder(query: any, callback: any) {
        product.find(query, callback);
    }
  

    

}