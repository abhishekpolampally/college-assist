import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import httpStatus from "http-status";
import config from "./config/config.js";
import routes from "./routes/v1/index.js";
// import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/v1", routes);

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Global error handlers
// app.use(errorConverter); // Converts error to ApiError
// app.use(errorHandler); // Sends proper response

// Server
const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
