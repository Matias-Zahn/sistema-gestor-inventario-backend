import { ProductEntity } from "../entities/product.entity";
import { CreateProductDTO } from '../dtos/product/createProduct.dto';
import { UpdateProductDTO } from "../dtos/product/updateProduct.dto";
import { SellProductDTO } from '../dtos/product/sellProduct.dto';

export abstract class ProductRepository {
    abstract getProducts(): Promise<ProductEntity[]>
    abstract getOneProduct(term: string): Promise<ProductEntity>
    abstract createProduct(createProductDTO : CreateProductDTO): Promise<ProductEntity>
    abstract updateProduct(updateProductDTO: UpdateProductDTO): Promise<ProductEntity>
    abstract deleteProduct(term: string): Promise<null>
    abstract decrementStock(sellProductDTO: SellProductDTO): Promise<ProductEntity> 
}