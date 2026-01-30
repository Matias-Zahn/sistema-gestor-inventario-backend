import { CustomError } from "../errors/customError";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public status: string,
    public img?: string,
  ) {}

  //Sirve para transformar una entidad de Mongo a una entidad definida en nuestro Domain
  public static fromObject(object: { [key: string]: any }): UserEntity {
    const {
      id,
      _id,
      name,
      email,
      emailValidated,
      password,
      role,
      img,
      status,
    } = object;

    if (!id && !_id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!email) throw CustomError.badRequest("Missing email");
    if (emailValidated === undefined)
      throw CustomError.badRequest("Missing emailValidated");
    if (!password) throw CustomError.badRequest("Missing password");
    if (!role) throw CustomError.badRequest("Missing role");
    if (!status) throw CustomError.badRequest("Missing status");

    return new UserEntity(
      id || _id,
      name,
      email,
      emailValidated,
      password,
      role,
      status,
      img,
    );
  }
}
