import { NextFunction, Response } from "express";
import { AuthRequest } from "../controllers/auth.controller";

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin role required" });
  }
  next();
};
