import { Router } from "express";
import organizationRouter from "./profile";
import locationRouter from "./location";
import jobRoleRouter from "./jobRole";

const router: Router = Router();

// Define nested routes for applicant-related data
router.use("/:id/profile", organizationRouter);
router.use("/:id/location", locationRouter);
router.use("/:id/job-role", jobRoleRouter);

export default router;
