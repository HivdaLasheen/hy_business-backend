import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => {
    res.send("TODO");
});

router.post("/signup", (req: Request, res: Response) => {
    res.send("TODO");
});

export default router;
