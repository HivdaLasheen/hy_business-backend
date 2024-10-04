import { Router, Request, Response } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import {
  uploadCertificate,
  getCertificate,
} from "../../../controllers/applicant/education.controller";

const router: Router = Router({ mergeParams: true });
const idParamValidation = [numberParamValidator("id"), validateRequest];
const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

// TODO: Implement this route, for getting all educations except certificate
router.get("/", idParamValidation, authorization(["applicant", "admin"], true));

// TODO: Implement this route, for submitting and re-submitting education
router.post("/", idParamValidation, authorization(["applicant"]));

router.get(
  "/certificate",
  idParamValidation,
  authorization(["applicant", "admin"], true),
  getCertificate
);

router.post("/certificate", idParamValidation, authorization(["applicant"]), ...uploadCertificate);

export default router;
