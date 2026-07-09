import { Router } from "express";

import authMiddleware from "../../core/middlewares/auth.middleware.js";

import validate from "../../core/middlewares/validate.middleware.js";

import {
    medicationValidation,
} from "./medication.validation.js";

import {

    createMedication,

    listMedication,

    takeMedication,

} from "./medication.controller.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    medicationValidation,
    validate,
    createMedication
);

router.get(
    "/",
    authMiddleware,
    listMedication
);

router.patch(
    "/:id/take",
    authMiddleware,
    takeMedication
);

export default router;