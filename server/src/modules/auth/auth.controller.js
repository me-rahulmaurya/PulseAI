import asyncHandler from "../../shared/utils/asyncHandler.js";

import { sendSuccess } from "../../core/responses/sendResponse.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
} from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false, // change to true after deployment
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  delete result.refreshToken;

  return sendSuccess(
    res,
    "User registered successfully",
    result,
    201
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  delete result.refreshToken;

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

export const refreshToken = asyncHandler(
  async (req, res) => {
    const accessToken =
      await refreshAccessToken(
        req.cookies.refreshToken
      );

    return sendSuccess(
      res,
      "Access token refreshed",
      {
        accessToken,
      }
    );
  }
);

export const logout = asyncHandler(
  async (req, res) => {
    await logoutUser(req.user._id);

    res.clearCookie("refreshToken");

    return sendSuccess(
      res,
      "Logged out successfully"
    );
  }
);