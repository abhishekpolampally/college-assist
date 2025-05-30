import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import { llmChat } from "../../controllers/llm.controller.js";

const router = express.Router();

router.post("/chat", auth, llmChat);

export default router;
