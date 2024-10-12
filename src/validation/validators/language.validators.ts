import { body } from "express-validator";
import { $Enums } from "@prisma/client";
import prisma from "../../prisma";

const languageIdValidator = body("languageId")
  .notEmpty()
  .withMessage("Language ID is required.")
  .isInt()
  .withMessage("Language ID must be an integer.")
  .bail()
  .toInt()
  .custom(async (value) => {
    const language = await prisma.languagesLookup.findFirst({
      where: {
        id: value,
      },
    });

    if (!language) return Promise.reject("Language was not found.");
    return true;
  });

const levels = Object.values($Enums.applicants_languages_level);

const languageLevelValidator = body("level")
  .isString()
  .notEmpty()
  .withMessage("Language level is required.")
  .isIn(levels)
  .withMessage(`Language level must be one of ${levels.join(", ")}.`);

export { languageIdValidator, languageLevelValidator };
