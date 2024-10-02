import { Router } from "express";
import applicantRouter from "./applicant";
import auth from "../../middlewares/auth.middleware";

const router: Router = Router();

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

router.use("/applicant", auth, applicantRouter);

export default router;
