import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { prisma } from "@college-assistant/db";
import { Role } from "../interfaces/user.interface.js";

export const register = async (
  name: string,
  email: string,
  password: string,
  role: Role
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already in use");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
    select: {
      name: true,
      email: true,
    },
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn as any }
  );

  return { token };
};
