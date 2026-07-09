import { body } from "express-validator";

export const medicationValidation = [

    body("name")
        .trim()
        .notEmpty(),

    body("time")
        .notEmpty(),

    body("frequency")
        .isIn([
            "once",
            "twice",
            "thrice",
        ]),
];