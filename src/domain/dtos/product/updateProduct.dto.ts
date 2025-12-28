
export class UpdateProductDTO {
  private constructor(
    public readonly term: string,
    public readonly name?: string,
    public readonly price?: number,
    public readonly costPrice?: number,
    public readonly category?: string,
    public readonly minStock?: number,
    public readonly status?: string
  ) {}

  
  public static update(object: { [key: string]: any }): [string?, UpdateProductDTO?] {
    
    const { term, ...data } = object;

    if (!term) return ['Missing product term (id or sku)'];

    const { name, category, status } = data;

    // Extraemos números para convertirlos
    let { price, costPrice, minStock } = data;

    // --- Validaciones de Números ---
    // Price
    if (price !== undefined) {
      price = Number(price);
      if (isNaN(price)) return ['Price must be a valid number'];
      if (price < 0) return ['Price cannot be negative'];
    }

    // Cost Price
    if (costPrice !== undefined) {
      costPrice = Number(costPrice);
      if (isNaN(costPrice)) return ['Cost price must be a valid number'];
      if (costPrice < 0) return ['Cost price cannot be negative'];
    }

    // Min Stock
    if (minStock !== undefined) {
      minStock = Number(minStock);
      if (isNaN(minStock)) return ['Min stock must be a valid number'];
      if (minStock < 0) return ['Min stock cannot be negative'];
    }

    // --- Validación de Categoría (Mongo ID) ---
    if (category !== undefined) {
        const mongoRegExp = /^[0-9a-fA-F]{24}$/;
        if (!mongoRegExp.test(category)) return ['Category must be a valid Mongo ID'];
    }

    return [
      undefined,
      new UpdateProductDTO(term, name, price, costPrice, category, minStock, status)
    ];
    }

    public get values(){
      const objt: { [ key: string]: any } = {}
    
        if (this.name) objt.name = this.name;
        if (this.price !== undefined) objt.price = this.price;
        if (this.costPrice !== undefined) objt.costPrice = this.costPrice;
        if (this.category) objt.category = this.category;
        if (this.minStock !== undefined) objt.minStock = this.minStock;
        if (this.status) objt.status = this.status;
    
      return objt
    }
}
