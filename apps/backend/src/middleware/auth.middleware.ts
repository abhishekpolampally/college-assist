import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, "Token required");

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    (req as any).user = decoded;
    next();
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
};
