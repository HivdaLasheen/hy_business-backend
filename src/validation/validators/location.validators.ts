import { body } from "express-validator";
import prisma from "../../prisma";

export const locationValidators = [
  body("countryId")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Country ID must be a positive integer.")
    .custom(async (value: number) => {
      const countryExists = await prisma.countryLookup.findUnique({
        where: { id: value },
      });
      if (!countryExists) {
        return Promise.reject("Country ID does not exist.");
      }
      return true;
    }),
  body("state")
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage("State cannot exceed 50 characters.")
    .trim(),

  body("city")
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage("City cannot exceed 50 characters.")
    .trim(),

  body("address")
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage("Address cannot exceed 100 characters.")
    .trim(),

  body("zipCode")
    .optional()
    .isString()
    .isLength({ max: 20 })
    .withMessage("ZIP code cannot exceed 20 characters.")
    .trim(),

  body("isHeadOffice")
    .optional()
    .isBoolean()
    .withMessage("isHeadOffice must be a boolean value."),
];
