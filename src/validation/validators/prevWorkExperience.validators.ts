import { body } from "express-validator";
import prisma from "../../prisma";
import { $Enums } from "@prisma/client";

const jobTitleValidator = body("jobTitle")
  .notEmpty()
  .withMessage("Job Title is required.")
  .isString()
  .withMessage("Job Title must be a string.")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("Job Title must be between 1 and 50 characters.");

const companyValidator = body("companyName")
  .notEmpty()
  .withMessage("Company Name is required.")
  .isString()
  .withMessage("Company Name must be a string.")
  .trim()
  .isLength({ min: 1, max: 50 })
  .withMessage("Company must be between 1 and 50 characters.");

const descriptionValidator = body("description")
  .optional()
  .isString()
  .withMessage("Description must be a string.")
  .trim()
  .isLength({ min: 1, max: 512 })
  .withMessage("Description must be between 1 and 512 characters.");

const startDateValidator = body("startDate")
  .notEmpty()
  .withMessage("Start Date is required.")
  .isString()
  .matches(/^\d{4}-\d{2}-\d{2}$/)
  .bail()
  .isDate({ format: "YYYY-MM-DD" })
  .withMessage("Start Date must be a date.")
  .toDate();

const endDateValidator = body("endDate")
  .optional()
  .isString()
  .matches(/^\d{4}-\d{2}-\d{2}$/)
  .bail()
  .isDate({ format: "YYYY-MM-DD" })
  .withMessage("End Date must be a date.")
  .toDate();

const technicalSkillsValidator = body("technicalSkills")
  .optional()
  .isArray()
  .withMessage("Technical Skills must be an array.")
  .bail()
  .custom(async (value) => {
    const proficiencyLevels = Object.values($Enums.job_role_skills_proficiency_level);
    const skillsLookup = await prisma.techSkillsLookup
      .findMany()
      .then((skills) => skills.map((skill) => skill.name));

    for (const skill of value) {
      if (!skillsLookup.includes(skill.name))
        return Promise.reject(`Invalid technical skill: ${skill.name}`);

      if (!proficiencyLevels.includes(skill.proficiencyLevel))
        return Promise.reject(`Invalid proficiency level: ${skill.proficiencyLevel}`);
    }

    const uniqueSkills = new Set(value.map((e: any) => e.name));

    if (uniqueSkills.size !== value.length)
      return Promise.reject("Technical Skills must be unique.");

    return true;
  });

export {
  jobTitleValidator,
  companyValidator,
  descriptionValidator,
  startDateValidator,
  endDateValidator,
  technicalSkillsValidator,
};
