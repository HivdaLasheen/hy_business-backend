import { body } from "express-validator";

const passwordValidator = body("password")
  .notEmpty()
  .withMessage("Password is required.")
  .isString()
  .withMessage("Invalid type.")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long.")
  .isLength({ max: 32 })
  .withMessage("Password cannot be longer than 32 characters.")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter.")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter.")
  .matches(/\d/)
  .withMessage("Password must contain at least one digit.")
  .not()
  .matches(/\s/)
  .withMessage("Password must not contain spaces.");

const confirmPasswordValidator = body("confirmPassword")
  .notEmpty()
  .withMessage("Password confirmation is required.")
  .isString()
  .withMessage("Invalid type.")
  .custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match.");
    return true;
  });

const loginPasswordValidator = body("password")
  .notEmpty()
  .withMessage("Password is required.")
  .isString()
  .withMessage("Invalid type.");

export { passwordValidator, confirmPasswordValidator, loginPasswordValidator };
