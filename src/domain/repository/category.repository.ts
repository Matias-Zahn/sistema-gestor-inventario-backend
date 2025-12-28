import { CategoryEntity } from "../entities/category.entity";
import { CreateCategoryDTO } from '../dtos/category/createCategory.dto';
import { UpdateCategoryDTO } from "../dtos/category/updateCategory.dto";

export abstract class CategoryRepository {
    abstract getAllCategory(): Promise<CategoryEntity[]>;
    abstract getOneCategory(term: string): Promise<CategoryEntity>;
    abstract createCategory(createCategoryDTO: CreateCategoryDTO): Promise<CategoryEntity>;
    abstract updateCategory(updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryEntity>;
    abstract deleteCategory(term: string): Promise<null>;
}