"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientInfoRoute = void 0;
const express_1 = __importDefault(require("express"));
const PatientInfo_controller_1 = require("./PatientInfo.controller");
const router = express_1.default.Router();
router.post("/", PatientInfo_controller_1.PatientInfoController.createPatient);
router.get("/", PatientInfo_controller_1.PatientInfoController.getAllPatient);
router.get("/search", PatientInfo_controller_1.PatientInfoController.getAllPatientBySearch);
router.get("/:patientId", PatientInfo_controller_1.PatientInfoController.getPatientById);
router.patch("/:id", PatientInfo_controller_1.PatientInfoController.updatePatient);
router.delete("/:id", PatientInfo_controller_1.PatientInfoController.deletePatient);
exports.PatientInfoRoute = router;
