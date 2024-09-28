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
} from "../validation/validators/auth-validators";

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
