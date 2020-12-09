import { Order } from '../interfaces/interfaces';
import { OrderSchema } from '../models/Order';
import mongoose from "mongoose";

const order= mongoose.model('orders',OrderSchema);
export default class orderservice {
    
    public createOrder(order_params: Order, callback: any) {
        const _session = new order(order_params);
        _session.save(callback);
    }

    public getOrder(callback: any) {
        order.find({}, callback);
    }
    public filterByOrder(query: any,query2:any, callback: any) {
        order.find(query, callback).sort(query2); 
    }

    public filterByUserByOrder(query: any,callback:any) {
  //  order.aggregate([{$lookup:{  from: "users",localField: "user_id",foreignField: "_id",as: "user"}},{$unwind: "$user"},{$match:{query}}])
    order.aggregate(query).exec(callback);
    }
    public filterOrder(query: any, callback: any) {
        order.findOne(query, callback);
    }

    public updateOrder(order_params: Order, callback: any) {
        const query = { _id: order_params._id };
        order.findOneAndUpdate(query, order_params, callback);
    }
    
    public deleteOrder(_id: String, callback: any) {
        const query = { _id: _id };
        order.deleteOne(query, callback);
    }

}