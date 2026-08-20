import { Router } from "express";

import authMiddleware from "../../core/middlewares/auth.middleware.js";

import {
  chat,
  generateNutrition,
} from "./ai.controller.js";

const router = Router();

router.post(
  "/chat",
  authMiddleware,
  chat
);

router.post(
  "/nutrition",
  authMiddleware,
  generateNutrition
);

export default router;