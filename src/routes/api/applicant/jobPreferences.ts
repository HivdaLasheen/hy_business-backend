import { Router } from "express";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { jobPreferencesValidators } from "../../../validation/validation";
import * as j from "../../../controllers/applicant/jobPreferences.controller";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

// Validate the path parameter "id"
router.use(numberParamValidator("id"), validateRequest);

/**
 * @swagger
 * /api/applicant/job/preferences:
 *   get:
 *     summary: Retrieve job preferences for a specific applicant
 *     tags:
 *       - Applicant/JobPreferences
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved job preferences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preferences:
 *                   type: object
 *                   properties:
 *                     preferredJobTitle:
 *                       type: string
 *                     location:
 *                       type: string
 *                     salaryExpectation:
 *                       type: number
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.get("/", authorization(["applicant", "admin"], true), j.getApplicantJobPreferences);

/**
 * @swagger
 * /api/applicant/job/preferences:
 *   post:
 *     summary: Create or update job preferences for an applicant
 *     tags:
 *       - Applicant/JobPreferences
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferredJobTitle:
 *                 type: string
 *               location:
 *                 type: string
 *               salaryExpectation:
 *                 type: number
 *     responses:
 *       201:
 *         description: Job preferences created or updated successfully
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authorization(["applicant"]),
  jobPreferencesValidators,
  validateRequest,
  j.postJobPreferences
);

export default router;
