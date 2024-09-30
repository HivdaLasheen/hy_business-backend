import { body } from "express-validator";

const NAME_REGEX =
  /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/;

const firstNameValidator = body("firstName")
  .notEmpty()
  .withMessage("First name is required.")
  .isString()
  .withMessage("Invalid type.")
  .isLength({ min: 2, max: 50 })
  .withMessage("First name must be between 2 and 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("First name is not valid.")
  .trim();

const middleNameValidator = body("middleName")
  .optional()
  .isString()
  .withMessage("Invalid type.")
  .isLength({ max: 50 })
  .withMessage("Middle name cannot be longer than 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("Middle name is not valid.")
  .trim();

const lastNameValidator = body("lastName")
  .notEmpty()
  .withMessage("Last name is required.")
  .isString()
  .withMessage("Invalid type.")
  .isLength({ min: 2, max: 50 })
  .withMessage("Last name must be between 2 and 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("Last name is not valid.")
  .trim();

const organizationNameValidator = body("name")
  .notEmpty()
  .withMessage("Organization name is required.")
  .isLength({ min: 2, max: 50 })
  .withMessage("Organization name must be between 2 and 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("Organization name is not valid.")
  .trim();

const usernameValidator = body("username")
  .notEmpty()
  .withMessage("Username is required.")
  .isString()
  .withMessage("Invalid type.")
  .trim();

export {
  firstNameValidator,
  middleNameValidator,
  lastNameValidator,
  organizationNameValidator,
  usernameValidator,
};
