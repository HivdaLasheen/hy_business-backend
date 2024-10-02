import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../config/httpStatusCodes";

/**
 * Middleware to authorize access based on user ID or admin role.
 *
 * @param {boolean} [allowAdmin=false] - Flag to allow admin users to bypass ID check.
 * @returns {Function} Middleware function to handle authorization.
 *
 * The middleware checks if the user ID in the request parameters matches the user ID in the response locals.
 * If `allowAdmin` is true and the user's role is "admin", the request is allowed to proceed.
 * Otherwise, if the IDs do not match, a 403 Forbidden response is returned.
 *
 * @example
 * // Usage in an Express route
 * app.get('/user/:id', idAuthorization(true), (req, res) => {
 *   res.send('User data');
 * });
 */
export default function idAuthorization(allowAdmin: boolean = false) {
  return (req: Request, res: Response, next: NextFunction): any => {
    const { id } = req.params;
    const { user } = res.locals;

    if ((allowAdmin && user.role === "admin") || id === user.id) return next();

    return res
      .status(HttpStatusCodes.FORBIDDEN)
      .json({ message: "Forbidden." });
  };
}
