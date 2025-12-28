import { CustomError } from "../errors/customError";

export class ProductEntity {
  constructor(
    public id: string,
    public sku: string,
    public name: string,
    public price: number,
    public costPrice: number,
    public stock: number,
    public minStock: number,
    public category: any,  //TODO: REVISAR ESTA PARTE PARA QUE ESPERE UN OBJETO (TIPAR)
    public status: "ACTIVE" | "INACTIVE" | "DISCONTINUED",
    public description?: string
  ) {}

  public static fromObject(obeject: { [key: string]: any }) {
    const {
      id,
      _id,
      sku,
      name,
      price,
      costPrice,
      stock,
      minStock,
      category,
      status,
      description,
    } = obeject;


    if(!id && !_id) throw CustomError.badRequest('Missign id');
    if(!sku)throw CustomError.badRequest('Missign sjku ');
    if(!name)throw CustomError.badRequest('Missign name ');
    if (price === undefined || price === null) throw CustomError.badRequest('Missing price');
    if (costPrice === undefined || costPrice === null) throw CustomError.badRequest('Missing costPrice');
    if (stock === undefined || stock === null) throw CustomError.badRequest('Missing stock');
    if (minStock === undefined || minStock === null) throw CustomError.badRequest('Missing minStock');
    if(!category)throw CustomError.badRequest('Missign category ');

    const finalStatus = status || "ACTIVE";

    return new ProductEntity(id || _id, sku, name, price, costPrice, stock, minStock, category, finalStatus, description)

  }
}
