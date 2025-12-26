import { ProductEntity } from "../entities/product.entity";
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { UpdateProductDTO } from "../dtos/updateProduct.dto";

export abstract class ProductRepository {
    abstract getProducts(): Promise<ProductEntity[]>
    abstract getOneProduct(term: string): Promise<ProductEntity>
    abstract createProduct(createProductDTO : CreateProductDTO): Promise<ProductEntity>
    abstract updateProduct(updateProductDTO: UpdateProductDTO): Promise<ProductEntity>
    abstract deleteProduct(term: string): Promise<null>
}