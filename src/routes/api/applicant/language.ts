import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import * as l from "../../../controllers/applicant/language.controller";
import { languageValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.use(numericParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"], true), l.getLanguages);
router.post("/", authorization(["applicant"]), languageValidators, validateRequest, l.postLanguage);
router.delete(
  "/:langId",
  authorization(["applicant"]),
  numericParamValidator("langId"),
  validateRequest,
  l.deleteLanguage
);

router.put(
  "/:langId/level",
  authorization(["applicant"]),
  numericParamValidator("langId"),
  languageValidators[1], // level validator
  validateRequest,
  l.updateLangLevel
);

router.get(
  "/:langId/certificate",
  authorization(["applicant", "admin"], true),
  numericParamValidator("langId"),
  validateRequest,
  l.getCertificate
);
router.post(
  "/:langId/certificate",
  authorization(["applicant"]),
  numericParamValidator("langId"),
  validateRequest,
  ...l.uploadCertificate
);

export default router;
