import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../config/httpStatusCodes";
import verifyJwtToken from "../utils/tokens/verifyJwtToken";

/**
 * Middleware function to authenticate requests based on JWT tokens.
 *
 * This function checks for a JWT token in the request cookies or the
 * `Authorization` header. If a valid token is found, it verifies the token
 * and attaches the payload to `res.locals.user`. If no valid token is found,
 * it clears the `token` cookie and responds with a 401 Unauthorized status.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns Any - Calls the next middleware function if authentication is successful.
 */
export default function auth(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const { token } = req.cookies;
  const { authorization } = req.headers;
  const tokenToCheck =
    token ||
    (authorization &&
    typeof authorization === "string" &&
    authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : null);

  if (!tokenToCheck) {
    res.clearCookie("token");
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized." });
  }

  const payload = verifyJwtToken(tokenToCheck);

  if (!payload) {
    res.clearCookie("token");
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized." });
  }

  res.locals.user = payload;

  return next();
}
