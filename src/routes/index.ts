import { Router, Request, Response } from "express";

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     responses:
 *       200:
 *         description: Returns a greeting message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello, World!
 */
router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping the server
 *     responses:
 *       200:
 *         description: Returns a pong message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: pong
 */
router.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

export default router;
