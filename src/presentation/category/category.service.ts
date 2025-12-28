import { CategoryRepository, CreateCategoryDTO } from "../../domain";

export class CategoryService{

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ){}


    public createCategory(createCategoryDTO: CreateCategoryDTO){
        return this.categoryRepository.createCategory(createCategoryDTO)
    }

}