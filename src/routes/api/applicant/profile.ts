import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import * as controller from "../../../controllers/applicant/profile.controller";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { applicantProfileValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(roles.includes("admin")),
];

router.use(numericParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"]), controller.getApplicantProfile);
router.get("/pfp", authorization(["applicant", "admin"]), controller.getPFP);

router.put(
  "/",
  authorization(["applicant"]),
  applicantProfileValidators,
  validateRequest,
  controller.putProfile
);
router.post("/pfp", authorization(["applicant"]), ...controller.uploadPfp);

export default router;
