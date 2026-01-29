import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongoAuthDatasource } from "../../infrastructure/datasources/mongo-auth.datasource";

export class AuthRoutes {
  public static get routes() {
    const routes = Router();

    const repository = new MongoAuthDatasource();
    const service = new AuthService(repository);
    const controller = new AuthController(service);

    routes.post("/login", controller.login);
    routes.post("/register", controller.register);

    return routes;
  }
}
