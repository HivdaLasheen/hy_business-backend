import { Router } from "express";
import organizationRouter from "./profile";

const router: Router = Router();

/**
 * @swagger
 * /api/organization:
 *   get:
 *     summary: Get a greeting message for organization
 *     tags:
 *       - Organization
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
 *                   example: "organization"
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "organization" });
});

// Define nested routes for applicant-related data
router.use("/:id/profile", organizationRouter);

export default router;
