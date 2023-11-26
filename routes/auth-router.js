import express from "express";

import authController from "../controllers/auth-controller.js";

import { authenticate, isEmptyBody } from "../middlewares/index.js";

import { validateBody } from "../decorators/index.js";

import {
  userRegisterSchema,
  userLoginSchema,
} from "../utils/validation/userValidationSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  authController.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
