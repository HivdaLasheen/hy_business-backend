import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import * as e from "../../../controllers/applicant/education.controller";
import { educationValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.use(numericParamValidator("id"), validateRequest);
router.get("/", authorization(["applicant", "admin"], true), e.getEducation);
router.post(
  "/",
  authorization(["applicant"]),
  educationValidators,
  validateRequest,
  e.postEducation
);

router.get("/certificate", authorization(["applicant", "admin"], true), e.getCertificate);
router.post("/certificate", authorization(["applicant"]), ...e.uploadCertificate);

export default router;
