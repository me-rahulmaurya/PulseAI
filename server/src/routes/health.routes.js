import { Router } from "express";

import config from "../core/config/env.js";
import { sendSuccess } from "../core/responses/sendResponse.js";

const router = Router();

router.get("/", (req, res) => {
    return sendSuccess(
        res,
        "PulseAI API is healthy.",
        {
            uptime: process.uptime(),

            timestamp: new Date().toISOString(),

            environment: config.nodeEnv,
        }
    );
});

export default router;