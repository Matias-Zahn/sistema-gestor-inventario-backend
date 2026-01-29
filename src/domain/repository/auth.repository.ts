import { UserEntity } from "../entities/user.entity";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { LoginDTO } from "../dtos/auth/login.dto";

export abstract class AuthRepository {
  abstract register(registerDto: RegisterDTO): Promise<UserEntity>;
  abstract findUserByEmail(loginDTO: LoginDTO): Promise<UserEntity | null>;
}
