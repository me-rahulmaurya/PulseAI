import { validationResult } from "express-validator";
import ApiError from "../errors/ApiError.js";

const validate = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return next(
      new ApiError(
        400,
        "Validation failed",
        result.array()
      )
    );
  }

  next();
};

export default validate;