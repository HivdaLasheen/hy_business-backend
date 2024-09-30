import { Router } from "express";
import {
  organizationSignUpValidators,
  applicantSignUpValidators,
  verificationValidator,
  adminLoginValidation,
  loginValidation,
  requestPasswordResetValidators,
  resetPasswordValidators,
} from "../validation/validation";
import {
  organizationSignup,
  applicantSignup,
  verifyAccount,
} from "../controllers/auth/signup.controller";
import { login, adminLogin } from "../controllers/auth/login.controller";
import { logout } from "../controllers/auth/logout.controller";
import auth from "../middlewares/auth.middleware";
import {
  passwordReset,
  requestPasswordReset,
} from "../controllers/auth/passwordReset.controller";

const router: Router = Router();

router.post("/login", loginValidation, login);

router.post("/admin/login", adminLoginValidation, adminLogin);

router.post("/signup/applicant", applicantSignUpValidators, applicantSignup);

router.post(
  "/signup/organization",
  organizationSignUpValidators,
  organizationSignup
);

router.get("/verify-email", verificationValidator, verifyAccount);

router.post(
  "/password/request",
  requestPasswordResetValidators,
  requestPasswordReset
);
router.post("/password/reset", resetPasswordValidators, passwordReset);

router.delete("/logout", logout);

router.post("/test", auth);

export default router;
