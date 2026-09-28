import express from "express";
import { AppointmentController } from "./Appointment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  AppointmentController.createAppointment,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  AppointmentController.getAllAppointmentbyDays,
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  AppointmentController.getAppointmentById,
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  AppointmentController.updateAppointmentStatus,
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  AppointmentController.updateAppointment,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  AppointmentController.deleteAppointment,
);

router.get(
  "/last-visiting-date/:patientId",
  auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
  AppointmentController.lastVisitingDate,
);

export const AppointmentRoute = router;
