import { Router } from "express";
import { InventoryController } from './inventory.controller';

export class InventoryRoutes{


    public static get routes(){

        const routes = Router()

        const inventoryController =  new InventoryController();

        routes.post('/movements', inventoryController.createMovementInventory)
        routes.get('/history', inventoryController.getHistoryInventory)

        return routes
    }

}