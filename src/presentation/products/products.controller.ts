import { Request, Response } from "express";
import { ProductService } from "./product.services";
import { CreateProductDTO, CustomError, UpdateProductDTO } from "../../domain";


//TODO: TERMINAR LOS CONTROLADORES ASIMISMO CON EL SERIVICIO DE PRODUCTOS IMPLEMENTANDO LOS GETS, UPDATE AND DELETE
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: any, res: Response) => {
    if(error instanceof CustomError) return res.status(error.statusCode).json(error.errorMessage);
    console.log(error)
    return res.status(500).json({error: `Error de interno de servidor, sin especificacion: ${error}`})
  }


  public getProducts = (req: Request, res: Response) => {
    this.productService.findAllProducts()
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(error, res))
  }

  public getOneProduct =(req: Request, res: Response) => {
    const { term } = req.params
    
    if(!term) return res.status(400).json({error: 'Id o Sku necesario para realizar la busqueda'}) 

    this.productService.findOneProduct(term)
      .then((product) => res.status(200).json(product))
      .catch((error) => this.handleError(error, res))

  }

  public createProduct = (req: Request, res: Response) => {
    const [error, createProductDTO] = CreateProductDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    this.productService.createProduct(createProductDTO!)
        .then((resp) => res.status(201).json(resp))
        .catch((error) => this.handleError(error, res))
  }

  public updateProduct =(req: Request, res: Response) => {
      const { term } = req.params;
      if(!term) return res.status(400).json({error: 'Id o Sku necesario para realizar la busqueda'});

      const [error, updateProductDTO] = UpdateProductDTO.update({...req.body, term})

      if(error) return res.status(400).json({error});

      this.productService.updateProduct(updateProductDTO!)
        .then((product) => res.status(200).json(product))
        .catch((err) => this.handleError(err, res))
  }

  public deleteProduct =(req: Request, res: Response) => {

      const { term } = req.params;

      if(!term) return res.status(400).json({error: 'Id o Sku necesario para realizar la busqueda'});


      this.productService.deleteProduct(term)
        .then(() => res.status(204).json(null))
        .catch((err) => this.handleError(err, res))

  }
}
