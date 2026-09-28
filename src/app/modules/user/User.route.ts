import express from "express";
import { UserController } from "./User.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  UserController.createUser,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  UserController.deleteUser,
);

export const UserRoute = router;
