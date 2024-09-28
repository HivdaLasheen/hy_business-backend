import {
  passwordValidator,
  emailValidator,
  confirmPasswordValidator,
  firstNameValidator,
  middleNameValidator,
  lastNameValidator,
  dateOfBirthValidator,
  genderValidator,
  countryValidator,
  cityValidator,
  roleValidator as loginRoleValidator,
} from "./validators/auth-validators";
import {
  roleValidator as verificationRoleValidator,
  tokenValidator,
} from "./validators/verification-validators";

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

export const loginValidation = [
  emailValidator,
  passwordValidator,
  loginRoleValidator,
];

export const verificationValidator = [
  tokenValidator,
  verificationRoleValidator,
];
