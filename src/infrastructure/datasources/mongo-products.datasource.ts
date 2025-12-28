import { isValidObjectId } from "mongoose";
import { ProductModel } from "../../data/mongo/models/product.model";
import {
  CreateProductDTO,
  CustomError,
  ProductDatasource,
  ProductEntity,
  UpdateProductDTO
} from "../../domain";

export class MongoProductsDataSource extends ProductDatasource {


  async getProducts(): Promise<ProductEntity[]> {
    const products = await ProductModel.find().populate('category', 'name').lean(); // Siempre retorna [], el .lean() transforma los doc en objetos planos
    const productsToObject = products.map((product) =>
      ProductEntity.fromObject(product)
    );
    return productsToObject;
  }

  async getOneProduct(term: string): Promise<ProductEntity> {
    const filter = isValidObjectId(term) ? { _id: term } : { sku: term };

    const product = await ProductModel.findOne(filter).lean();

    if (!product)
      throw CustomError.notFound(
        `Producto no encontrado por el termino: ${term}`
      );

    return ProductEntity.fromObject(product);
  }

  async createProduct(
    createProductDTO: CreateProductDTO
  ): Promise<ProductEntity> {
    const existProduct = await ProductModel.findOne({
      sku: createProductDTO.sku,
    });

    if (existProduct) throw CustomError.badRequest(" Product already exist");

    const newProduct = await ProductModel.create(createProductDTO);
    if (!newProduct)
      throw CustomError.internalServerError(
        "Algo ocurrio con la creacion del producto"
      );
    // Esto limpia los métodos internos de Mongoose y deja solo los datos
    const productToObject = newProduct.toObject();

    const productEntity = ProductEntity.fromObject(productToObject);
    return productEntity;
  }

  async updateProduct(updateProductDTO: UpdateProductDTO): Promise<ProductEntity> {

    const product: ProductEntity = await this.getOneProduct(updateProductDTO.term);

    const updated = await ProductModel.findByIdAndUpdate(
      product.id, 
      updateProductDTO.values,
      {new: true}
    ).lean()

    return ProductEntity.fromObject(updated!);
  }

  async deleteProduct(term: string): Promise<null> {
    const filter = isValidObjectId(term) ? { _id: term } : { sku: term };

    const product = await ProductModel.findOneAndDelete(filter);

    if (!product)
      throw CustomError.notFound(
        `Producto no encontrado por el termino: ${term}`
      );

    return null;
  }
}
