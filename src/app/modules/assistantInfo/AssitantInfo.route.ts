import express from "express";
import { AssistantInfoController } from "./AssitantInfo.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  AssistantInfoController.createAssistant,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  AssistantInfoController.getAllAssistant,
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  AssistantInfoController.getAssistantById,
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  AssistantInfoController.updateAssistant,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  AssistantInfoController.deleteAssistant,
);

export const AssistantInfoRoute = router;
