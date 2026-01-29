import { LoginDTO } from "../dtos/auth/login.dto";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource {
  abstract register(registerDto: RegisterDTO): Promise<UserEntity>;
  abstract findUserByEmail(loginDTO: LoginDTO): Promise<UserEntity | null>;
}
