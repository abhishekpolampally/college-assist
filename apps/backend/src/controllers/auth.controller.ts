import catchAsync from "../utils/catchAsync.js";
import * as authService from "../services/auth.service.js";
import httpStatus from "http-status";
import { Request, Response } from "express";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await authService.register(name, email, password, role);
    res.status(httpStatus.CREATED).send({ user });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error });
  }
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token } = await authService.login(email, password);
    res.status(httpStatus.ACCEPTED).send({ token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error });
  }
});
