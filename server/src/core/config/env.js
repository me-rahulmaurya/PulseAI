import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "PORT",
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(
      `Missing required environment variable: ${variable}`
    );
  }
});

const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV,

  port: Number(process.env.PORT),

  mongodb: {
    uri: process.env.MONGODB_URI,
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,

    refreshSecret: process.env.JWT_REFRESH_SECRET,

    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,

    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },

  redis: {
    url: process.env.REDIS_URL,
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,

    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,

    apiKey: process.env.CLOUDINARY_API_KEY,

    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});

export default config;