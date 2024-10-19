import { Router, Request, Response } from "express";
import { testDatabaseConnection } from "../prisma";
import { testEmailConnection } from "../emails";

const router: Router = Router();

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Check API status
 *     description: Returns the current status of the API, including database and email connection health.
 *     responses:
 *       200:
 *         description: API is online and healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: on
 *       500:
 *         description: API is offline or unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: off
 */
router.get("/", async (req: Request, res: Response): Promise<any> => {
  if ((await testDatabaseConnection()) && (await testEmailConnection())) {
    return res.status(200).json({ status: "on" });
  }
  return res.status(500).json({ status: "off" });
});

export default router;
