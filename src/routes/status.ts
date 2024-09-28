import { Router, Request, Response } from "express";
import { isDatabaseConnected } from "../prisma";

const router: Router = Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
  if (await isDatabaseConnected()) {
    return res.status(200).json({ status: "on" });
  }
  return res.status(500).json({ status: "off" });
});

export default router;
