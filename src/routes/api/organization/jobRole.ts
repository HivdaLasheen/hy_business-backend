import { Router } from "express";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { 
  jobRoleValidator, 
  jobRoleLanguagesValidator, 
  jobRoleSkillsValidator 
} from "../../../validation/validators/jobRole.validators"; 
import * as controller from "../../../controllers/organization/jobRole.controller"; 

const router: Router = Router({ mergeParams: true });

// Authorization middleware
const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
];

// Validate numeric ID parameter
router.use(numericParamValidator("id"), validateRequest);

/**
 * @swagger
 * tags:
 *   name: JobRoles
 *   description: Job role management
 */

/**
 * @swagger
 * /api/job-role:
 *   get:
 *     summary: Retrieve all job roles
 *     tags: [JobRoles]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: List of job roles retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authorization(["admin", "organization"]), controller.getAllJobRoles);

/**
 * @swagger
 * /api/job-role:
 *   post:
 *     summary: Create a new job role
 *     tags: [JobRoles]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               type:
 *                 type: string
 *               seniority:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               minRequiredYearsOfExp:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Job role created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authorization(["organization"]),
  jobRoleValidator,
  jobRoleLanguagesValidator,
  jobRoleSkillsValidator,
  validateRequest,
  controller.addJobRole
);

/**
 * @swagger
 * /api/job-role/{jobRoleId}:
 *   put:
 *     summary: Update a job role by ID
 *     tags: [JobRoles]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the job role to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               type:
 *                 type: string
 *               seniority:
 *                 type: string
 *               description:
 *                 type: string
 *               minRequiredYearsOfExp:
 *                 type: number
 *                 format: float
 *               jobRoleLanguages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     languageId:
 *                       type: integer
 *                     level:
 *                       type: string
 *               jobRoleSkills:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     skillId:
 *                       type: integer
 *                     proficiencyLevel:
 *                       type: string
 *     responses:
 *       200:
 *         description: Job role updated successfully
 *       404:
 *         description: Job role was not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:jobRoleId",
  authorization(["organization"]),
  jobRoleValidator,
  jobRoleLanguagesValidator,
  jobRoleSkillsValidator,
  validateRequest,
  controller.editJobRole
);

/**
 * @swagger
 * /api/job-role/{jobRoleId}:
 *   patch:
 *     summary: Update a job role status to closed by ID
 *     tags: [JobRoles]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the job role to close
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job role status updated to closed successfully
 *       404:
 *         description: Job role was not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.patch("/:jobRoleId/close", authorization(["organization"]), controller.closeJobRole);

/**
 * @swagger
 * /api/job-role/{jobRoleId}:
 *   delete:
 *     summary: Delete a job role by ID
 *     tags: [JobRoles]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the job role to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job role deleted successfully
 *       404:
 *         description: Job role was not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:jobRoleId", authorization(["admin"]), controller.deleteJobRole);

export default router;
