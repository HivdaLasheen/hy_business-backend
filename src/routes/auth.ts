import { Router, Request, Response } from "express";
import { applicantSignUpValidators } from "../validation/auth.validation";
import { applicantSignup } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => {
  res.send("TODO");
});

router.post("/signup/applicant", applicantSignUpValidators, applicantSignup);

export default router;
