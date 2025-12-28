import { CategoryDataSource } from "../../domain/datasources/category.datasource";
import { CategoryEntity } from "../../domain/entities/category.entity";

export class MongoCategoriesDataSource implements CategoryDataSource {
    getAllCategory(): Promise<CategoryEntity[]> {
        throw new Error("Method not implemented.");
    }
    getOneCategory(id: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    createCategory(): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    updateCategory(): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(): Promise<null> {
        throw new Error("Method not implemented.");
    }

}