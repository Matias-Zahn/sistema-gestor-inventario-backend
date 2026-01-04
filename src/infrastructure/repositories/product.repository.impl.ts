import { CreateProductDTO, ProductDatasource, ProductEntity, ProductRepository, UpdateProductDTO } from "../../domain";
import { SellProductDTO } from '../../domain/dtos/product/sellProduct.dto';

export class ProductRepositoryImpl implements ProductRepository {

    constructor(
        private readonly dataSource: ProductDatasource
    ){}
    
    async getProducts(): Promise<ProductEntity[]> {
        return await this.dataSource.getProducts();
    }
    async getOneProduct(term: string): Promise<ProductEntity> {
        return await this.dataSource.getOneProduct(term)
    } 
    
    createProduct(createProductDTO : CreateProductDTO): Promise<ProductEntity> {
        return this.dataSource.createProduct(createProductDTO)
    }
    
    async updateProduct(updateProductDTO: UpdateProductDTO): Promise<ProductEntity> {
        return await this.dataSource.updateProduct(updateProductDTO)
    }
    
    async deleteProduct(term: string): Promise<null> {
        return await this.dataSource.deleteProduct(term);
    }

    decrementStock(sellProductDTO: SellProductDTO): Promise<ProductEntity> {
        return this.dataSource.decrementStock(sellProductDTO);
    }
}