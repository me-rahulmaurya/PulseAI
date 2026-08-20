import { Router } from "express";

import authMiddleware from "../../core/middlewares/auth.middleware.js";

import {
  drinkWater,
  todayWater,
} from "./water.controller.js";

const router = Router();

router.post(
  "/drink",
  authMiddleware,
  drinkWater
);

router.get(
  "/today",
  authMiddleware,
  todayWater
);

export default router;