import { Router } from "express";

import healthRouter from "./health.routes.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

router.use("/health", healthRouter);

export default router;