import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import * as c from "../../../controllers/applicant/allowedJobRoles.controller";
const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[]) => [
  roleAuthorization(...roles),
  idAuthorization(roles.includes("admin")),
];

router.use(numericParamValidator("id"), validateRequest);

router.get("/", authorization(["applicant", "admin"]), c.getAllowedJobRoles);
router.get(
  "/:jobRoleId",
  authorization(["applicant", "admin"]),
  numericParamValidator("jobRoleId"),
  validateRequest,
  c.getJobRole
);
router.post("/", authorization(["applicant"]), c.postAllowedJobRoles);

export default router;
