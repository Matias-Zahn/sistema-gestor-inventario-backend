import { UserEntity } from "../entities/user.entity";
import { RegisterDTO } from '../dtos/auth/register.dto';

export abstract class AuthRepository{
    abstract register(registerDto: RegisterDTO): Promise<UserEntity>;
    abstract login(registerDTO: RegisterDTO): Promise<UserEntity>;
}