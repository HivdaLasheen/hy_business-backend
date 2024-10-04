import { Request, Response, NextFunction } from "express";
import isJsonParseError from "./json-prase.error";
import HttpStatusCodes from "../config/httpStatusCodes";
import isRequestTimeoutError from "./request-timeout.error";
import isFileUploadError from "./file-upload.error";

export default function (err: any, req: Request, res: Response, next: NextFunction): any {
  if (res.headersSent) return next(err);

  if (isJsonParseError(err))
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Invalid JSON payload." });

  if (isRequestTimeoutError(err))
    return res
      .status(HttpStatusCodes.REQUEST_TIMEOUT)
      .json({ error: "Request Timeout.", delay: err.timeout });

  if (isFileUploadError(err))
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: err.message + "." });

  return next(err);
}
