import ApiError from "../errors/ApiError.js";

const notFoundMiddleware = (req, res, next) => {
  next(
    new ApiError(
      404,
      `Cannot ${req.method} ${req.originalUrl}`
    )
  );
};

export default notFoundMiddleware;