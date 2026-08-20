import http from "http";

import app from "./app.js";

import config from "./core/config/env.js";

import connectDB from "./core/database/mongodb.js";

import logger from "./core/logger/logger.js";
import banner from "./core/config/banner.js";

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  server.listen(config.port, () => {
    logger.success(
      `PulseAI running on port ${config.port} (${config.nodeEnv})`
    );
  });

  process.on("SIGINT", async () => {
    logger.warn("Gracefully shutting down...");

    server.close(() => {
      logger.success("Server closed.");

      process.exit(0);
    });
  });
};

console.log(banner);
startServer();