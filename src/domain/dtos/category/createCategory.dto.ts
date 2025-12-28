export class CreateCategoryDTO {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly description?: string,
    public readonly slug?: string,
    public readonly parent?: string
  ) {}

  public static create(object: {
    [key: string]: any;
  }): [string?, CreateCategoryDTO?] {

    if(!object) return ['No se enviaron datos (body vacío)'];

    const { name, available, slug, description, parent } = object;
    if (!name) return ["Falta el nombre"];
    
    // const nameLowerCase = name.toLowerCase();
    if (name.length < 3) return ["El nombre es muy corto"];

    if (description && description.length < 3) ["La descripcion es muy corta"];

    let availableBoolean = available;

    if (typeof available === "string") {
      availableBoolean = available.toLowerCase() === "true";
    }
    
    if (typeof availableBoolean !== "boolean") {
      availableBoolean = false;
    }


    return [undefined, new CreateCategoryDTO(name, availableBoolean, description, slug, parent)];
  }
}
