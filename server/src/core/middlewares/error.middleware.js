import ApiError from "../errors/ApiError.js";
import { sendError } from "../responses/sendResponse.js";

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return sendError(
            res,
            err.message,
            err.errors,
            err.statusCode
        );
    }

    console.error(err);

    return sendError(
        res,
        "Internal Server Error"
    );
};

export default errorMiddleware;