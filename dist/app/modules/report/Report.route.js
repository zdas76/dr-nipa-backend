"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoute = void 0;
const express_1 = __importDefault(require("express"));
const Report_controller_1 = require("./Report.controller");
const router = express_1.default.Router();
router.get("/daily-report", Report_controller_1.ReportController.getAppointmentDailyReportByDate);
exports.ReportRoute = router;
