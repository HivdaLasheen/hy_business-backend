import { Router } from "express";
import organizationRouter from "./profile";

const router: Router = Router();

// Define nested routes for applicant-related data
router.use("/:id/profile", organizationRouter);

export default router;
