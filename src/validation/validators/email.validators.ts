import { body } from "express-validator";

export const emailValidator = body("email")
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .withMessage("Please enter a valid email address.")
  .isLength({ max: 254 })
  .withMessage("Email cannot be longer than 254 characters.")
  .normalizeEmail()
  .trim();
