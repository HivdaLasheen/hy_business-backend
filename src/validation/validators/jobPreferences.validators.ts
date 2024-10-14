import { body } from "express-validator";

const noticePeriodValidator = body("noticePeriod")
  .notEmpty()
  .withMessage("Notice Period is required.")
  .isInt({ min: 0, max: 365 })
  .withMessage("Notice Period must be an integer between 0 and 365.")
  .toInt();

const remoteValidator = body("remote")
  .notEmpty()
  .withMessage("Remotely Work Ability is required.")
  .isBoolean()
  .withMessage("Remote must be a boolean.");

const disruptionsValidator = body("disruptions")
  .optional()
  .isString()
  .trim()
  .isLength({ min: 1, max: 512 })
  .withMessage("Disruptions must be a string with a length between 1 and 512.");

const relocationValidator = body("relocation")
  .optional()
  .isBoolean()
  .withMessage("Relocation must be a boolean.");

const preferredRegionsCountriesValidator = body("preferredRegionsCountries")
  .if((_value, { req }) => req.body.relocation === true)
  .notEmpty()
  .withMessage("Preferred Regions/Countries is required if Relocation is true.")
  .isString()
  .withMessage("Preferred Regions/Countries must be text.")
  .trim()
  .isLength({ min: 1, max: 512 })
  .withMessage("Preferred Regions/Countries must be between 1 and 512 characters.");

export {
  relocationValidator,
  remoteValidator,
  disruptionsValidator,
  preferredRegionsCountriesValidator,
  noticePeriodValidator,
};
