import { Router } from "express";
import * as v from "../validation/validation";
import auth from "../middlewares/auth.middleware";
import validateRequest from "../middlewares/validateRequest.middleware";
import { login, adminLogin } from "../controllers/auth/login.controller";
import { logout } from "../controllers/auth/logout.controller";
import {
  organizationSignup,
  applicantSignup,
  verifyAccount,
} from "../controllers/auth/signup.controller";
import {
  passwordReset,
  requestPasswordReset,
} from "../controllers/auth/passwordReset.controller";

const router: Router = Router();

router.post("/login", v.loginValidation, login);

router.post("/admin/login", v.adminLoginValidation, adminLogin);

router.post("/signup/applicant", v.applicantSignUpValidators, applicantSignup);

router.post(
  "/signup/organization",
  v.organizationSignUpValidators,
  organizationSignup
);

router.get("/verify-email", v.verificationValidator, verifyAccount);

router.post(
  "/password/request",
  v.requestPasswordResetValidators,
  validateRequest,
  requestPasswordReset
);
router.post(
  "/password/reset",
  v.resetPasswordValidators,
  validateRequest,
  passwordReset
);

router.delete("/logout", logout);

export default router;
