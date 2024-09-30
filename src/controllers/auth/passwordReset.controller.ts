import { Request, Response } from "express";
import { validationResult } from "express-validator";
import generateVerificationToken from "../../utils/tokens/generateVerificationToken";
import createErrorObject from "../../utils/createValidationErrorObject";
import comparePassword from "../../utils/password/comparePassword";
import hashPassword from "../../utils/password/hashPassword";
import HttpStatusCodes from "../../config/httpStatusCodes";
import prisma from "../../prisma";

async function requestPasswordReset(
  req: Request,
  res: Response
): Promise<any> {}

async function passwordReset(req: Request, res: Response): Promise<any> {}

export { requestPasswordReset, passwordReset };
