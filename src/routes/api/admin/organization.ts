import { Router, Request, Response } from "express";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { getOrganizations } from "../../../controllers/admin/organization.controller";

const router: Router = Router({ mergeParams: true });
const authorization = (roles: string[]) => [roleAuthorization(...roles)];

router.get("/", authorization(["admin"]), getOrganizations);

export default router;
