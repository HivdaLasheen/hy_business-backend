import { Router, Request, Response } from "express";
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
// TODO: move it to parent route (./index.ts)
const idParamValidation = [numberParamValidator("id"), validateRequest];
const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.get("/", idParamValidation, authorization(["applicant", "admin"], true), getEducation);

router.post(
  "/",
  idParamValidation,
  authorization(["applicant"]),
  educationValidators,
  validateRequest,
  postEducation
);

router.get(
  "/certificate",
  idParamValidation,
  authorization(["applicant", "admin"], true),
  getCertificate
);

router.post("/certificate", idParamValidation, authorization(["applicant"]), ...uploadCertificate);

export default router;
