"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const StoreController_1 = require("../app/api/controllers/StoreController");
const UserController_1 = require("../app/api/controllers/UserController");
const EncomiendaController_1 = require("../app/api/controllers/EncomiendaController");
const ProductController_1 = require("../app/api/controllers/ProductController");
const OrderController_1 = require("../app/api/controllers/OrderController");
class router {
    constructor() {
        this.userController = new UserController_1.UserController();
        this.storeController = new StoreController_1.StoreController();
        this.encomiendaController = new EncomiendaController_1.EncomiendaController();
        this.productController = new ProductController_1.ProductController();
        this.OrderController = new OrderController_1.OrderController();
    }
    route(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        //
        //Rutas de Usuarios
        app.route('/login')
            .post((req, res) => {
            this.userController.login(req, res);
        });
        app.route('/users')
            .get((req, res) => {
            this.userController.get_users(res);
        })
            .post((req, res) => {
            this.userController.create_user(req, res);
        });
        app.route('/users/:id')
            .get((req, res) => {
            this.userController.get_user(req, res);
        })
            .put((req, res) => {
            this.userController.update_user(req, res);
        })
            .delete((req, res) => {
            this.userController.delete_user(req, res);
        });
        //Rutas de Stores
        app.route('/categoryStores')
            .get((req, res) => {
            this.storeController.get_category_stores(res);
        });
        app.route('/typestores')
            .get((req, res) => {
            this.storeController.get_type_store(res);
        });
        app.route('/storeByCategory/:category/:ordenarPor')
            .get((req, res) => {
            this.storeController.find_storebyCategory(req, res);
        });
        app.route('/storeByType/:type')
            .get((req, res) => {
            this.storeController.find_storebyType(req, res);
        });
        app.route('/stores')
            .get((req, res) => {
            this.storeController.get_stores(res);
        })
            .post((req, res) => {
            this.storeController.create_store(req, res);
        });
        app.route('/stores/:id')
            .get((req, res) => {
            this.storeController.get_store(req, res);
        })
            .put((req, res) => {
            this.storeController.update_store(req, res);
        })
            .delete((req, res) => {
            this.storeController.delete_store(req, res);
        });
        //Rutas Encomiendas
        app.route('/encomiendasByUser/:iduser')
            .get((req, res) => {
            this.encomiendaController.find_storebyUser(req, res);
        });
        app.route('/encomiendas')
            .get((req, res) => {
            this.encomiendaController.get_all_encomienda(res);
        })
            .post((req, res) => {
            this.encomiendaController.create_encomienda(req, res);
        });
        app.route('/encomiendaState/:id/:state')
            .put((req, res) => {
            this.encomiendaController.update_encomiendaState(req, res);
        });
        app.route('/encomiendaByState/:state')
            .get((req, res) => {
            this.encomiendaController.get_encomiendaByState(req, res);
        });
        app.route('/encomiendas/:id')
            .get((req, res) => {
            this.encomiendaController.get_encomienda(req, res);
        })
            .put((req, res) => {
            this.encomiendaController.update_encomienda(req, res);
        })
            .delete((req, res) => {
            this.encomiendaController.delete_encomienda(req, res);
        });
        //Rutas de Productos
        app.route('/typeproducts')
            .get((req, res) => {
            this.productController.get_all_Type_Product(res);
        });
        app.route('/productsByLowerCost')
            .get((req, res) => {
            this.productController.find_ProductLowerCost(req, res);
        });
        app.route('/productsByHigherCost')
            .get((req, res) => {
            this.productController.find_ProductHigherCost(req, res);
        });
        app.route('/productsByName/:name')
            .get((req, res) => {
            this.productController.find_ProductName(req, res);
        });
        app.route('/productsByType/:type')
            .get((req, res) => {
            this.productController.find_ProductByType(req, res);
        });
        app.route('/productsByStore/:idstore')
            .get((req, res) => {
            this.productController.find_ProductByStore(req, res);
        });
        app.route('/productsByOff')
            .get((req, res) => {
            this.productController.find_ProductByOff(req, res);
        });
        app.route('/productsByOferta')
            .get((req, res) => {
            this.productController.find_ProductByOferta(req, res);
        });
        app.route('/products')
            .get((req, res) => {
            this.productController.get_all_Product(res);
        })
            .post((req, res) => {
            this.productController.create_Product(req, res);
        });
        app.route('/products/:id')
            .get((req, res) => {
            this.productController.get_Product(req, res);
        })
            .put((req, res) => {
            this.productController.update_Product(req, res);
        })
            .delete((req, res) => {
            this.productController.delete_Product(req, res);
        });
        //Rutas de Orders
        //administracion
        app.route('/ordersByIdOrderUser/:id')
            .get((req, res) => {
            this.OrderController.get_OrderByIdOrderUser(req, res);
        });
        app.route('/ordersByIdProducts/:id')
            .get((req, res) => {
            this.OrderController.get_ProductsOrder(req, res);
        });
        app.route('/ordersByState/:state')
            .get((req, res) => {
            this.OrderController.find_OrderbyState(req, res);
        });
        app.route('/ordersByUserId/:iduser')
            .get((req, res) => {
            this.OrderController.find_OrderbyUser(req, res);
        });
        app.route('/ordersByUserIdByState/:iduser/:state')
            .get((req, res) => {
            this.OrderController.find_OrderbyUserState(req, res);
        });
        app.route('/orders')
            .get((req, res) => {
            this.OrderController.get_all_Order(res);
        })
            .post((req, res) => {
            this.OrderController.create_Order(req, res);
        });
        app.route('/orders/:id')
            .get((req, res) => {
            this.OrderController.get_Order(req, res);
        })
            .put((req, res) => {
            this.OrderController.update_Order(req, res);
        })
            .delete((req, res) => {
            this.OrderController.delete_Order(req, res);
        });
    }
}
exports.router = router;
/*
export const router=Router();
var base= new BaseController;
var result='ffsd'
public userController:UserController=new UserController();
//Users


router.get('/users',(req: Request, res:Response)=>{


        base.SendResponse('Recurso Encontrado',res,result);
 });

 router.post()=>{
    res.status(200).send({
        message:'Recurso Registrado'
    })
 });

 router.put('/users/:id',(req: Request, res:Response)=>{
    res.status(200).send({
        message:'Recurso Modificado'
    })
 });

 router.delete('/users/:id',(req: Request, res:Response)=>{
    res.status(200).send({
        message:'Recurso Modificado'
    })
 });





//






export default router*/ 
