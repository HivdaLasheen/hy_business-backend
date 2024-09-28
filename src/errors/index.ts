import { Request, Response, NextFunction } from "express";
import isJsonParseError from "./json-prase.error";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  if (isJsonParseError(err)) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }

  return next(err);
}
