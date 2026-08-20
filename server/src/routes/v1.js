import { Router } from "express";

import authRouter from "../modules/auth/auth.routes.js";
import healthRouter from "../modules/health/health.routes.js";
import dashboardRouter from "../modules/dashboard/dashboard.routes.js";
import waterRouter from "../modules/water/water.routes.js";
import medicationRouter from "../modules/medication/medication.routes.js";
import aiRouter from "../modules/ai/ai.routes.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

router.use("/auth", authRouter);
router.use("/health", healthRouter);
router.use("/dashboard", dashboardRouter);
router.use("/water", waterRouter);
router.use("/medications", medicationRouter);
router.use("/ai",aiRouter);

export default router;