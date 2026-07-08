import { Router } from "express";

import {
  register,
  login,
} from "./auth.controller.js";

import validate from "../../core/middlewares/validate.middleware.js";

import {
  registerValidation,
  loginValidation,
} from "./auth.validation.js";

const router = Router();

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