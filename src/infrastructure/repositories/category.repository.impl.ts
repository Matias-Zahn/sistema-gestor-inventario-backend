import {
  CategoryDataSource,
  CategoryEntity,
  CategoryRepository,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../../domain";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDataSource: CategoryDataSource) {}

  async getAllCategory(): Promise<CategoryEntity[]> {
    return await this.categoryDataSource.getAllCategory();
  }
  async getOneCategory(term: string): Promise<CategoryEntity> {
    return await this.categoryDataSource.getOneCategory(term);
  }
  async createCategory(
    createCategoryDTO: CreateCategoryDTO
  ): Promise<CategoryEntity> {
    return await this.categoryDataSource.createCategory(createCategoryDTO);
  }
  async updateCategory(
    updateCategoryDTO: UpdateCategoryDTO
  ): Promise<CategoryEntity> {
    return await this.categoryDataSource.updateCategory(updateCategoryDTO);
  }
  async deleteCategory(term: string): Promise<null> {
    return await this.categoryDataSource.deleteCategory(term);
  }
}
