import express from "express";
import { DoctorInfoController } from "./DoctorInfo.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  DoctorInfoController.getAllDoctors,
);
router.get(
  "/:email",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  DoctorInfoController.getDoctorByEmail,
);
router.patch(
  "/:email",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  DoctorInfoController.updateDoctor,
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  DoctorInfoController.deleteDoctor,
);
router.patch(
  "/add-safe/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  DoctorInfoController.addSafe,
);

export const DoctorInfoRoute = router;
