import mongoose from "mongoose";
import config from "../config/env.js";
import logger from "../logger/logger.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongodb.uri);

    logger.success(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    logger.error(`MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;