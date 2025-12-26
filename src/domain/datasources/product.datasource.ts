import { CreateProductDTO } from "../dtos/createProduct.dto";
import { UpdateProductDTO } from "../dtos/updateProduct.dto";
import { ProductEntity } from "../entities/product.entity";

export abstract class ProductDatasource {
    abstract getProducts(): Promise<ProductEntity[]>
    abstract getOneProduct(term: string): Promise<ProductEntity>
    abstract createProduct(createProductDTO : CreateProductDTO): Promise<ProductEntity>
    abstract updateProduct(updateProductDTO: UpdateProductDTO): Promise<ProductEntity>
    abstract deleteProduct(term: string): Promise<null>
    
}