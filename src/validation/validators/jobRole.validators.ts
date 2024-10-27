import { body } from "express-validator";
import prisma from "../../prisma";

export const jobRoleValidator = [
  body("organizationId")
    .isInt({ gt: 0 })
    .withMessage("Organization ID must be a positive integer.")
    .custom(async (value) => {
      const organizationExists = await prisma.organization.findUnique({
        where: { id: value },
      });
      if (!organizationExists) {
        return Promise.reject("Organization ID does not exist.");
      }
      return true;
    }),

  body("jobTitle")
    .isString()
    .isLength({ max: 100 })
    .withMessage("Job title must be a string with a maximum of 100 characters.")
    .trim(),

  body("type")
    .isString()
    .isLength({ max: 50 })
    .withMessage("Type must be a string with a maximum of 50 characters.")
    .trim(),

  body("minRequiredYearsOfExp")
    .isFloat({ min: 0 })
    .withMessage("Minimum required years of experience must be a non-negative number."),

  body("maxRequiredYearsOfExp")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum required years of experience must be a non-negative number.")
    .custom((value, { req }) => {
      if (value < req.body.minRequiredYearsOfExp) {
        return Promise.reject("Maximum experience cannot be less than minimum experience.");
      }
      return true;
    }),

  body("seniority")
    .isString()
    .isLength({ max: 50 })
    .withMessage("Seniority must be a string with a maximum of 50 characters.")
    .trim(),

  body("description")
    .isString()
    .isLength({ max: 1024 })
    .withMessage("Description must be a string with a maximum of 1024 characters.")
    .trim(),

  body("startDate")
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a valid date.")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        return Promise.reject("Start date cannot be in the past.");
      }
      return true;
    }),

  body("endDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("End date must be a valid date.")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        return Promise.reject("End date cannot be earlier than the start date.");
      }
      return true;
    }),

  body("visaAvailability")
    .isBoolean()
    .withMessage("Visa availability must be a boolean value."),

  body("remoteWorkAvailability")
    .isBoolean()
    .withMessage("Remote work availability must be a boolean value."),

  body("relocationPreferences")
    .isBoolean()
    .withMessage("Relocation preferences must be a boolean value."),

  body("salary")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Salary must be a non-negative integer."),

  body("isUrgent")
    .optional()
    .isBoolean()
    .withMessage("Is urgent must be a boolean value."),

  body("maxPeriodNotice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum period notice must be a non-negative integer."),

  body("numberOfVacant")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Number of vacant positions must be a non-negative integer."),
];

export const jobRoleLanguagesValidator = body("jobRoleLanguages")
  .optional()
  .isArray({ min: 1 })
  .withMessage("Job role languages must be a non-empty array.")
  .custom((languages) => {
    languages.forEach((lang: any) => {
      if (!lang.languageId || typeof lang.languageId !== "number") {
        throw new Error("Each language must have a valid languageId.");
      }
      if (!lang.level || !["A1", "A2", "B1", "B2", "Fluent", "Native"].includes(lang.level)) {
        throw new Error("Each language must have a valid level.");
      }
    });
    return true;
  });

export const jobRoleSkillsValidator = body("jobRoleSkills")
  .optional()
  .isArray({ min: 1 })
  .withMessage("Job role skills must be a non-empty array.")
  .custom((skills) => {
    skills.forEach((skill: any) => {
      if (!skill.skillId || typeof skill.skillId !== "number") {
        throw new Error("Each skill must have a valid skillId.");
      }
      if (!skill.proficiencyLevel || !["Beginner", "Intermediate", "Advanced", "Expert"].includes(skill.proficiencyLevel)) {
        throw new Error("Each skill must have a valid proficiency level.");
      }
    });
    return true;
  });
