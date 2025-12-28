import { Request, Response } from "express";
import { CategoryService } from './category.service';
import { CustomError, CreateCategoryDTO } from "../../domain";

export class CategoryController{

    constructor(
        private readonly categoryService: CategoryService
    ){}

    
      private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError) return res.status(error.statusCode).json(error.errorMessage);
        console.log(error)
        return res.status(500).json({error: `Error de interno de servidor`})
      }


    public getAllCategories = (req: Request, res: Response) => {
        res.json('Funcionando')
    }

    public getOneCategory = (req: Request, res: Response) => {
        res.json('Funcionando')
    }

    public createCategory = (req: Request, res: Response) => {
        const [ error, createCategoryDTO] = CreateCategoryDTO.create(req.body);

        if(error) return res.status(400).json({error});

        this.categoryService.createCategory(createCategoryDTO!)
            .then((category) => res.status(201).json(category))
            .catch((err) =>  this.handleError(err, res))
    }

}