import { compareSync, genSaltSync, hashSync } from "bcrypt";

export class BCryptAdapter {
  public static hashPassword(password: string, saltRounds: number = 10) {
    const salt = genSaltSync(saltRounds);
    return hashSync(password, salt);
  }

  public static compare(password: string, passwordReal: string): boolean {
    return compareSync(password, passwordReal);
  }
}
