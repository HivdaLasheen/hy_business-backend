import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

export default router;
