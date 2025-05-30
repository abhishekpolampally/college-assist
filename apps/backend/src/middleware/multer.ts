import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage if needed
const upload = multer({ storage });

export default upload;
