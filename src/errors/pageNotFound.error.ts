import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction): any {
  res.status(404).json({ message: "Page was not found" });
}
