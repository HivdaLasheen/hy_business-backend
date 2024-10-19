import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { workExperienceValidators } from "../../../validation/validation";
import * as w from "../../../controllers/applicant/workExperience.controller";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];


router.use(numericParamValidator("id"), validateRequest);

/**
 * @swagger
 * /api/applicant/work-experience:
 *   get:
 *     summary: Retrieve work experience for a specific applicant
 *     tags:
 *       - Applicant/WorkExperience
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved work experience
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   position:
 *                     type: string
 *                   company:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *                   description:
 *                     type: string
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.get("/", authorization(["applicant", "admin"], true), w.getWorkExperience);

/**
 * @swagger
 * /api/applicant/work-experience:
 *   post:
 *     summary: Add new work experience for an applicant
 *     tags:
 *       - Applicant/WorkExperience
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               position:
 *                 type: string
 *               company:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Work experience added successfully
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authorization(["applicant"]),
  workExperienceValidators,
  validateRequest,
  w.createWorkExperience
);

/**
 * @swagger
 * /api/applicant/work-experience/cv:
 *   get:
 *     summary: Retrieve CV for a specific applicant
 *     tags:
 *       - Applicant/WorkExperience
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved CV
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.get("/cv", authorization(["applicant", "admin"], true), w.getCV);

/**
 * @swagger
 * /api/applicant/work-experience/cv:
 *   post:
 *     summary: Upload CV for an applicant
 *     tags:
 *       - Applicant/WorkExperience
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: CV uploaded successfully
 *       403:
 *         description: Forbidden
 */
router.post("/cv", authorization(["applicant"]), ...w.uploadCV);

/**
 * @swagger
 * /api/applicant/work-experience/certificate:
 *   get:
 *     summary: Retrieve work experience certificate for an applicant
 *     tags:
 *       - Applicant/WorkExperience
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved work experience certificate
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.get("/certificate", authorization(["applicant", "admin"], true), w.getCertificate);

/**
 * @swagger
 * /api/applicant/work-experience/certificate:
 *   post:
 *     summary: Upload a work experience certificate for an applicant
 *     tags:
 *       - Applicant/WorkExperience
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Certificate uploaded successfully
 *       403:
 *         description: Forbidden
 */
router.post("/certificate", authorization(["applicant"]), ...w.uploadCertificate);

export default router;
