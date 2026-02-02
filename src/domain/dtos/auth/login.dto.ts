import { regularExps } from "../../../config";

export class LoginDTO {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  public static create(objt: {
    [key: string]: any;
  }): [string | undefined, LoginDTO?] {
    const { email, password } = objt;

    if (!email) return ["Email is required"];
    if (!password) return ["Password is required"];

    if (password.length < 8) return ["Password to short"];

    if (!regularExps.email.exec(email)) return ["Invalid Email"];

    return [undefined, new LoginDTO(email, password)];
  }
}
