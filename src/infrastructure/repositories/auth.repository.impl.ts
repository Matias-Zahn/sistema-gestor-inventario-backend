import {
  AuthDataSource,
  AuthRepository,
  LoginDTO,
  RegisterDTO,
  UserEntity,
} from "../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly dataSource: AuthDataSource) {}

  register(registerDto: RegisterDTO): Promise<UserEntity> {
    return this.dataSource.register(registerDto);
  }
  findUserByEmail(loginDTO: LoginDTO): Promise<UserEntity | null> {
    return this.dataSource.findUserByEmail(loginDTO);
  }
}
