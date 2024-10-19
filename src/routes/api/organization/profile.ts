import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import * as controller from "../../../controllers/organization/profile.controller";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import { organizationProfileValidators } from "../../../validation/validation"; // Ensure you have a validators file for organization

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
 *   name: Organization/Profile
 *   description: Organization management
 */

/**
 * @swagger
 * /api/organization/:
 *   get:
 *     summary: Get organization profile
 *     tags: [Organization/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the organization
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization profile retrieved successfully
 *       404:
 *         description: Organization was not found
 *       401:
 *         description: Unauthorized
 */
router.get("/", authorization(["organization", "admin"]), controller.getOrganizationProfile);

/**
 * @swagger
 * /api/organization/logo:
 *   get:
 *     summary: Get organization logo
 *     tags: [Organization/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the organization
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization logo retrieved successfully
 *       404:
 *         description: Organization was not found
 *       401:
 *         description: Unauthorized
 */
router.get("/logo", authorization(["organization", "admin"]), controller.getLogo);

/**
 * @swagger
 * /api/organization:
 *   put:
 *     summary: Update organization profile
 *     tags: [Organization/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the organization
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               industry:
 *                 type: string
 *               sizeOfCompany:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Organization was not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/",
  authorization(["organization"]),
  organizationProfileValidators,
  validateRequest,
  controller.putProfile
);

/**
 * @swagger
 * /api/organization/logo:
 *   post:
 *     summary: Upload organization logo
 *     tags: [Organization/Profile]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the organization
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo uploaded successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Organization was not found
 *       401:
 *         description: Unauthorized
 */
router.post("/logo", authorization(["organization"]), ...controller.uploadLogo);

export default router;
