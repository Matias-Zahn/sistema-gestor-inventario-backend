import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "./envs";

export class JWTAdapter {
  public static async generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SECRET_KEY,
        { expiresIn: duration } as SignOptions,
        (err, token) => {
          if (err) return resolve(null);

          resolve(token);
        },
      );
    });
  }

  public static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
