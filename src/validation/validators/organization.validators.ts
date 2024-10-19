import { body } from "express-validator";

// Type Validator
export const typeValidator = body("type")
  .isString().withMessage("Type must be a string")
  .notEmpty().withMessage("Type is required.");

// Industry Validator
export const industryValidator = body("industry")
  .optional()
  .isString().withMessage("Industry must be a string.");

// Size of Company Validator
export const sizeOfCompanyValidator = body("sizeOfCompany")
  .optional()
  .isString().withMessage("Size of Company must be a string.");

// Phone Number Validator
export const phoneNumberValidator = body("phoneNumber")
  .optional()
  .isString().withMessage("Phone number must be a string.");

// LinkedIn Validator
export const linkedinValidator = body("linkedin")
  .optional()
  .isURL().withMessage("LinkedIn must be a valid URL.");

// Website Validator
export const websiteValidator = body("website")
  .optional()
  .isURL().withMessage("Website must be a valid URL.");
