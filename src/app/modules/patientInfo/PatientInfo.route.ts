import express from "express";
import { PatientInfoController } from "./PatientInfo.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  PatientInfoController.createPatient,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  PatientInfoController.getAllPatient,
);

router.get(
  "/search",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  PatientInfoController.getAllPatientBySearch,
);

router.get(
  "/:patientId",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  PatientInfoController.getPatientById,
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  PatientInfoController.updatePatient,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  PatientInfoController.deletePatient,
);

export const PatientInfoRoute = router;
