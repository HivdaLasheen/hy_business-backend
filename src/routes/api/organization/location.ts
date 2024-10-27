import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import * as controller from "../../../controllers/organization/location.controller";
import { locationValidators } from "../../../validation/validators/location.validators";

const router: Router = Router({ mergeParams: true });

// Authorization setup
const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(roles.includes("admin")),
];

// Validate numeric ID parameter for organization and location
router.use(numericParamValidator("id"), validateRequest);

/**
 * @swagger
 * tags:
 *   name: Organization/Location
 *   description: Organization location management
 */

/**
 * @swagger
 * /api/organization/:id/location:
 *   get:
 *     summary: Get all locations for an organization
 *     tags: [Organization/Location]
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
 *         description: Locations retrieved successfully
 *       404:
 *         description: Organization not found
 *       401:
 *         description: Unauthorized
 */
router.get("/", authorization(["organization", "admin"]), controller.getOrganizationLocations);

/**
 * @swagger
 * /api/organization/:id/location:
 *   post:
 *     summary: Add a new location for an organization
 *     tags: [Organization/Location]
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
 *               countryId:
 *                 type: integer
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               isHeadOffice:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Location added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authorization(["organization"]),
  locationValidators,
  validateRequest,
  controller.addOrganizationLocation
);

/**
 * @swagger
 * /api/organization/:id/location/:locationId:
 *   delete:
 *     summary: Delete a location for an organization
 *     tags: [Organization/Location]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the organization
 *         schema:
 *           type: integer
 *       - in: path
 *         name: locationId
 *         required: true
 *         description: Numeric ID of the location
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:locationId",
  authorization(["organization"]),
  controller.deleteOrganizationLocation
);

export default router;
