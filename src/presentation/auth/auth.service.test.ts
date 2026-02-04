import { BCryptAdapter, JWTAdapter } from "../../config";
import {
  AuthRepository,
  CustomError,
  LoginDTO,
  RegisterDTO,
} from "../../domain";
import { AuthService } from "./auth.service";

const mockRepository = {
  register: jest.fn(),
  findUserByEmail: jest.fn(),
  findUserByID: jest.fn(),
};

describe("auth.service.ts", () => {
  let authService: AuthService;

  let hashPasswordSpy: jest.SpyInstance;
  let compareSpy: jest.SpyInstance;
  let generateTokenSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService(mockRepository as AuthRepository);
    compareSpy = jest.spyOn(BCryptAdapter, "compare").mockReturnValue(true);
    generateTokenSpy = jest
      .spyOn(JWTAdapter, "generateToken")
      .mockResolvedValue("token123");
    hashPasswordSpy = jest
      .spyOn(BCryptAdapter, "hashPassword")
      .mockReturnValue("hashed123");
  });

  const registerDTO = RegisterDTO.create({
    name: "Matias",
    email: "test@test.com",
    password: "Password123",
  })[1];

  const loginDTO = LoginDTO.create({
    email: "test@test.com",
    password: "Password123",
  })[1];

  const mockResponseRepository = {
    id: "123",
    name: "Matias",
    email: "test@test.com",
    emailValidated: false,
    password: "hashed123",
    role: ["USER"],
    status: "ACTIVE",
  };

  describe("register", () => {
    it("should register user correctly", async () => {
      mockRepository.register.mockResolvedValue(mockResponseRepository);

      const result = await authService.register(registerDTO!);

      expect(hashPasswordSpy).toHaveBeenCalledWith(registerDTO!.password);
      expect(mockRepository.register).toHaveBeenCalledWith({
        name: registerDTO!.name,
        email: registerDTO!.email,
        password: "hashed123",
      });

      expect(generateTokenSpy).toHaveBeenCalledWith({ id: "123" });
      expect(result).toEqual({
        user: {
          id: "123",
          name: registerDTO!.name,
          email: registerDTO!.email,
          emailValidated: false,
          role: ["USER"],
          status: "ACTIVE",
        },
        token: "token123",
      });
    });

    it("should throw CustomError.internalServerError if generateToken fail", async () => {
      mockRepository.register.mockResolvedValue(mockResponseRepository);
      generateTokenSpy.mockResolvedValue(null);
      try {
        await authService.register(registerDTO!);
        fail("Should have throw an error!");
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        if (error instanceof CustomError) {
          expect(error.message).toBe("Error while creating JWT");
          expect(error.statusCode).toBe(500);
        }
      }
    });
  });

  describe("login", () => {
    it("should login user correctly", async () => {
      mockRepository.findUserByEmail.mockResolvedValue(mockResponseRepository);

      const result = await authService.login(loginDTO!);

      expect(compareSpy).toHaveBeenCalledWith(loginDTO!.password, "hashed123");

      expect(generateTokenSpy).toHaveBeenCalledWith({ id: "123" });

      expect(result).toEqual({
        user: {
          id: "123",
          name: registerDTO!.name,
          email: registerDTO!.email,
          emailValidated: false,
          role: ["USER"],
          status: "ACTIVE",
        },
        token: "token123",
      });
    });

    //CASOS LOGIN BAD PATH

    it("should throw CustomError.BadRequest if email is incorrect ", async () => {
      mockRepository.findUserByEmail.mockResolvedValue(null);

      try {
        await authService.login(loginDTO!);

        fail("Should have throw an error!");
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);

        if (error instanceof CustomError) {
          expect(error.message).toBe("Email or Password wrong");
          expect(error.statusCode).toBe(400);
        }

        expect(compareSpy).not.toHaveBeenCalled();
        expect(generateTokenSpy).not.toHaveBeenCalled();
      }
    });

    it("should throw CustomError.BadRequest if password is incorrect", async () => {
      mockRepository.findUserByEmail.mockResolvedValue(mockResponseRepository);

      compareSpy.mockReturnValue(false);

      try {
        await authService.login(loginDTO!);
        fail("Should have throw an error!");
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);

        if (error instanceof CustomError) {
          expect(error.message).toBe("Email or Password wrong");
          expect(error.statusCode).toBe(400);
        }

        expect(generateTokenSpy).not.toHaveBeenCalled();
      }
    });

    it("Should throw CustomError.internalServerError if generateToken fail", async () => {
      mockRepository.findUserByEmail.mockResolvedValue(mockResponseRepository);

      generateTokenSpy.mockResolvedValue(null);

      try {
        await authService.login(loginDTO!);
        fail("Should have throw an error!");
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        if (error instanceof CustomError) {
          expect(error.message).toBe("Error while creating JWT");
          expect(error.statusCode).toBe(500);
        }
      }
    });
  });
});
