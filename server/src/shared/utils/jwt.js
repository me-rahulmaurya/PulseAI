import jwt from "jsonwebtoken";

import config from "../../core/config/env.js";

export const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    config.jwt.accessSecret,
    {
      expiresIn: config.jwt.accessExpiresIn,
    }
  );
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    config.jwt.refreshSecret,
    {
      expiresIn: config.jwt.refreshExpiresIn,
    }
  );
};