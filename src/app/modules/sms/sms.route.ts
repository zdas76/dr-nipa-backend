import express from "express";
import { SMSController } from "./sms.controllers";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  SMSController.createSendSMS,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  SMSController.getSMSByMessageId,
);

export const SmsRoute = router;
