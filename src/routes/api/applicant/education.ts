import { Router, Request, Response } from "express";
import validateRequest from "../../../middlewares/validateRequest.middleware";
import { numberParamValidator } from "../../../validation/validators/path-parameter.validators";
import roleAuthorization from "../../../middlewares/roleAuthorization.middleware";
import idAuthorization from "../../../middlewares/idAuthorization.middleware";

const router: Router = Router({ mergeParams: true });
const idParamValidation = [numberParamValidator("id"), validateRequest];

// router.post(
//   "/",
//   idParamValidation,
//   roleAuthorization("applicant", "admin"),
//   idAuthorization(true),
//   (req: Request, res: Response): any => {
//     return res.status(200).json({ req: req.params });
//   }
// );

router.post("/"); // TODO: Implement this route, for submitting and re-submitting education
router.post("/certificate"); // TODO: Implement this route, for uploading and re-uploading certificates

router.get("/"); // TODO: Implement this route, for getting all educations except certificate
router.get("/certificate"); // TODO: Implement this route, for getting certificates

export default router;
