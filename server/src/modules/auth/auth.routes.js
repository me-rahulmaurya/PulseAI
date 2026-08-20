import { Router } from "express";

import {
  register,
  login,
  me,
  logout,
  refreshToken,
} from "./auth.controller.js";

import {
  registerValidation,
  loginValidation,
} from "./auth.validation.js";

import validate from "../../core/middlewares/validate.middleware.js";
import authMiddleware from "../../core/middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  me
);

router.post(
  "/register",
  registerValidation,
  validate,
  register
);

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.post(
  "/refresh-token",
  refreshToken
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

export default router;