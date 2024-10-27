import { body } from "express-validator";
import prisma from "../../prisma";

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

export const nameValidator = body("name")
  .optional()
  .isString().withMessage("Name must be a string.");

  export const emailValidator = body("email")
  .isEmail().withMessage("Please enter a valid email address.")
  .isLength({ max: 254 }).withMessage("Email cannot be longer than 254 characters.")
  .normalizeEmail()
  .trim()
  .custom(async (value, { req }) => {
    const organizationId = req.params?.id ? Number(req.params.id) : 0; // Organization ID from request params
    const emailExists = await prisma.organization.findFirst({
      where: {
        email: value,
        id: { not: organizationId }, // Exclude the current organization’s ID from the search
      },
    });

    if (emailExists) {
      return Promise.reject("Email is already in use by another organization.");
    }
    return true;
  });
