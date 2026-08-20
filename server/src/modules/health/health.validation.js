import { body } from "express-validator";

export const healthProfileValidation = [
  body("age").isInt({ min: 1, max: 120 }),

  body("gender").isIn(["male", "female"]),

  body("height").isFloat({ min: 50 }),

  body("weight").isFloat({ min: 20 }),

  body("activityLevel").isIn([
    "sedentary",
    "light",
    "moderate",
    "active",
    "very_active",
  ]),

  body("goal").isIn([
    "lose_weight",
    "maintain",
    "gain_weight",
  ]),
];

export const updateHealthProfileValidation = [
  body("age").optional().isInt({ min: 1, max: 120 }),

  body("gender")
    .optional()
    .isIn(["male", "female"]),

  body("height")
    .optional()
    .isFloat({ min: 50 }),

  body("weight")
    .optional()
    .isFloat({ min: 20 }),

  body("activityLevel")
    .optional()
    .isIn([
      "sedentary",
      "light",
      "moderate",
      "active",
      "very_active",
    ]),

  body("goal")
    .optional()
    .isIn([
      "lose_weight",
      "maintain",
      "gain_weight",
    ]),
];