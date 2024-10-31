import { Router } from "express";
import applicantRoute from "./applicant";
import organizationRouter from "./organization";

const router: Router = Router();

router.use("/applicant", applicantRoute);
router.use("/organization", organizationRouter);

export default router;
