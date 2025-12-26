import { Request, Response } from "express";

export class InventoryController{

    public getHistoryInventory = (req: Request, res: Response) => {
        res.json('Hola')
    } 

    public createMovementInventory = (req: Request, res: Response) => {
        res.json('Hola')
    } 

}