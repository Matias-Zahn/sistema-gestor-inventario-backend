import { CreateProductDTO } from "../../domain/dtos/product/createProduct.dto";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from '../../domain/repository/product.repository';
import { UpdateProductDTO } from '../../domain/dtos/product/updateProduct.dto';

export class ProductService{

    constructor(
        private readonly productRepository : ProductRepository
    ){}


    public createProduct(createProductDTO: CreateProductDTO): Promise<ProductEntity>{
        return this.productRepository.createProduct(createProductDTO);
    }
    
    public async  findAllProducts(): Promise<ProductEntity[]>{
        return this.productRepository.getProducts();
    }

    public findOneProduct(term: string): Promise<ProductEntity>{
        return this.productRepository.getOneProduct(term);
    }


    public updateProduct(updateProductDTO: UpdateProductDTO){
        return this.productRepository.updateProduct(updateProductDTO)
    }

    
    public deleteProduct(term: string){
        return this.productRepository.deleteProduct(term)
    }
    


}