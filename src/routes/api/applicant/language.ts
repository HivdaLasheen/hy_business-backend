import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numericParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";
import * as l from "../../../controllers/applicant/language.controller";
import { languageValidators } from "../../../validation/validation";

const router: Router = Router({ mergeParams: true });

const authorization = (roles: string[], allowAdmin = false) => [
  roleAuthorization(...roles),
  idAuthorization(allowAdmin),
];


router.use(numericParamValidator("id"), validateRequest);
router.get("/", authorization(["applicant", "admin"], true), l.getLanguages);
router.post("/", authorization(["applicant"]), languageValidators, validateRequest, l.postLanguage);
router.delete(
  "/:langId",
  authorization(["applicant"]),
  numericParamValidator("langId"),
  validateRequest,
  l.deleteLanguage
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
  numericParamValidator("langId"),
  languageValidators[1], // level validator
  validateRequest,
  l.updateLangLevel
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
  numericParamValidator("langId"),
  validateRequest,
  l.getCertificate
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
  numericParamValidator("langId"),
  validateRequest,
  ...l.uploadCertificate
);

export default router;
