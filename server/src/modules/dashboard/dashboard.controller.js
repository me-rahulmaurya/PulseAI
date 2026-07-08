import asyncHandler from "../../shared/utils/asyncHandler.js";

import { sendSuccess } from "../../core/responses/sendResponse.js";

import { getDashboard } from "./dashboard.service.js";

export const dashboard = asyncHandler(
    async (req, res) => {

        const data =
            await getDashboard(req.user._id);

        return sendSuccess(
            res,
            "Dashboard fetched successfully.",
            data
        );
    }
);