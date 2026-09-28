"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorInfoRoute = void 0;
const express_1 = __importDefault(require("express"));
const DoctorInfo_controller_1 = require("./DoctorInfo.controller");
const router = express_1.default.Router();
router.get("/", DoctorInfo_controller_1.DoctorInfoController.getAllDoctors);
router.get("/:email", DoctorInfo_controller_1.DoctorInfoController.getDoctorByEmail);
router.patch("/:email", DoctorInfo_controller_1.DoctorInfoController.updateDoctor);
router.delete("/:id", DoctorInfo_controller_1.DoctorInfoController.deleteDoctor);
router.patch("/add-safe/:id", DoctorInfo_controller_1.DoctorInfoController.addSafe);
exports.DoctorInfoRoute = router;
