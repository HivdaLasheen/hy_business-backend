import { body } from "express-validator";

const majorValidator = body("major")
  .isString()
  .withMessage("Major must be a string.")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Major must be between 1 and 100 characters.")
  .isAlpha("en-US");

const degreeValidator = body("degree")
  .isString()
  .withMessage("Degree must be a string.")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Degree must be between 1 and 100 characters.")
  .isAlpha("en-US");

const graduationYearValidator = body("graduationYear")
  .isInt({ min: 1900, max: new Date().getFullYear() + 100 })
  .withMessage("Graduation year must be a valid year.");

const universityValidator = body("university")
  .isString()
  .withMessage("University must be a string.")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("University must be between 1 and 100 characters.")
  .isAlpha("en-US");

export { majorValidator, degreeValidator, graduationYearValidator, universityValidator };
