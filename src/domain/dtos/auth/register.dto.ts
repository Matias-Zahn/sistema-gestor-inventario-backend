import { regularExps } from "../../../config";
import { CustomError } from "../../errors/customError";

export class RegisterDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  public static create(object: {
    [key: string]: any;
  }): [string?, RegisterDTO?] {
    if (!object) throw CustomError.badRequest("Missing all arguments");
    const { name, email, password } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 8) return ["Password too short"];

    return [undefined, new RegisterDTO(name, email, password)];
  }
}
