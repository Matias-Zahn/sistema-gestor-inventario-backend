import { Router } from "express";
import { CategoryController } from "./category.controller";
import { CategoryService } from './category.service';
import { MongoCategoriesDataSource } from "../../infrastructure";

export class CategoryRoutes{

    public static get routes(){
        const routes = Router()

        const dataSource = new MongoCategoriesDataSource();
        const service = new CategoryService(dataSource) 
        const controller = new CategoryController(service);

        routes.get('/', controller.getAllCategories)
        routes.get('/:id', controller.getOneCategory)
        routes.post('/', controller.createCategory)

        return routes
    }

}