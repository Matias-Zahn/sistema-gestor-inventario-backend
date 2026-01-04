import { Router } from "express";
import { ProductController } from "./products.controller";
import {  ProductService } from './product.services';
import { MongoProductsDataSource, ProductRepositoryImpl } from "../../infrastructure";
import { DiscordService } from '../../infrastructure/discord/discord.service';
import { envs } from "../../config/envs";


export class ProductsRoutes{

    static get routes(){
        const route = Router()

        //Arquitectura Limpia, creando el datasource (MOngo en este caso) para poder hacer la implementacion del repostory
        //Evitando el alto acoplamiento al datasource
        const mongo = new MongoProductsDataSource();
        const productRepositoryImpl = new ProductRepositoryImpl(mongo);
        const discordService = new DiscordService(envs.DISCORD_WEBHOOK_URL);
        const productService  = new ProductService(productRepositoryImpl, discordService);
        const productController = new ProductController(productService);

        route.get(  '/', productController.getProducts  )
        route.get(  '/:term', productController.getOneProduct  )
        route.post(  '/', productController.createProduct  )
        route.patch(  '/:term', productController.updateProduct  )
        route.delete(  '/:term', productController.deleteProduct  )
        route.post(  '/:term/sell', productController.sellProduct)


        return route
    }
}