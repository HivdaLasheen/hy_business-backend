import { Router } from "express";
import applicantRouter from "./applicant";
import auth from "../../middlewares/auth.middleware";

const router: Router = Router();

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Test the API
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Successful ping response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */
router.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// Use the applicant router for applicant-related routes
router.use("/applicant", auth, applicantRouter);

export default router;
