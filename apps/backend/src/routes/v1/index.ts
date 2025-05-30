import express from "express";
import authRoute from "./auth.route.js";
import fileRoute from "./file.route.js";
import llmRoute from "./llm.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/file", fileRoute); // CSV upload, parsing
router.use("/llm", llmRoute); // LLM endpoints

export default router;
