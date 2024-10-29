import { Router } from "express";
import educationRouter from "./education";
import languageRouter from "./language";
import workExperienceRouter from "./workExperience";
import jobPreferencesRouter from "./jobPreferences";
import prevWorkExperienceRouter from "./prevWorkExperience";
import interestedRolesRouter from "./interestedRoles";
import profileRouter from "./profile";
import allowedJobRolesRouter from "./allowedJobRoles";

const router: Router = Router();

// Define nested routes for applicant-related data
router.use("/:id/profile", profileRouter);
router.use("/:id/education", educationRouter);
router.use("/:id/language", languageRouter);
router.use("/:id/job/preferences", jobPreferencesRouter);
router.use("/:id/job/interested-roles", interestedRolesRouter);
router.use("/:id/experience", workExperienceRouter);
router.use("/:id/experience/previous", prevWorkExperienceRouter);
router.use("/:id/allowed-roles", allowedJobRolesRouter);

export default router;
