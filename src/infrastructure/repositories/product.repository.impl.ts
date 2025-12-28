import { CreateProductDTO, ProductDatasource, ProductEntity, ProductRepository, UpdateProductDTO } from "../../domain";

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
    
    async createProduct(createProductDTO : CreateProductDTO): Promise<ProductEntity> {
        return await this.dataSource.createProduct(createProductDTO)
    }
    
    async updateProduct(updateProductDTO: UpdateProductDTO): Promise<ProductEntity> {
        return await this.dataSource.updateProduct(updateProductDTO)
    }

    async deleteProduct(term: string): Promise<null> {
        return await this.dataSource.deleteProduct(term);
    }
}