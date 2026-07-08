import { Router } from "express";

import authMiddleware from "../../core/middlewares/auth.middleware.js";

import { dashboard } from "./dashboard.controller.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    dashboard
);

export default router;