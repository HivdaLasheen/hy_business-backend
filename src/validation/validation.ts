import { body, query } from "express-validator";
import { emailValidator } from "./validators/email.validators";
import * as v from "./validators/validators";
import * as n from "./validators/name.validators";
import * as p from "./validators/password.validators";
import * as e from "./validators/education.validators";
import * as l from "./validators/language.validators";
import * as w from "./validators/workExperience.validators";
import * as j from "./validators/jobPreferences.validators";

/**
 * An array of validators used for applicant sign-up.
 *
 * This array includes the following validators:
 * - `emailValidator`: Validates the email address.
 * - `passwordValidator`: Validates the password.
 * - `confirmPasswordValidator`: Ensures the password confirmation matches the password.
 * - `firstNameValidator`: Validates the first name.
 * - `lastNameValidator`: Validates the last name.
 * - `middleNameValidator`: Validates the middle name.
 * - `dateOfBirthValidator`: Validates the date of birth.
 * - `genderValidator`: Validates the gender.
 * - `countryValidator`: Validates the country.
 * - `cityValidator`: Validates the city.
 */
export const applicantSignUpValidators = [
  emailValidator,
  p.passwordValidator,
  p.confirmPasswordValidator,
  n.firstNameValidator,
  n.lastNameValidator,
  n.middleNameValidator,
  v.dateOfBirthValidator,
  v.genderValidator,
  v.countryValidator,
  v.cityValidator,
];

/**
 * An array of validation functions for the login process.
 *
 * This array includes the following validators:
 * - `emailValidator`: Validates the email format.
 * - `loginPasswordValidator`: Validates the login password.
 * - `roleValidator(["applicant", "organization"], body)`: Validates the role, ensuring it is either "applicant" or "organization".
 * - `checkboxValidator("rememberMe")`: Validates the "remember me" checkbox.
 */
export const loginValidation = [
  emailValidator,
  p.loginPasswordValidator,
  v.roleValidator(["applicant", "organization"], body),
  v.checkboxValidator("rememberMe"),
];

/**
 * An array of validation functions for the admin login process.
 * It includes:
 * - `usernameValidator`: Validates the username.
 * - `loginPasswordValidator`: Validates the login password.
 * - `checkboxValidator("rememberMe")`: Validates the "remember me" checkbox.
 */
export const adminLoginValidation = [
  n.usernameValidator,
  p.loginPasswordValidator,
  v.checkboxValidator("rememberMe"),
];

/**
 * An array of middleware functions used to validate the verification process.
 *
 * This array includes:
 * - `tokenValidator`: Middleware to validate the presence and correctness of a token.
 * - `roleValidator`: Middleware to validate the role of the user, ensuring it is either "applicant" or "organization".
 */
export const verificationValidator = [
  v.tokenValidator,
  v.roleValidator(["applicant", "organization"], query),
];

/**
 * An array of validators used for organization sign-up.
 *
 * This array includes the following validators:
 * - `emailValidator`: Validates the email format.
 * - `passwordValidator`: Validates the password strength.
 * - `confirmPasswordValidator`: Ensures the password confirmation matches the original password.
 * - `organizationNameValidator`: Validates the organization name.
 * - `organizationTypeValidator`: Validates the organization type.
 * - `requiredLinkedinValidator`: Ensures a LinkedIn profile is provided.
 * - `requiredCheckboxValidator("isVirtual")`: Ensures the "isVirtual" checkbox is checked.
 */
export const organizationSignUpValidators = [
  emailValidator,
  p.passwordValidator,
  p.confirmPasswordValidator,
  n.organizationNameValidator,
  v.organizationTypeValidator,
  v.requiredLinkedinValidator,
  v.requiredCheckboxValidator("isVirtual"),
];

/**
 * An array of validators used for the requesting a password reset.
 *
 * This array includes:
 * - `emailValidator`: Ensures the email field is valid.
 * - `roleValidator`: Ensures the role is either "applicant" or "organization".
 */
export const requestPasswordResetValidators = [
  emailValidator,
  v.roleValidator(["applicant", "organization"], body),
];

/**
 * An array of validators used for resetting a password.
 *
 * This array includes the following validators:
 * - `tokenValidator`: Validates the reset token.
 * - `passwordValidator`: Validates the new password.
 * - `confirmPasswordValidator`: Ensures the new password matches the confirmation password.
 * - `roleValidator`: Validates the role, allowing only "applicant" or "organization" roles.
 */
export const resetPasswordValidators = [
  v.tokenValidator,
  p.passwordValidator,
  p.confirmPasswordValidator,
  v.roleValidator(["applicant", "organization"], query),
];

export const educationValidators = [
  e.majorValidator,
  e.degreeValidator,
  e.graduationYearValidator,
  e.universityValidator,
];

export const languageValidators = [l.languageIdValidator, l.languageLevelValidator];

export const workExperienceValidators = [w.roleValidator];

export const jobPreferencesValidators = [
  j.noticePeriodValidator,
  j.relocationValidator,
  j.remoteValidator,
  j.disruptionsValidator,
  j.preferredRegionsCountriesValidator,
];
