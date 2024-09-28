import { query } from "express-validator";

const tokenValidator = query("token")
  .notEmpty()
  .withMessage("Token query parameter is required");

const roleValidator = query("role")
  .notEmpty()
  .withMessage("Role query parameter is required.")
  .isIn(["applicant", "organization"])
  .withMessage("Invalid role.");

export { tokenValidator, roleValidator };
