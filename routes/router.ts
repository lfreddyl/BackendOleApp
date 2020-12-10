import { Router, Request,Response, Application} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';
import { StoreController } from '../app/api/controllers/StoreController';
import { UserController } from '../app/api/controllers/UserController';
import {EncomiendaController } from '../app/api/controllers/EncomiendaController';
import {ProductController } from '../app/api/controllers/ProductController';
import {OrderController } from '../app/api/controllers/OrderController';

export class router{


    public userController:UserController= new UserController();
    public storeController:StoreController= new StoreController();
    public encomiendaController:EncomiendaController= new EncomiendaController();
    public productController:ProductController= new ProductController();
    public OrderController:OrderController= new OrderController();
    
    public route(app: Application){

        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
    
         
        })
        //

        //Rutas de Usuarios
        app.route('/login')

        .post((req: Request, res: Response) => {
            this.userController.login(req,res);
    
        })

        app.route('/users')

        .get((req: Request, res: Response) => {
            this.userController.get_users(res);
    
        })
    
        .post((req: Request, res: Response) => {
            this.userController.create_user(req,res);
    
        })

        app.route('/users/:id')

        .get((req: Request, res: Response) => {
            this.userController.get_user(req,res);
    
        })
        .put((req: Request, res: Response) => {
            this.userController.update_user(req,res);
    
        })
        .delete((req: Request, res: Response) => {
            this.userController.delete_user(req,res);
    
        });

        //Rutas de Stores
        app.route('/categoryStores')
        .get((req: Request, res: Response) => {
            this.storeController.get_category_stores(res);
        })  
        app.route('/typestores')
        .get((req: Request, res: Response) => {
            this.storeController.get_type_store(res);
        })  
        app.route('/storeByCategory/:category/:ordenarPor')
        .get((req: Request, res: Response) => {
            this.storeController.find_storebyCategory(req,res);
        });
        app.route('/storeByType/:type')
        .get((req: Request, res: Response) => {
            this.storeController.find_storebyType(req,res);
        });
        app.route('/stores')
        .get((req: Request, res: Response) => {
            this.storeController.get_stores(res);
        })    
        .post((req: Request, res: Response) => {
            this.storeController.create_store(req,res);
    
        })

        app.route('/stores/:id')
        .get((req: Request, res: Response) => {
            this.storeController.get_store(req,res);
        })
        .put((req: Request, res: Response) => {
            this.storeController.update_store(req,res);
        })
        .delete((req: Request, res: Response) => {
            this.storeController.delete_store(req,res);
    
        })
        //Rutas Encomiendas
        app.route('/encomiendasByUser/:iduser')
        .get((req: Request, res: Response) => {
            this.encomiendaController.find_storebyUser(req,res);
        });
        app.route('/encomiendas')
        .get((req: Request, res: Response) => {
            this.encomiendaController.get_all_encomienda(res);
        })    
        .post((req: Request, res: Response) => {
            this.encomiendaController.create_encomienda(req,res);
    
        })
        app.route('/encomiendaState/:id/:state')
        .put((req: Request, res: Response) => {
            this.encomiendaController.update_encomiendaState(req,res);
        })
        app.route('/encomiendaByState/:state')
        .get((req: Request, res: Response) => {
            this.encomiendaController.get_encomiendaByState(req,res);
        })
        app.route('/encomiendas/:id')
        .get((req: Request, res: Response) => {
            this.encomiendaController.get_encomienda(req,res);
        })
        .put((req: Request, res: Response) => {
            this.encomiendaController.update_encomienda(req,res);
        })
        .delete((req: Request, res: Response) => {
            this.encomiendaController.delete_encomienda(req,res);
        })
        //Rutas de Productos
        
        app.route('/typeproducts')
        .get((req: Request, res: Response) => {
            this.productController.get_all_Type_Product(res);
        })   
        app.route('/productsByLowerCost')
        .get((req: Request, res: Response) => {
            this.productController.find_ProductLowerCost(req,res);
        });
        app.route('/productsByHigherCost')
        .get((req: Request, res: Response) => {
            this.productController.find_ProductHigherCost(req,res);
        });
        app.route('/productsByName/:name/:id_store')
        .get((req: Request, res: Response) => {
            this.productController.find_ProductName(req,res);
        });
        app.route('/productsByType/:type')
        .get((req: Request, res: Response) => {
            this.productController.find_ProductByType(req,res);
        });
        app.route('/productsByStore/:idstore')
        .get((req: Request, res: Response) => {
            this.productController.find_ProductByStore(req,res);
        });
        app.route('/productsByOff')
        .get((req: Request, res: Response) => {
            this.productController.find_ProductByOff(req,res);
        })  
        app.route('/productsByOferta/:id_store')
        .get((req: Request, res: Response) => {
            this.productController.find_ProductByOferta(req,res);
        })  
        app.route('/products')
        .get((req: Request, res: Response) => {
            this.productController.get_all_Product(res);
        })    
        .post((req: Request, res: Response) => {
            this.productController.create_Product(req,res);
    
        })

        app.route('/products/:id')
        .get((req: Request, res: Response) => {
            this.productController.get_Product(req,res);
        })
        .put((req: Request, res: Response) => {
            this.productController.update_Product(req,res);
        })
        .delete((req: Request, res: Response) => {
            this.productController.delete_Product(req,res);
        })
        //Rutas de Orders
        //administracion
        app.route('/ordersByIdOrderUser/:id')
        .get((req: Request, res: Response) => {
            this.OrderController.get_OrderByIdOrderUser(req,res);
        });
        app.route('/ordersByIdProducts/:id')
        .get((req: Request, res: Response) => {
            this.OrderController.get_ProductsOrder(req,res);
        });
        app.route('/ordersByState/:state')
        .get((req: Request, res: Response) => {
            this.OrderController.find_OrderbyState(req,res);
        });
        app.route('/ordersByUserId/:iduser')
        .get((req: Request, res: Response) => {
            this.OrderController.find_OrderbyUser(req,res);
        });
        app.route('/ordersByUserIdByState/:iduser/:state')
        .get((req: Request, res: Response) => {
            this.OrderController.find_OrderbyUserState(req,res);
        });

        app.route('/orders')
        .get((req: Request, res: Response) => {
            this.OrderController.get_all_Order(res);
        })    
        .post((req: Request, res: Response) => {
            this.OrderController.create_Order(req,res);
    
        })

        app.route('/orders/:id')
        .get((req: Request, res: Response) => {
            this.OrderController.get_Order(req,res);
        })
        .put((req: Request, res: Response) => {
            this.OrderController.update_Order(req,res);
        })
        .delete((req: Request, res: Response) => {
            this.OrderController.delete_Order(req,res);
        })
    }
}


    



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