import { Router } from "express";
import { ProductController } from "./products.controller";
import { ProductService } from "./product.service";
import {
  AuthRepositoryImpl,
  DiscordService,
  MongoAuthDatasource,
  MongoProductsDataSource,
  ProductRepositoryImpl,
} from "../../infrastructure";

import { envs } from "../../config/envs";
import { AuthMiddleware } from "../auth/auth.middleware";

export class ProductsRoutes {
  static get routes() {
    const route = Router();

    //Arquitectura Limpia, creando el datasource (MOngo en este caso) para poder hacer la implementacion del repostory
    //Evitando el alto acoplamiento al datasource
    const mongo = new MongoProductsDataSource();
    const productRepositoryImpl = new ProductRepositoryImpl(mongo);
    const discordService = new DiscordService(envs.DISCORD_WEBHOOK_URL);
    const productService = new ProductService(
      productRepositoryImpl,
      discordService,
    );
    const productController = new ProductController(productService);

    const mongoAuht = new MongoAuthDatasource();
    const authRepository = new AuthRepositoryImpl(mongoAuht);
    const authMiddleware = new AuthMiddleware(authRepository);

    route.use(authMiddleware.validateUser);

    route.get("/", productController.getProducts);
    route.get("/:term", productController.getOneProduct);
    route.post("/", productController.createProduct);
    route.patch("/:term", productController.updateProduct);
    route.delete("/:term", productController.deleteProduct);
    route.post("/:term/sell", productController.sellProduct);

    return route;
  }
}
