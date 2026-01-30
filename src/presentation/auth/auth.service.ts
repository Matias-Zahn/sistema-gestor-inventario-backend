import { BCryptAdapter, JWTAdapter } from "../../config";
import { CustomError, RegisterDTO } from "../../domain";
import { AuthRepository } from "../../domain";
import { LoginDTO } from "../../domain/dtos/auth/login.dto";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  //TODO TERMINAR ACA EL SERIVICE MAS EL DATASOURCE IMPLEMENTADO
  public async register(registerDTO: RegisterDTO) {
    const { password: passwordDTO, ...rest } = registerDTO;

    const passwordHashed = BCryptAdapter.hashPassword(passwordDTO);

    const user = await this.authRepository.register({
      ...rest,
      password: passwordHashed,
    });

    const { password, ...restUser } = user;

    const token = await JWTAdapter.generateToken({ id: user.id });
    if (!token)
      throw CustomError.internalServerError("Error while creating JWT");

    return { user: restUser, token: token };
  }

  public async login(loginDTO: LoginDTO) {
    const user = await this.authRepository.findUserByEmail(loginDTO);

    if (!user) throw CustomError.badRequest("Email or Password wrong");

    const verifyPass = BCryptAdapter.compare(loginDTO.password, user.password);

    if (!verifyPass) throw CustomError.badRequest("Email or Password wrong");

    const { password, ...rest } = user;

    const token = await JWTAdapter.generateToken({ id: user.id });
    if (!token)
      throw CustomError.internalServerError("Error while creating JWT");

    return {
      user: rest,
      token,
    };
  }
}
