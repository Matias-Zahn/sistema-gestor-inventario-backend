import { CategoryEntity } from "../entities/category.entity";
import { CreateCategoryDTO } from '../dtos/category/createCategory.dto';

export abstract class CategoryDataSource {
    abstract getAllCategory(): Promise<CategoryEntity[]>;
    abstract getOneCategory(id: string): Promise<CategoryEntity>;
    abstract createCategory(createCategoryDTO: CreateCategoryDTO): Promise<CategoryEntity>;
    abstract updateCategory(): Promise<CategoryEntity>;
    abstract deleteCategory(id: string): Promise<null>;
}