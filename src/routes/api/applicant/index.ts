import { Router } from "express";
import educationRouter from "./education";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";

const router: Router = Router();

const idParamValidation = [numberParamValidator("id"), validateRequest];

router.get("/", (req, res) => {
  res.status(200).json({ message: "applicant" });
});

router.use("/:id/education", idParamValidation, educationRouter);
// router.use("/:id/work-experience");
// router.use("/:id/job-preferences");
// router.use("/:id/languages");

export default router;
