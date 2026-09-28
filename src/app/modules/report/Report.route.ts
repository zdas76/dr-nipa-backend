import express from "express";
import { ReportController } from "./Report.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.get(
  "/daily-report",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  ReportController.getAppointmentDailyReportByDate,
);

export const ReportRoute = router;
