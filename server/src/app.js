import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import apiRouter from "./routes/index.js";
import notFoundMiddleware from "./core/middlewares/notFound.middleware.js";
import errorMiddleware from "./core/middlewares/error.middleware.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api", apiRouter);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;