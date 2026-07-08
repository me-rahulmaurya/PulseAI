import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../errors/ApiError.js";

import User from "../../modules/auth/auth.model.js";

import { verifyAccessToken } from "../../shared/utils/jwt.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Access token missing.");
  }

  const payload = verifyAccessToken(token);

  const user = await User.findById(payload._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});

export default authMiddleware;