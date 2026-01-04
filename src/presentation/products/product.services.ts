import { NotificationService } from "../../domain";
import { CreateProductDTO } from "../../domain/dtos/product/createProduct.dto";
import { UpdateProductDTO } from '../../domain/dtos/product/updateProduct.dto';
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from '../../domain/repository/product.repository';
import { SellProductDTO } from '../../domain/dtos/product/sellProduct.dto';

export class ProductService{

    constructor(
        private readonly productRepository : ProductRepository,
        private readonly notificationService: NotificationService
    ){}


    public async createProduct(createProductDTO: CreateProductDTO): Promise<ProductEntity>{
        const newProduct = await this.productRepository.createProduct(createProductDTO);

        this.notificationService.notify(`Producto creado: ${newProduct.name} (ID: ${newProduct.id})`)
            .catch(err => console.log('Somenthig was very wrong send message to Discord'))
        return newProduct;
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
    
    public async sellProduct(sellProductDTO: SellProductDTO){
        const product = await this.productRepository.decrementStock(sellProductDTO);

        //ACa se realiza la notificacion al Discord cuando el stock es bajo
        if(product.stock <= product.minStock){
            this.notificationService.notify(
                `⚠️ ALERTA DE STOCK: El producto ${product.name} tiene ${product.stock} unidades (Mínimo: ${product.minStock})`
            )
        };
        return product
    }

}