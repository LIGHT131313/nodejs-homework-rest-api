import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";
import User from "../models/User.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /users/login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test /users/login with correctData", async () => {
    const loginData = {
      email: "user@gmail.com",
      password: "123456",
    };

    const { body, statusCode } = await request(app)
      .post("/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);

    const user = await User.findOne({ email: loginData.email });
    expect(body.token).toBe(user.token);

    expect(body.user.email).toBe(user.email);
    expect(typeof body.user.email).toBe("string");

    expect(body.user.subscription).toBe(user.subscription);
    expect(typeof body.user.subscription).toBe("string");
  });
});
