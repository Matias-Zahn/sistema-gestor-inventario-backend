import { CreateProductDTO, ProductDatasource, ProductEntity, ProductRepository, UpdateProductDTO } from "../../domain";

export class ProductRepositoryImpl implements ProductRepository {

    constructor(
        private readonly dataSource: ProductDatasource
    ){}
    
    async getProducts(): Promise<ProductEntity[]> {
        return this.dataSource.getProducts();
    }
    getOneProduct(term: string): Promise<ProductEntity> {
        return this.dataSource.getOneProduct(term)
    } 
    
    createProduct(createProductDTO : CreateProductDTO): Promise<ProductEntity> {
        return this.dataSource.createProduct(createProductDTO)
    }
    
    updateProduct(updateProductDTO: UpdateProductDTO): Promise<ProductEntity> {
        return this.dataSource.updateProduct(updateProductDTO)
    }

    deleteProduct(term: string): Promise<null> {
        return this.dataSource.deleteProduct(term);
    }
}