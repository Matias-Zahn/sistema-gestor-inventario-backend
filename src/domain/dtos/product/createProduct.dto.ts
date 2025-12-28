export class CreateProductDTO {
  private constructor(
    public readonly name: string,
    public readonly sku: string,
    public readonly price: number,
    public readonly costPrice: number,
    public readonly stock: number,
    public readonly category: string
  ) {}

  public static create(object: {
    [key: string]: any;
  }): [string?, CreateProductDTO?] {
    const { name, sku, price, stock, category, costPrice } = object;

        if(!name) return ['Missign Name']
        if(!sku) return ['Missign sku']
        if(!price) return ['Missign price']
        if(price < 0 || isNaN(price)) return ['Price must be a valid positive number']
        if(!stock) return ['Missign stock']
        if(!category) return ['Missign category']
        if(!costPrice) return ['Missign price']
         if(costPrice < 0 || isNaN(costPrice)) return ['costPrice must be a valid positive number']

    return [undefined, new CreateProductDTO(name, sku, price, costPrice,stock, category)];
  }
}
