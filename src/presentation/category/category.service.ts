import { CategoryRepository, CreateCategoryDTO } from "../../domain";
import { UpdateCategoryDTO } from '../../domain/dtos/category/updateCategory.dto';

export class CategoryService{

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ){}


    public createCategory(createCategoryDTO: CreateCategoryDTO){
        return this.categoryRepository.createCategory(createCategoryDTO)
    }


    public getOneCategory(term: string){
        return this.categoryRepository.getOneCategory(term);
    }


    public getAllCategory(){
        return this.categoryRepository.getAllCategory();
    }



    public updateCategory(updateCategoryDTO: UpdateCategoryDTO){
        return this.categoryRepository.updateCategory(updateCategoryDTO);
    }

    public deleteCategory(term: string){
        return this.categoryRepository.deleteCategory(term);
    }
}