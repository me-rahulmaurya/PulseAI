import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../core/errors/ApiError.js";
import { sendSuccess } from "../../core/responses/sendResponse.js";

import {
  healthChat,
  nutritionPlan,
} from "./ai.service.js";

export const chat = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message?.trim()) {
    throw new ApiError(
      400,
      "Message is required."
    );
  }

  const result = await healthChat(
    req.user._id,
    message
  );

  return sendSuccess(
    res,
    "AI response generated.",
    result
  );
});

export const generateNutrition = asyncHandler(
  async (req, res) => {
    const result = await nutritionPlan(
      req.user._id,
      req.body.preferences || "vegetarian"
    );

    return sendSuccess(
      res,
      "Nutrition plan generated.",
      result
    );
  }
);