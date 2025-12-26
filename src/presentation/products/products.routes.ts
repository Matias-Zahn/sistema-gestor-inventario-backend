import { Router } from "express";
import { ProductController } from "./products.controller";
import {  ProductService } from './product.services';
import { MongoDataSource, ProductRepositoryImpl } from "../../infrastructure";


export class ProductsRoutes{

    static get routes(){
        const route = Router()

        //Arquitectura Limpia, creando el datasource (MOngo en este caso) para poder hacer la implementacion del repostory
        //Evitando el alto acoplamiento al datasource
        const mongo = new MongoDataSource();
        const productRepositoryImpl = new ProductRepositoryImpl(mongo);
        const productService  = new ProductService(productRepositoryImpl);
        const productController = new ProductController(productService);

        route.get(  '/', productController.getProducts  )
        route.get(  '/:term', productController.getOneProduct  )
        route.post(  '/', productController.createProduct  )
        route.patch(  '/:term', productController.updateProduct  )
        route.delete(  '/:term', productController.deleteProduct  )

        return route
    }
}