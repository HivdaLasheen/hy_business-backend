import { param } from "express-validator";

const numericParamValidator = (paramName: string) =>
  param(paramName)
    .notEmpty()
    .withMessage(`${paramName} is required`)
    .isInt()
    .withMessage(`${paramName} must be an integer`)
    .toInt();

const stringValidator = (paramName: string) =>
  param(paramName).isString().withMessage(`${paramName} must be a string`);

export { numericParamValidator, stringValidator };
