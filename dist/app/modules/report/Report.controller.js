"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const Report_service_1 = require("./Report.service");
const getAppointmentDailyReportByDate = (0, catchAsync_1.default)(async (req, res) => {
    const date = req.query.date;
    const result = await Report_service_1.ReportService.getAppointmentDailyReportByDate(date);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Appointment Daily Report fetch Successfully",
        data: result,
    });
});
exports.ReportController = {
    getAppointmentDailyReportByDate
};
