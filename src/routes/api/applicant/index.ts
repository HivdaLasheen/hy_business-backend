import { Router } from "express";
import educationRouter from "./education";
import languageRouter from "./language";
import workExperienceRouter from "./workExperience";
import jobPreferencesRouter from "./jobPreferences";

const router: Router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "applicant" });
});

router.use("/:id/education", educationRouter);
router.use("/:id/language", languageRouter);
router.use("/:id/experience", workExperienceRouter);
router.use("/:id/job/preferences", jobPreferencesRouter);

export default router;
