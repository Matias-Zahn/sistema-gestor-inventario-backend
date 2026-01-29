export class LoginDTO {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  public static create(objt: {
    [key: string]: any;
  }): [string | undefined, LoginDTO?] {
    if (!objt) return ["Missing all arguments"];
    const { email, password } = objt;

    if (!email) return ["Email is required"];
    if (!password) return ["Password is required"];

    return [undefined, new LoginDTO(email, password)];
  }
}
