import { Router } from "express";
import applicantRoute from "./applicant";

const router: Router = Router();

router.use("/applicant", applicantRoute);

export default router;
