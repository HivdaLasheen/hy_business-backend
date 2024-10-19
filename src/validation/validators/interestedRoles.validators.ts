import { body } from "express-validator";

const interestedRoleValidator = body("role")
  .isString()
  .notEmpty()
  .withMessage("Role is required.")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("Role must be between 1 and 50 characters.")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("Role must contain only letters and spaces.");

export { interestedRoleValidator };
