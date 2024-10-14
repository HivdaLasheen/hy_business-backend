import { Router } from "express";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { jobPreferencesValidators } from "../../../validation/validation";
import * as j from "../../../controllers/applicant/jobPreferences.controller";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.use(numberParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"], true), j.getApplicantJobPreferences);
router.post(
  "/",
  authorization(["applicant"]),
  jobPreferencesValidators,
  validateRequest,
  j.postJobPreferences
);

export default router;
