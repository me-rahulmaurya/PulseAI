import asyncHandler from "../../shared/utils/asyncHandler.js";

import { sendSuccess } from "../../core/responses/sendResponse.js";

import { registerUser } from "./auth.service.js";
import {
  loginUser,
  getCurrentUser,
} from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return sendSuccess(
    res,
    "User registered successfully",
    result,
    201
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  return sendSuccess(
    res,
    "Login successful",
    result
  );
});

export const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user._id);

  return sendSuccess(
    res,
    "Current user fetched",
    user
  );
});