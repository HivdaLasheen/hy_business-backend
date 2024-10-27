import { Router, Request, Response } from "express";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { searchApplicantsValidators } from "../../../validation/validation";
import * as c from "../../../controllers/admin/applicant.controller";

const router: Router = Router({ mergeParams: true });
const authorization = (roles: string[]) => [roleAuthorization(...roles)];

/**
 * @swagger
 * /api/admin/applicant/search:
 *   get:
 *     summary: Search for applicants.
 *     description: Search for applicants using a search key and value.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: query
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - firstName
 *             - lastName
 *             - fullName
 *             - middleName
 *             - email
 *             - phoneNumber
 *         description: The key to search by.
 *       - in: query
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: The value to search for.
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of items per page.
 *     responses:
 *       200:
 *         description: A list of applicants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Applicant'
 */

router.get(
  "/search",
  authorization(["admin"]),
  searchApplicantsValidators,
  validateRequest,
  c.searchApplicants
);

export default router;
