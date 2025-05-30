import dotenv from "dotenv";

dotenv.config();

export default {
  jwt: {
    secret: process.env.JWT_SECRET || "your_default_secret",
    expiresIn: "7d",
  },
  port: process.env.PORT || 5000,
};
