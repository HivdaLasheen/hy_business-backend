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

// Validate numeric ID parameter
router.use(numericParamValidator("id"), validateRequest);

/**
 * @swagger
 * tags:
 *   name: Applicant/Profile
 *   description: Applicant management
 */

/**
 * @swagger
 * /api/applicant:
 *   get:
 *     summary: Get applicant profile
 *     tags: [Applicant/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the applicant
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Applicant profile retrieved successfully
 *       404:
 *         description: Applicant was not found
 *       401:
 *         description: Unauthorized
 */
router.get("/", authorization(["applicant", "admin"]), controller.getApplicantProfile);

/**
 * @swagger
 * /api/applicant/pfp:
 *   get:
 *     summary: Get applicant profile picture
 *     tags: [Applicant/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the applicant
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Applicant profile picture retrieved successfully
 *       404:
 *         description: Applicant was not found
 *       401:
 *         description: Unauthorized
 */
router.get("/pfp", authorization(["applicant", "admin"]), controller.getPFP);

/**
 * @swagger
 * /api/applicant:
 *   put:
 *     summary: Update applicant profile
 *     tags: [Applicant/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the applicant
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               religion:
 *                 type: string
 *               ethnicity:
 *                 type: string
 *               portfolio:
 *                 type: string
 *               github:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Applicant was not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/",
  authorization(["applicant"]),
  applicantProfileValidators,
  validateRequest,
  controller.putProfile
);

/**
 * @swagger
 * /api/applicant/pfp:
 *   post:
 *     summary: Upload applicant profile picture
 *     tags: [Applicant/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the applicant
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pfp:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Applicant was not found
 *       401:
 *         description: Unauthorized
 */
router.post("/pfp", authorization(["applicant"]), ...controller.uploadPfp);

export default router;
