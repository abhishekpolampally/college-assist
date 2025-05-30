import catchAsync from "../utils/catchAsync.js";
import { Request, Response } from "express";
import { parseAndStoreCSV } from "../services/file.service.js";

export const uploadFile = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const buffer = req.file?.buffer;

  if (!buffer) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  await parseAndStoreCSV(buffer, userId);

  res.status(200).json({ message: "Data imported successfully" });
});
