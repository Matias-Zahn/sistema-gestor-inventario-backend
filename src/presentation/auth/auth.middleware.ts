import { NextFunction, Request, Response } from "express";
import { JWTAdapter } from "../../config";

export class AuthMiddleware {
  public static async validateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.status(400).json({ error: "No token provided" });
    }

    if (authorization.startsWith("Bearer ")) {
      return res.status(400).json({ error: "Invalid Bearer Token" });
    }

    const token = authorization.split(" ")[1] || "";

    try {
      const payload = await JWTAdapter.validateToken<{ id: string }>(token);

      if (!payload) return res.status(401).json({ error: "Invalid Token" });
      const { id } = payload;

      //TODO: Una vez implementada la logica de Authservice con sus controladores, ademas del modelo USER podre continuar aca
    } catch (error) {}
  }
}
