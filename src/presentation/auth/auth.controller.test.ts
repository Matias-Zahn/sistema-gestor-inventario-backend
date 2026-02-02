import { LoginDTO } from "../../domain";
import { AuthController } from "./auth.controller";

describe("auth.controller.ts", () => {
  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return error for invalid LoginDTO", () => {
    const controller = new AuthController(mockAuthService as any);

    const createSpy = jest
      .spyOn(LoginDTO, "create")
      .mockReturnValue(["Password is required", undefined]);

    const mockRequest = {
      body: {
        email: "test@test.com",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    controller.login(mockRequest as any, mockResponse as any);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Password is required",
    });
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it("should be pass with the valid DTO", async () => {
    const controller = new AuthController(mockAuthService as any);

    const loginData = {
      email: "test@test.com",
      password: "Password123",
    };

    const createSpy = jest
      .spyOn(LoginDTO, "create")
      .mockReturnValue([undefined, loginData]);

    const mockUserResponse = {
      user: {
        id: "123asdads321231",
        name: "Matias Zahn",
        email: "test@test.com",
        emailValidated: false,
        role: "USER",
        status: "ACTIVE",
      },
      token: "kaskdkasd",
    };

    mockAuthService.login.mockResolvedValue(mockUserResponse);

    const mockReq = {
      body: loginData,
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await controller.login(mockReq as any, mockRes as any);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
    expect(mockRes.json).toHaveBeenCalledWith(mockUserResponse);
  });
});
