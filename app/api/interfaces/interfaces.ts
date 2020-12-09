
export interface User {
            _id?: String,
            city?: String,
            name: String,
            lastname:String,
            email?:String,
            movil: String,
            password: String,
            address?: String,
            type:String,
            deleted_at?: Boolean,
            picture?: String
}
export interface Encomienda {
    _id?: String,
    user_id:String,
    addrestart: String,
    addresend:String,
    movil: String,
    description: String,
    cost: Number,
    state?:String
}
export interface Order {
    _id?: String,
    user_id:String,
    delivery_time?: Number,
    date:Date
    state:String,
    deleted_at?: Boolean,
    description?: String,
    totalcost?: Number,
    products:Product[],
    movil:String,
    address:String
}
export interface T_Product {
    _id?: String,
    description:String,
    img: Number,
}
export interface T_Store {
    _id?: String,
    description:String,
    img: Number,
}
export interface CategoryStores {
    _id?: String,
    description:String,
    img: Number,
}






export interface Product {
    _id?: String,
    store_id:String,
    description:String,
    qualification?: Number,
    price:Number
    minimun_order:Number,
    delivery_time?:Number,
    deleted_at?:Boolean,
    state:String,
    picture?:String
    type?:String,
    oferta?:Boolean,
    off?:Number

}

export interface Store {
    _id?: String,
    description:String,
    telephone: String,
    atention_days:Array<String>,
    atention_open:Number,
    atention_close:Number,
    type:String,
    picture?:String,
    deleted_at?:Boolean,
    delivery_time:Number,
    rating?:Number,
    costo_envio?:Number,
    address:String,
    category:Array<String>,
    
}



