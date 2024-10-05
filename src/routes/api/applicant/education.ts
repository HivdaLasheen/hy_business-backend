import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import {
  uploadCertificate,
  getCertificate,
  postEducation,
  getEducation,
} from "../../../controllers/applicant/education.controller";
import { educationValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.use(numberParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"], true), getEducation);
router.post("/", authorization(["applicant"]), educationValidators, validateRequest, postEducation);

router.get("/certificate", authorization(["applicant", "admin"], true), getCertificate);
router.post("/certificate", authorization(["applicant"]), ...uploadCertificate);

export default router;
