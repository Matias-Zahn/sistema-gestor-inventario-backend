import { CustomError } from "../errors/customError"

export class CategoryEntity {

    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly available: boolean,
        public readonly description?: string,
        public readonly slug?: string,
        public readonly parentId?: string,  
    ){}


    static fromObject(object: {[key: string]: any} ): CategoryEntity {
        const { _id, id, name, available, description, slug, parentId } = object

        const isAvaliableBoolean = String(available).toLocaleLowerCase() === 'true';

        if(!id && !_id) throw CustomError.badRequest('Falta el id');
        if(!name) throw CustomError.badRequest('Falta el nombre');
        if(name.lenght < 3 ) throw CustomError.badRequest('El nombre es muy corto');
        
        return new CategoryEntity(id || _id, name, isAvaliableBoolean, description, slug, parentId);
    }

}