import { RegisterDTO } from "../dtos/auth/register.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource{
    abstract register(registerDto: RegisterDTO): Promise<UserEntity>;
    abstract login(registerDto: RegisterDTO): Promise<UserEntity>;
}