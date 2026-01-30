import { UserModel } from "../../data/mongoData/models/user.model";
import {
  AuthDataSource,
  CustomError,
  LoginDTO,
  RegisterDTO,
  UserEntity,
} from "../../domain";

export class MongoAuthDatasource implements AuthDataSource {
  async findUserByID(id: string): Promise<UserEntity | null> {
    console.log("LLEGUE ACA");

    const user = await UserModel.findById(id);

    if (!user) return null;

    return UserEntity.fromObject(user);
  }

  async register(registerDto: RegisterDTO): Promise<UserEntity> {
    const { email, name, password } = registerDto;

    const user = await UserModel.findOne({
      email,
    });

    if (user) throw CustomError.badRequest("User exists");

    const userModel = await UserModel.create({
      name,
      email,
      password,
    });

    return UserEntity.fromObject(userModel);
  }
  async findUserByEmail(loginDTO: LoginDTO): Promise<UserEntity | null> {
    const user = await UserModel.findOne({
      email: loginDTO.email,
    });

    if (!user) return null;

    return UserEntity.fromObject(user);
  }
}
