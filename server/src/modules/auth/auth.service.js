import bcrypt from "bcrypt";

import User from "../user/user.model.js";

import ApiError from "../../core/errors/ApiError.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../shared/utils/jwt.js";

export const registerUser = async ({
  name,
  email,
  password,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email already registered."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  user.refreshToken = refreshToken;

  await user.save();

  const userObject = user.toObject();

  delete userObject.password;

  delete userObject.refreshToken;

  return {
    user: userObject,
    accessToken,
    refreshToken,
  };
};