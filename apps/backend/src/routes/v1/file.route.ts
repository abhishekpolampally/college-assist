import express from "express";
import upload from "../../middleware/multer.js";
import { uploadFile } from "../../controllers/file.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", auth, upload.single("file"), uploadFile);

export default router;
