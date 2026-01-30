import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config";
import { AuthRepository, UserEntity } from "../../domain";

export class AuthMiddleware {
  constructor(private readonly authRepository: AuthRepository) {}

  public validateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.status(400).json({ error: "No token provided" });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(400).json({ error: "Invalid Bearer Token" });
    }

    const token = authorization.split(" ")[1] || "";

    try {
      const payload = await JWTAdapter.validateToken<{ id: string }>(token);

      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      const { id } = payload;

      const user = await this.authRepository.findUserByID(id);

      if (!user) return res.status(404).json({ error: "User not found" });

      if (user.status === "INACTIVE") {
        return res.status(401).json({ error: "User is INACTIVE" });
      }

      req.body = req.body || {};

      req.body.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
