import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { interestedRolesValidators } from "../../../validation/validation";
import * as controller from "../../../controllers/applicant/interestedRoles.controller";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(roles.includes("admin")),
];

router.use(numericParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"]), controller.getInterestedRoles);
router.post(
  "/",
  authorization(["applicant"]),
  interestedRolesValidators,
  validateRequest,
  controller.postInterestedRole
);
router.delete(
  "/:roleId",
  authorization(["applicant"]),
  numericParamValidator("roleId"),
  validateRequest,
  controller.deleteInterestedRole
);

export default router;
