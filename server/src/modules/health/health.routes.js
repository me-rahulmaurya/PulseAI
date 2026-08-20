import { Router } from "express";

import authMiddleware from "../../core/middlewares/auth.middleware.js";

import validate from "../../core/middlewares/validate.middleware.js";

import {
  healthProfileValidation,
  updateHealthProfileValidation,
} from "./health.validation.js";

import {
  createProfile,
  getProfile,
  updateProfile,
} from "./health.controller.js";

const router = Router();

router.post(
  "/profile",
  authMiddleware,
  healthProfileValidation,
  validate,
  createProfile
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateHealthProfileValidation,
  validate,
  updateProfile
);

export default router;