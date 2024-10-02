import { Request, Response, NextFunction } from "express";
import isJsonParseError from "./json-prase.error";
import { ETIMEDOUT } from "constants";
import HttpStatusCodes from "../config/httpStatusCodes";
import isRequestTimeoutError from "./request-timeout.error";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  if (res.headersSent) return next(err);

  if (isJsonParseError(err))
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Invalid JSON payload." });

  if (isRequestTimeoutError(err))
    return res
      .status(HttpStatusCodes.REQUEST_TIMEOUT)
      .json({ error: "Request Timeout.", delay: err.timeout });

  return next(err);
}
