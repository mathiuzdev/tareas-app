import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/User";
import Task from "../../src/models/Task";
import Tag from "../../src/models/Tag";
import { Sequelize } from "sequelize";
import bcrypt from "bcryptjs";
jest.mock("../../src/models/User");
jest.mock("../../src/models/Task");
jest.mock("../../src/models/Tag");

describe("POST /api/user/register", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    const config = require("../../dist/config/database.config").test;

    sequelize = new Sequelize(config);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should register a new user successfully", async () => {
    const newUser = {
      username: "waera amor",
      email: "luna@gmail.com",
      password: "Jeropita123$",
    };

    User.create = jest.fn().mockResolvedValue({
      ...newUser,
      password: await bcrypt.hash(newUser.password, 10),
    });

    const response = await request(app)
      .post("/api/user/register")
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username", newUser.username);
    expect(response.body).toHaveProperty("email", newUser.email);
  });

  it("should return 400 if validation fails", async () => {
    const invalidUser = {
      email: "invalid-email",
    };

    const response = await request(app)
      .post("/api/user/register")
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return 409 if email is already registered", async () => {
    const existingUser = {
      username: "mati amor",
      email: "mati@gmail.com",
      password: "123456789", 
    };
  

    User.findOne = jest.fn().mockResolvedValue(existingUser);
  
    const response = await request(app)
      .post("/api/user/register")
      .send({
        username: "newuser", 
        email: "mati@gmail.com", 
        password: "newPassword123",
      });
  
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error", "Email already registered");
  });

  it("should return 500 if there is an internal server error", async () => {
    jest.spyOn(User, "create").mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/api/user/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Error registering user");
  });
});
