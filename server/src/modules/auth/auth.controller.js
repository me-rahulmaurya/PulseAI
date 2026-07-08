import asyncHandler from "../../shared/utils/asyncHandler.js";

import { sendSuccess } from "../../core/responses/sendResponse.js";

import { registerUser } from "./auth.service.js";

export const register = asyncHandler(
  async (req, res) => {
    const result = await registerUser(req.body);

    return sendSuccess(
      res,
      "User registered successfully.",
      result,
      201
    );
  }
);

export const login = asyncHandler(
  async (req, res) => {}
);