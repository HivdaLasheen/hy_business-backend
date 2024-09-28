import { Router, Request, Response } from "express";
import {
  applicantSignUpValidators,
  verificationValidator,
} from "../validation/validation";
import { applicantSignup, verifyAccount } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => {
  res.send("TODO");
});

router.post("/signup/applicant", applicantSignUpValidators, applicantSignup);
router.get("/verify-email", verificationValidator, verifyAccount);

export default router;
