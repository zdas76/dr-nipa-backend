import express from "express";
import { ConnectorInfoController } from "./ConnectorInfo.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  ConnectorInfoController.createConnect,
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  ConnectorInfoController.getAllConnect,
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  ConnectorInfoController.getConnectById,
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  ConnectorInfoController.updateConnect,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.ASSISTANT),
  ConnectorInfoController.deleteConnect,
);

export const ConnectorInfoRoute = router;
