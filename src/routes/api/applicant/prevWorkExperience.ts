import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import * as p from "../../../controllers/applicant/prevWorkExperience.controller";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { prevWorkExperienceValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

router.use(numericParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"], true), p.getAllPrevWorkExp);
router.get(
  "/:workId",
  authorization(["applicant", "admin"], true),
  numericParamValidator("workId"),
  validateRequest,
  p.getPrevWorkExp
);

router.post(
  "/",
  authorization(["applicant"]),
  prevWorkExperienceValidators,
  validateRequest,
  p.postNewPrevWorkExp
);

router.delete(
  "/:workId",
  authorization(["applicant"]),
  numericParamValidator("workId"),
  validateRequest,
  p.deletePrevWorkExp
);

export default router;
