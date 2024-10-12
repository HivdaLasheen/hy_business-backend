import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import {
  getLanguages,
  postLanguage,
  deleteLanguage,
  updateLangLevel,
} from "../../../controllers/applicant/language.controller";
import { languageValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.use(numberParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"], true), getLanguages);
router.post("/", authorization(["applicant"]), languageValidators, validateRequest, postLanguage);
router.delete(
  "/:langId",
  authorization(["applicant"]),
  numberParamValidator("langId"),
  deleteLanguage
);

router.put(
  "/:langId/level",
  authorization(["applicant"]),
  numberParamValidator("langId"),
  languageValidators[1], // level validator
  validateRequest,
  updateLangLevel
);

router.get(
  "/:langId/certificate",
  authorization(["applicant", "admin"], true),
  numberParamValidator("langId")
);
router.post("/:langId/certificate", authorization(["applicant"]), numberParamValidator("langId"));

export default router;
