import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { CustomError, CreateCategoryDTO } from "../../domain";
import { UpdateCategoryDTO } from '../../domain/dtos/category/updateCategory.dto';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json(error.errorMessage);
    console.log(error);
    return res.status(500).json({ error: `Error de interno de servidor` });
  };

  public getAllCategories = (req: Request, res: Response) => {
    this.categoryService.getAllCategory()      
        .then((categories) => res.status(200).json(categories))
        .catch((err) => this.handleError(err, res));
  };

  public getOneCategory = (req: Request, res: Response) => {
    const { term } = req.params;
    this.categoryService
      .getOneCategory(term)
      .then((category) => res.status(200).json(category))
      .catch((err) => this.handleError(err, res));
  };

  public createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDTO] = CreateCategoryDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDTO!)
      .then((category) => res.status(201).json(category))
      .catch((err) => this.handleError(err, res));
  };
  
  public updateCategory = (req: Request, res: Response) => {
    const { term } = req.params;

    if(!term) throw CustomError.badRequest('Nombre o Id necesario para realizar la busqueda');

    const [error, updateCategoryDTO] = UpdateCategoryDTO.update({...req.body, term});

    if(error) return res.status(400).json({error});

    this.categoryService
      .updateCategory(updateCategoryDTO!)
      .then((category) => res.status(200).json(category))
      .catch((err) => this.handleError(err, res));
  };

  public deleteCategory = (req: Request, res: Response) => {
    const { term } = req.params;
    this.categoryService
      .deleteCategory(term)
      .then(() => res.status(201).json(null))
      .catch((err) => this.handleError(err, res));
  };



}
