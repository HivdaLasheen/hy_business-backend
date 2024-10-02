import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware to validate the request using express-validator.
 * If validation errors are found, it responds with a 400 status and the errors.
 * Otherwise, it proceeds to the next middleware.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns If validation errors are found, it returns a response with status 400 and the errors.
 */
export default function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
}
