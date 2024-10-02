import { Router } from "express";
import educationRouter from "./education";

const router: Router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "applicant" });
});

router.use("/:id/education", educationRouter);
// router.use("/:id/work-experience");
// router.use("/:id/job-preferences");
// router.use("/:id/languages");

export default router;
