import request from "supertest";
import app from "../../src/app";
import {
  findUserByEmail,
  validateLoginData,
  verifyPassword,
  generateToken,
} from "../../src/utils/authUtils";

jest.mock("../../src/utils/authUtils", () => ({
  findUserByEmail: jest.fn(),
  validateLoginData: jest.fn(),
  verifyPassword: jest.fn(),
  generateToken: jest.fn(),
}));

describe("POST /api/user/login", () => {
  const mockUser = {
    id: 1,
    email: "test@example.com",
    username: "TestUser",
    password: "hashedPassword",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log in a user with correct credentials and return a token", async () => {
    (validateLoginData as jest.Mock).mockReturnValue({
      email: mockUser.email,
      password: "password123",
    });
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue("mockToken");

    const response = await request(app)
      .post("/api/user/login")
      .send({ email: mockUser.email, password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token", "mockToken");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.username,
    });

    expect(validateLoginData).toHaveBeenCalledWith({
      email: mockUser.email,
      password: "password123",
    });
    expect(findUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(verifyPassword).toHaveBeenCalledWith(
      "password123",
      mockUser.password
    );
    expect(generateToken).toHaveBeenCalledWith(mockUser.id, mockUser.email);
  });

  it("should return 401 when the credentials are incorrect", async () => {
    (validateLoginData as jest.Mock).mockReturnValue({
      email: mockUser.email,
      password: "wrongPassword",
    });
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockRejectedValue(
      new Error("Incorrect username or password")
    );

    const response = await request(app)
      .post("/api/user/login")
      .send({ email: mockUser.email, password: "wrongPassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "error",
      "Incorrect username or password"
    );
  });

  
});
