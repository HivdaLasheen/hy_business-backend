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
} from "./validators/auth-validators";
import {
  roleValidator,
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

export const verificationValidator = [tokenValidator, roleValidator];
