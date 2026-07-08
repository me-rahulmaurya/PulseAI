import bcrypt from "bcrypt";

import User from "./auth.model.js";

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
  const exists = await User.findOne({ email });

  if (exists) {
    throw new ApiError(409, "Email already exists");
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

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  user.refreshToken = refreshToken;

  await user.save();

  const userData = user.toObject();

  delete userData.password;
  delete userData.refreshToken;

  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({
  email,
  password,
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const matched = await bcrypt.compare(
    password,
    user.password
  );

  if (!matched) {
    throw new ApiError(401, "Invalid credentials.");
  }

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

  const userData = user.toObject();

  delete userData.password;

  delete userData.refreshToken;

  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

export const getCurrentUser = async (userId) => {
  return await User.findById(userId).select(
    "-password -refreshToken"
  );
};