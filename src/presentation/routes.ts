import { Router } from 'express';
import { ProductsRoutes } from './products/products.routes';
import { InventoryRoutes } from './inventory/inventory.routes';
import { CategoryRoutes } from './category/category.routes';
import { AuthRoutes } from './auth/auth.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/category', CategoryRoutes.routes)
    router.use('/api/products', ProductsRoutes.routes);
    router.use('/api/inventory', InventoryRoutes.routes);
    router.use('/api/auth', AuthRoutes.routes);


    return router;
  }


}

