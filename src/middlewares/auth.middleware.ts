import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../config/httpStatusCodes";
import verifyJwtToken from "../utils/tokens/verifyJwtToken";
import config from "../config";

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
  res.json({ message: "Authorized." });
  // next();
}
