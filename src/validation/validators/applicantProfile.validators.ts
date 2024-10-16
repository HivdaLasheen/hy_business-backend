import { body } from "express-validator";

const religionValidator = body("religion")
  .optional()
  .isString()
  .withMessage("Religion must be a string")
  .isLength({ max: 50 })
  .withMessage("Religion must be less than 50 characters");

const ethnicityValidator = body("ethnicity")
  .optional()
  .isString()
  .withMessage("Ethnicity must be a string")
  .isLength({ max: 50 })
  .withMessage("Ethnicity must be less than 50 characters");

const portfolioValidator = body("portfolio")
  .optional()
  .isString()
  .withMessage("Portfolio URL must be a string")
  .isLength({ max: 100 })
  .withMessage("Portfolio URL must be less than 100 characters")
  .isURL()
  .withMessage("Portfolio must be a valid URL");

const githubValidator = body("github")
  .optional()
  .isString()
  .withMessage("Github URL must be a string")
  .isLength({ max: 100 })
  .withMessage("Github URL must be less than 100 characters")
  .isURL()
  .withMessage("Github must be a valid URL");

const linkedinValidator = body("linkedin")
  .isString()
  .withMessage("Linkedin URL must be a string")
  .notEmpty()
  .withMessage("Linkedin is required")
  .isLength({ max: 100 })
  .withMessage("Linkedin URL must be less than 100 characters")
  .isURL()
  .withMessage("Linkedin must be a valid URL");

const softSkillsValidator = body("softSkills")
  .optional()
  .isString()
  .withMessage("Soft Skills must be a string")
  .isLength({ max: 512 })
  .withMessage("Soft Skills must be less than 512 characters");

const phoneNumberValidator = body("phoneNumber")
  .isString()
  .withMessage("Phone number must be a string")
  .notEmpty()
  .withMessage("Phone number is required")
  .isLength({ max: 30 })
  .withMessage("Phone number must be less than 20 characters.")
  .isMobilePhone("any", { strictMode: true })
  .withMessage("Phone number must be a valid phone number, including country code.");

export {
  religionValidator,
  ethnicityValidator,
  portfolioValidator,
  githubValidator,
  linkedinValidator,
  softSkillsValidator,
  phoneNumberValidator,
};
