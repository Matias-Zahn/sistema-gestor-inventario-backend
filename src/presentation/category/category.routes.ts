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
        routes.get('/:term', controller.getOneCategory)
        routes.post('/', controller.createCategory)
        routes.patch('/:term', controller.updateCategory)
        routes.delete('/:term', controller.deleteCategory)

        return routes
    }

}