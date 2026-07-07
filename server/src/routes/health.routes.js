import { Router } from "express";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /api/v1/health
|--------------------------------------------------------------------------
*/

router.get("/", (req, res) => {
    return res.status(200).json({
        success: true,

        message: "PulseAI API is healthy.",

        data: {
            uptime: process.uptime(),

            timestamp: new Date().toISOString(),

            environment: process.env.NODE_ENV,
        },
    });
});

export default router;