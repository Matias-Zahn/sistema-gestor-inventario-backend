
export class UpdateProductDTO {
  private constructor(
    public readonly term: string,
    public readonly name: string,
    public readonly price: number,
    public readonly costPrice: number,
    public readonly category: string,
    public readonly minStock: number,
    public readonly status: string
  ) {}


  
  
  
  public static update(object: { [key: string]: any }): [string?, UpdateProductDTO?] {
      const { term, name, price, costPrice, category, minStock, status } = object;
      
      if (price !== undefined && isNaN(Number(price))) return ['Price debe ser un numero'];
      if(price < 0) return ['Precio debe ser un numero positivo']
      if (costPrice !== undefined && isNaN(Number(costPrice))) return ['CostPrice debe ser un numero'];
      if(costPrice < 0) return ['costPrice debe ser un numero positivo']
      if(category !== undefined && category.length <= 2) return ['La categoria debe tener mas de 2 letras']
      
      
      return [undefined, new UpdateProductDTO(term, name, price, costPrice, category, minStock, status)]
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
