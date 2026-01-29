import { Request, Response } from "express";
import { CustomError, LoginDTO, RegisterDTO } from "../../domain";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.errorMessage });
    console.log(error);
    return res.status(500).json({ error: `Error de interno de servidor` });
  };

  public register = (req: Request, res: Response) => {
    const [error, registerDTO] = RegisterDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .register(registerDTO!)
      .then((user) => res.status(201).json({ user }))
      .catch((err) => this.handleError(err, res));
  };

  public login = (req: Request, res: Response) => {
    const [error, loginDTO] = LoginDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .login(loginDTO!)
      .then((user) => res.status(200).json(user))
      .catch((err) => this.handleError(err, res));
  };
}
