import { body, query } from "express-validator";
import { emailValidator } from "./validators/email.validators";
import {
  dateOfBirthValidator,
  genderValidator,
  countryValidator,
  cityValidator,
  roleValidator,
  organizationTypeValidator,
  requiredLinkedinValidator,
  checkboxValidator,
  requiredCheckboxValidator,
  tokenValidator,
} from "./validators/validators";
import {
  firstNameValidator,
  lastNameValidator,
  middleNameValidator,
  organizationNameValidator,
  usernameValidator,
} from "./validators/name.validators";
import {
  passwordValidator,
  confirmPasswordValidator,
  loginPasswordValidator,
} from "./validators/password.validators";

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
  passwordValidator,
  confirmPasswordValidator,
  firstNameValidator,
  lastNameValidator,
  middleNameValidator,
  dateOfBirthValidator,
  genderValidator,
  countryValidator,
  cityValidator,
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
  loginPasswordValidator,
  roleValidator(["applicant", "organization"], body),
  checkboxValidator("rememberMe"),
];

/**
 * An array of validation functions for the admin login process.
 * It includes:
 * - `usernameValidator`: Validates the username.
 * - `loginPasswordValidator`: Validates the login password.
 * - `checkboxValidator("rememberMe")`: Validates the "remember me" checkbox.
 */
export const adminLoginValidation = [
  usernameValidator,
  loginPasswordValidator,
  checkboxValidator("rememberMe"),
];

/**
 * An array of middleware functions used to validate the verification process.
 *
 * This array includes:
 * - `tokenValidator`: Middleware to validate the presence and correctness of a token.
 * - `roleValidator`: Middleware to validate the role of the user, ensuring it is either "applicant" or "organization".
 */
export const verificationValidator = [
  tokenValidator,
  roleValidator(["applicant", "organization"], query),
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
  passwordValidator,
  confirmPasswordValidator,
  organizationNameValidator,
  organizationTypeValidator,
  requiredLinkedinValidator,
  requiredCheckboxValidator("isVirtual"),
];

export const requestPasswordResetValidators = [emailValidator];

export const resetPasswordValidators = [
  tokenValidator,
  passwordValidator,
  confirmPasswordValidator,
];
