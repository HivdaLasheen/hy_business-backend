import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { educationValidators } from "../../../validation/validation";
import * as e from "../../../controllers/applicant/education.controller";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

// Validate the path parameter "id"
router.use(numberParamValidator("id"), validateRequest);

/**
 * @swagger
 * /api/applicant/education:
 *   get:
 *     summary: Retrieve education details for a specific applicant
 *     tags:
 *       - Applicant/Education
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved education details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 education:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       degree:
 *                         type: string
 *                       institution:
 *                         type: string
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       endDate:
 *                         type: string
 *                         format: date
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.get("/", authorization(["applicant", "admin"], true), e.getEducation);

/**
 * @swagger
 * /api/applicant/education:
 *   post:
 *     summary: Create or update education details for an applicant
 *     tags:
 *       - Applicant/Education
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *               institution:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Education details created or updated successfully
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authorization(["applicant"]),
  educationValidators,
  validateRequest,
  e.postEducation
);

export default router;
