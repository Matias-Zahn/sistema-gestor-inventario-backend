import { AuthDataSource, AuthRepository, RegisterDTO, UserEntity } from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
    
    constructor(
        private readonly dataSource: AuthDataSource
    ){}
    
    register(registerDto: RegisterDTO): Promise<UserEntity> {
        return this.dataSource.register(registerDto);
    }
    login(registerDto: RegisterDTO): Promise<UserEntity> {
        return this.dataSource.login(registerDto)
    }

}