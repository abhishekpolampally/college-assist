import catchAsync from "../utils/catchAsync.js";
import { Request, Response } from "express";
import { sendMessage } from "../services/llm.service.js";

export const llmChat = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const content = req.body.content;

  if (!content || content.length === 0) {
    return res.status(400).json({ message: "Please provide a valid prompt" });
  }

  const llmResponse = await sendMessage(userId, content);

  res.status(200).json({ message: llmResponse });
});
