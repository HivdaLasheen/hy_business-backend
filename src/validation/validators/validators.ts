import { body, query } from "express-validator";
import prisma from "../../prisma";

const dateOfBirthValidator = body("dateOfBirth")
  .notEmpty()
  .withMessage("Date of birth is required.")
  .isDate()
  .withMessage("Date of birth must be a valid date.")
  .custom((value) => {
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate >= today) {
      throw new Error("Date of birth must be a valid date.");
    }
    return true;
  });

const genderValidator = body("gender")
  .notEmpty()
  .withMessage("Gender is required.")
  .isString()
  .withMessage("Invalid type.")
  .isIn(["male", "female", "not-preferred-to-say"])
  .withMessage("Gender must be either male, female, or not-preferred-to-say.");

const cityValidator = body("city")
  .notEmpty()
  .withMessage("City is required.")
  .isString()
  .withMessage("Invalid type.")
  .isLength({ min: 2, max: 100 })
  .withMessage("City must be between 2 and 100 characters.")
  .trim();

const countryValidator = body("country")
  .isString()
  .withMessage("Invalid type.")
  .bail()
  .custom(async (value: string, { req }) => {
    value = value?.trim() ?? "";
    const countries = await prisma.countryLookup.findMany({
      where: {
        name: value?.toLowerCase(),
      },
    });

    if (countries.length === 0) return Promise.reject("Country does not exists.");
    return true;
  });

const organizationTypeValidator = body("type")
  .notEmpty()
  .withMessage("Organization Type is required.")
  .isLength({ min: 2, max: 50 })
  .withMessage("Organization name must be between 2 and 50 characters.")
  .isAlpha()
  .withMessage("Invalid type. Only alphabetic letters.");

const linkedinValidator = body("linkedin", "Please enter a valid Linkedin URL.")
  .optional()
  .isLength({ min: 2, max: 100 })
  .withMessage("Linkedin URL cannot be longer than 254 characters.")
  .isURL();

const requiredLinkedinValidator = body("linkedin", "Please enter a valid Linkedin URL.")
  .notEmpty()
  .isLength({ min: 2, max: 100 })
  .withMessage("Linkedin URL cannot be longer than 254 characters.")
  .isURL();

const tokenValidator = query("token").notEmpty().withMessage("Token query parameter is required.");

const roleValidator = (roles: string[], pathFunction: CallableFunction) =>
  pathFunction("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(roles)
    .withMessage("Invalid role.");

const checkboxValidator = (field: string) =>
  body(field).optional().isBoolean().withMessage(`${field} field has an invalid value.`);

const requiredCheckboxValidator = (field: string) =>
  body(field)
    .notEmpty()
    .withMessage(`${field} is required.`)
    .isBoolean()
    .withMessage(`${field} field has an invalid value.`);

export {
  dateOfBirthValidator,
  genderValidator,
  countryValidator,
  cityValidator,
  organizationTypeValidator,
  linkedinValidator,
  requiredLinkedinValidator,
  roleValidator,
  checkboxValidator,
  requiredCheckboxValidator,
  tokenValidator,
};
