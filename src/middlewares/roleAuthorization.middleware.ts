import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../config/httpStatusCodes";

/**
 * Middleware to authorize user roles.
 *
 * This middleware checks if the user's role is included in the allowed roles.
 * If the user's role is not authorized, it responds with a 403 Forbidden status.
 *
 * @param {...string[]} roles - The roles that are allowed to access the route.
 * @returns {Function} Middleware function to handle role authorization.
 *
 * @example
 * app.get("/admin", roleAuthorization("applicant", "admin"), (req, res) => {
 *  res.json({ message: "Applicant and Admin route." });
 * });
 */
export default function roleAuthorization(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): any => {
    const { user } = res.locals;

    if (!roles.includes(user.role))
      return res
        .status(HttpStatusCodes.FORBIDDEN)
        .json({ message: "Forbidden." });

    return next();
  };
}
