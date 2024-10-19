import { Router } from "express";
import educationRouter from "./education";
import languageRouter from "./language";
import workExperienceRouter from "./workExperience";
import jobPreferencesRouter from "./jobPreferences";
import prevWorkExperienceRouter from "./prevWorkExperience";
import interestedRolesRouter from "./interestedRoles";
import profileRouter from "./profile";

const router: Router = Router();

/**
 * @swagger
 * /api/applicant:
 *   get:
 *     summary: Get a greeting message for applicants
 *     tags:
 *       - Applicant
 *     responses:
 *       200:
 *         description: Successfully retrieved the message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "applicant"
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "applicant" });
});

// Define nested routes for applicant-related data
router.use("/:id/profile", profileRouter);
router.use("/:id/education", educationRouter);
router.use("/:id/language", languageRouter);
router.use("/:id/job/preferences", jobPreferencesRouter);
router.use("/:id/job/interested-roles", interestedRolesRouter);
router.use("/:id/experience", workExperienceRouter);
router.use("/:id/experience/previous", prevWorkExperienceRouter);

export default router;
