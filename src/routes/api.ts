import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/ping", (req, res) => {
    res.send("API pong");
});

export default router;
