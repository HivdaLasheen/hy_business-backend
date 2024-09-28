import { body } from "express-validator";
import prisma from "../../prisma";

const emailValidator = body("email")
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .withMessage("Please enter a valid email address.")
  .isLength({ max: 254 })
  .withMessage("Email cannot be longer than 254 characters.")
  .normalizeEmail()
  .trim();

const passwordValidator = body("password")
  .notEmpty()
  .withMessage("Password is required.")
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
  .custom((value, { req }) => {
    if (value !== req.body.password)
      throw new Error("Passwords does not match");
    return true;
  });

const NAME_REGEX =
  /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/;

const firstNameValidator = body("firstName")
  .notEmpty()
  .withMessage("First name is required.")
  .isLength({ min: 2, max: 50 })
  .withMessage("First name must be between 2 and 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("First name is not valid.")
  .trim();

const middleNameValidator = body("middleName")
  .optional()
  .isLength({ max: 50 })
  .withMessage("Middle name cannot be longer than 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("Middle name is not valid.")
  .trim();

const lastNameValidator = body("lastName")
  .notEmpty()
  .withMessage("Last name is required.")
  .isLength({ min: 2, max: 50 })
  .withMessage("Last name must be between 2 and 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("Last name is not valid.")
  .trim();

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
  .isIn(["male", "female", "not-preferred-to-say"])
  .withMessage("Gender must be either male, female, or not-preferred-to-say.");

const cityValidator = body("city")
  .notEmpty()
  .withMessage("City is required.")
  .isLength({ min: 2, max: 100 })
  .withMessage("City must be between 2 and 100 characters.")
  .trim();

const countryValidator = body("country").custom(
  async (value: string, { req }) => {
    value = value?.trim() ?? "";
    const countries = await prisma.countryLookup.findMany({
      where: {
        name: value?.toLowerCase(),
      },
    });

    if (countries.length === 0)
      return Promise.reject("Country does not exists.");
    return true;
  }
);

const organizationNameValidator = body("name")
  .notEmpty()
  .withMessage("Organization name is required.")
  .isLength({ min: 2, max: 50 })
  .withMessage("Organization name must be between 2 and 50 characters.")
  .matches(NAME_REGEX)
  .withMessage("Organization name is not valid.")
  .trim();

const organizationTypeValidator = body("type")
  .notEmpty()
  .withMessage("Organization Type is required.")
  .isLength({ min: 2, max: 50 })
  .withMessage("Organization name must be between 2 and 50 characters.")
  .isAlpha()
  .withMessage("Invalid type. Only alphabetic letters");

const linkedinValidator = body("linkedin", "Please enter a valid Linkedin URL.")
  .isLength({ min: 2, max: 100 })
  .withMessage("Linkedin URL cannot be longer than 254 characters.")
  .isURL({
    protocols: ["http", "https"],
    require_protocol: true,
    require_tld: true,
  });

const requiredLinkedinValidator = linkedinValidator
  .notEmpty()
  .withMessage("Linked URL is required.");

const roleValidator = body("role")
  .notEmpty()
  .withMessage("Role is required.")
  .isIn(["applicant", "organization", "admin"])
  .withMessage("Invalid role.");

export {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  firstNameValidator,
  middleNameValidator,
  lastNameValidator,
  dateOfBirthValidator,
  genderValidator,
  countryValidator,
  cityValidator,
  organizationNameValidator,
  organizationTypeValidator,
  linkedinValidator,
  requiredLinkedinValidator,
  roleValidator,
};
