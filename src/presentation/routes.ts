import { Router } from 'express';
import { ProductsRoutes } from './products/products.routes';
import { InventoryRoutes } from './inventory/inventory.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/products', ProductsRoutes.routes);
    router.use('/api/inventory', InventoryRoutes.routes);


    return router;
  }


}

