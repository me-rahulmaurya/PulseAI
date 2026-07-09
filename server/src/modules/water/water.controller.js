import asyncHandler from "../../shared/utils/asyncHandler.js";

import { sendSuccess } from "../../core/responses/sendResponse.js";

import {
  addWater,
  getTodayWater,
} from "./water.service.js";

export const drinkWater = asyncHandler(
  async (req, res) => {
    const water = await addWater(
      req.user._id,
      req.body.amount
    );

    return sendSuccess(
      res,
      "Water intake recorded.",
      water,
      201
    );
  }
);

export const todayWater = asyncHandler(
  async (req, res) => {
    const result = await getTodayWater(
      req.user._id
    );

    return sendSuccess(
      res,
      "Today's water fetched.",
      result
    );
  }
);