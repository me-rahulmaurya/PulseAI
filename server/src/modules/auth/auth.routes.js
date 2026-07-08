import { Router } from "express";

import {
  register,
  login,
  me,
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

export default router;