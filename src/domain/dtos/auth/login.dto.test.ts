import { LoginDTO } from "./login.dto";

describe("login.dto.ts", () => {
  it("Should create a LoginDTO object when data is correct ", () => {
    const data = {
      email: "test@test.com",
      password: "Matias123",
    };

    const [error, loginDTO] = LoginDTO.create(data);

    expect(loginDTO).toBeDefined();
    expect(error).not.toBeDefined();
    expect(loginDTO).toBeInstanceOf(LoginDTO);
    expect(loginDTO).toEqual({
      email: "test@test.com",
      password: "Matias123",
    });
  });

  it("Should return error for missing EMAIL", () => {
    const data = {
      password: "Matias123",
    };

    const [error, loginDTO] = LoginDTO.create(data);

    expect(loginDTO).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error).toBe("Email is required");
  });

  it("Should return error for missing PASSWORD", () => {
    const data = {
      email: "test@test.com",
    };

    const [error, loginDTO] = LoginDTO.create(data);

    expect(loginDTO).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error).toBe("Password is required");
  });

  it("Should return error for to short password", () => {
    const data = {
      email: "test@test.com",
      password: "hola",
    };

    const [error, loginDTO] = LoginDTO.create(data);

    expect(loginDTO).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error).toBe("Password to short");
  });

  it("Should return error for invalid email", () => {
    const data = {
      email: "zahnmat.com",
      password: "Matias1223",
    };

    const [error, loginDTO] = LoginDTO.create(data);

    expect(loginDTO).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error).toBe("Invalid Email");
  });
});
