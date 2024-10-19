import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import {
  getLanguages,
  postLanguage,
  deleteLanguage,
  updateLangLevel,
  uploadCertificate,
  getCertificate,
} from "../../../controllers/applicant/language.controller";
import { languageValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];

// Validate the path parameter "id"
router.use(numberParamValidator("id"), validateRequest);

/**
 * @swagger
 * /api/applicant/language:
 *   get:
 *     summary: Retrieve languages for a specific applicant
 *     tags:
 *       - Applicant/Language
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   language:
 *                     type: string
 *                   level:
 *                     type: string
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.get("/", authorization(["applicant", "admin"], true), getLanguages);

/**
 * @swagger
 * /api/applicant/language:
 *   post:
 *     summary: Add a new language for an applicant
 *     tags:
 *       - Applicant/Language
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *               level:
 *                 type: string
 *     responses:
 *       201:
 *         description: Language added successfully
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden
 */
router.post("/", authorization(["applicant"]), languageValidators, validateRequest, postLanguage);

/**
 * @swagger
 * /api/applicant/language/{langId}:
 *   delete:
 *     summary: Delete a specific language for an applicant
 *     tags:
 *       - Applicant/Language
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: langId
 *         in: path
 *         required: true
 *         description: ID of the language to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Language deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.delete(
  "/:langId",
  authorization(["applicant"]),
  numberParamValidator("langId"),
  validateRequest,
  deleteLanguage
);

/**
 * @swagger
 * /api/applicant/language/{langId}/level:
 *   put:
 *     summary: Update the level of a specific language
 *     tags:
 *       - Applicant/Language
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: langId
 *         in: path
 *         required: true
 *         description: ID of the language to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level:
 *                 type: string
 *     responses:
 *       200:
 *         description: Language level updated successfully
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:langId/level",
  authorization(["applicant"]),
  numberParamValidator("langId"),
  languageValidators[1], // level validator
  validateRequest,
  updateLangLevel
);

/**
 * @swagger
 * /api/applicant/language/{langId}/certificate:
 *   get:
 *     summary: Retrieve a language certificate for an applicant
 *     tags:
 *       - Applicant/Language
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: langId
 *         in: path
 *         required: true
 *         description: ID of the language to retrieve the certificate for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved language certificate
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 */
router.get(
  "/:langId/certificate",
  authorization(["applicant", "admin"], true),
  numberParamValidator("langId"),
  validateRequest,
  getCertificate
);

/**
 * @swagger
 * /api/applicant/language/{langId}/certificate:
 *   post:
 *     summary: Upload a certificate for a language
 *     tags:
 *       - Applicant/Language
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: langId
 *         in: path
 *         required: true
 *         description: ID of the language to upload the certificate for
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Certificate uploaded successfully
 *       403:
 *         description: Forbidden
 */
router.post(
  "/:langId/certificate",
  authorization(["applicant"]),
  numberParamValidator("langId"),
  validateRequest,
  ...uploadCertificate
);

export default router;
