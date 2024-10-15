import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { workExperienceValidators } from "../../../validation/validation";
import * as w from "../../../controllers/applicant/workExperience.controller";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.use(numericParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"], true), w.getWorkExperience);
router.post(
  "/",
  authorization(["applicant"]),
  workExperienceValidators,
  validateRequest,
  w.createWorkExperience
);

router.get("/cv", authorization(["applicant", "admin"], true), w.getCV);
router.post("/cv", authorization(["applicant"]), ...w.uploadCV);

router.get("/certificate", authorization(["applicant", "admin"], true), w.getCertificate);
router.post("/certificate", authorization(["applicant"]), ...w.uploadCertificate);

export default router;
