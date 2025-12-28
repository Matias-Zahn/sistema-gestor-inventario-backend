import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryDataSource } from '../../domain/datasources/category.datasource';
import { CreateCategoryDTO } from '../../domain/dtos/category/createCategory.dto';

export class CategoryRepositoryImpl implements CategoryRepository {

    constructor(
      private readonly categoryDataSource: CategoryDataSource,
    ){}

    async getAllCategory(): Promise<CategoryEntity[]> {
        return await this.categoryDataSource.getAllCategory();
    }
    async getOneCategory(id: string): Promise<CategoryEntity> {
        return await this.categoryDataSource.getOneCategory(id);
    }
    async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<CategoryEntity> {
        return await this.categoryDataSource.createCategory(createCategoryDTO);
    }
    async updateCategory(): Promise<CategoryEntity> {
        return await this.categoryDataSource.updateCategory();
    }
    async deleteCategory(id: string): Promise<null> {
        return await this.categoryDataSource.deleteCategory(id);
    }
}