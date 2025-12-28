export class UpdateCategoryDTO {
  private constructor(
    public readonly term: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly available?: boolean,
    public readonly slug?: string,
    public readonly parent?: string
  ) {}

  public static update(object: { [key: string]: any }): [string?, UpdateCategoryDTO?] {
    // Si el objeto es undefined, retornamos error 
    if (!object || Object.keys(object).length === 1) return ["No se enviaron datos para actualizar"];

    const {term, name, available, slug, description, parent } = object;

    //Validamos SOLO si el campo viene en la petición
    if (name && name.length < 3) return ["El nombre es muy corto"];
    
    if (description && description.length < 3) return ["La descripción es muy corta"];

    //Lógica para procesar el booleano SOLO si existe
    let availableBoolean = available;

    if (available !== undefined) {
      if (typeof available === 'string') {
        availableBoolean = available.toLowerCase() === 'true';
      }
      if (typeof availableBoolean !== 'boolean') {
        return ['Available debe ser true o false']
      }
    }

    return [
      undefined,
      new UpdateCategoryDTO(term, name, description, availableBoolean, slug, parent),
    ];
  }

  get values() {
    const returnObj: { [key: string]: any } = {};

    // 5. Corrección de los Copy-Paste y lógica de asignación
    if (this.name) returnObj.name = this.name;
    if (this.description) returnObj.description = this.description;
    if (this.slug) returnObj.slug = this.slug;
    if (this.parent) returnObj.parent = this.parent;

    // 6. CORRECCIÓN CRÍTICA DE BOOLEANOS
    // Si usas "if (this.available)", el valor 'false' nunca pasaría.
    if (this.available !== undefined) {
        returnObj.available = this.available;
    }

    return returnObj;
  }
}