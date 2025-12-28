import { isValidObjectId } from 'mongoose';

import { CategoryDataSource, CreateCategoryDTO, CustomError, UpdateCategoryDTO, CategoryEntity } from "../../domain";
import { CategoryModel } from "../../data/mongo/models/category.model";

export class MongoCategoriesDataSource implements CategoryDataSource {
    async getAllCategory(): Promise<CategoryEntity[]> {
        const categories = await CategoryModel.find().lean();
        return categories.map((category) => CategoryEntity.fromObject(category));
    }

    async getOneCategory(term: string): Promise<CategoryEntity> {

        const filter = isValidObjectId(term) ? { _id: term } : { name: term };
        const existCategory = await CategoryModel.findOne(filter).lean();

        if(!existCategory) throw CustomError.notFound( `Categoria no encontrada por el termino: ${term}` );

        return CategoryEntity.fromObject(existCategory);

    }
    async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<CategoryEntity> {
        const existCategory = await CategoryModel.findOne({name: createCategoryDTO.name});
        if(existCategory) throw CustomError.badRequest('La categoria ya existe')
        const newCategory = await CategoryModel.create(createCategoryDTO);
        if(!newCategory) throw CustomError.internalServerError('Algo ocurrio con la creacion de la categoria');

        return CategoryEntity.fromObject(newCategory);
    }

    async updateCategory(updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryEntity> {

        const category = await this.getOneCategory(updateCategoryDTO.term);
        
        const updated = await CategoryModel.findByIdAndUpdate(category.id, updateCategoryDTO.values, {new: true});

        if(!updated) throw CustomError.internalServerError('ALgo ocurrio cuando se intentaba actualizar la categoria')

        return CategoryEntity.fromObject(updated);

    }

    async deleteCategory(term: string): Promise<null> {
        const category = await this.getOneCategory(term);

        await CategoryModel.findByIdAndDelete(category.id);

        return null;
    }

}