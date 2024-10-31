import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import {
  jobRoleValidator,
  jobRoleLanguagesValidator,
  jobRoleSkillsValidator,
} from "../../../validation/validators/jobRole.validators";
import * as controller from "../../../controllers/organization/jobRole.controller";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";

const router: Router = Router({ mergeParams: true });

// Authorization middleware
const authorization = (roles: string[]) => [
  roleAuthorization(...roles),
  idAuthorization(roles.includes("admin")),
];

// Validate numeric ID parameter
router.use(numericParamValidator("id"), validateRequest);

/**
 * @swagger
 * tags:
 *   name: JobRoles
 *   description: Job role management
 */

router.get("/", authorization(["admin", "organization"]), controller.getAllJobRoles);

router.post(
  "/",
  authorization(["organization"]),
  jobRoleValidator,
  jobRoleLanguagesValidator,
  jobRoleSkillsValidator,
  validateRequest,
  controller.addJobRole
);

router.put(
  "/:jobRoleId",
  authorization(["organization"]),
  jobRoleValidator,
  jobRoleLanguagesValidator,
  jobRoleSkillsValidator,
  validateRequest,
  controller.editJobRole
);

router.patch("/:jobRoleId/close", authorization(["organization"]), controller.closeJobRole);

router.delete("/:jobRoleId", authorization(["admin"]), controller.deleteJobRole);

export default router;
