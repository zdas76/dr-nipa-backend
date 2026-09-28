import express from "express";
import { AuthControllers } from "./Auth.controllers";
import { UserRole } from "../../../generated/prisma/enums";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/login", AuthControllers.loginUser);

router.post(
  "/refresh-token",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  AuthControllers.refreshToken,
);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  AuthControllers.changePassword,
);

router.post(
  "/forgot-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  AuthControllers.forgotPassword,
);

router.post(
  "/reset-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
