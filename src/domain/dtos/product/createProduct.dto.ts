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


    if (!object) return ['No se enviaron datos'];

    const { name, sku, category } = object;
    // Extraemos estos aparte para convertirlos
    let { price, costPrice, stock } = object;

    // --- Validaciones de Strings ---
    if (!name) return ['Missing Name'];
    if (!sku) return ['Missing SKU'];
    if (!category) return ['Missing Category'];
    
    // Validación de MongoID (Regex de 24 caracteres hex)
    if (!/^[0-9a-fA-F]{24}$/.test(category)) return ['Invalid Category ID'];

    // --- Conversión y Validación de Números ---
    // Convertimos a número por si vienen como strings ("100")
    price = Number(price);
    costPrice = Number(costPrice);
    stock = Number(stock);

    // Validación Precio
    // Usamos isNaN para ver si la conversión falló
    if (isNaN(price) || price < 0) return ['Price must be a valid positive number'];
    
    // Validación Costo
    if (isNaN(costPrice) || costPrice < 0) return ['Cost Price must be a valid positive number'];

    // Validación Stock
    // Solo fallamos si es negativo o no es número.
    if (isNaN(stock) || stock < 0) return ['Stock must be a valid positive number'];

    return [undefined, new CreateProductDTO(name, sku, price, costPrice,stock, category)];
  }
}
