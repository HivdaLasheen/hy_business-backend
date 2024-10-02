import { param } from "express-validator";

const numberParamValidator = (paramName: string) =>
  param(paramName)
    .isInt()
    .withMessage(`${paramName} must be an integer`)
    .toInt();

const stringValidator = (paramName: string) =>
  param(paramName).isString().withMessage(`${paramName} must be a string`);

export { numberParamValidator, stringValidator };
