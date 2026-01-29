import { RegisterDTO } from "../../domain";
import { AuthRepository } from '../../domain';

export class AuthService{

    constructor(
        private readonly authRepository: AuthRepository
    ){}

    //TODO TERMINAR ACA EL SERIVICE MAS EL DATASOURCE IMPLEMENTADO 
    public async register(registerDTO: RegisterDTO){
        const user = await this.authRepository.register(registerDTO)


    }


}