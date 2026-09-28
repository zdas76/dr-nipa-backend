"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const Appointment_service_1 = require("./Appointment.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createAppointment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await Appointment_service_1.AppointmentService.createAppointment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Appointment create Successfully",
        data: result,
    });
});
const getAllAppointmentbyDays = (0, catchAsync_1.default)(async (req, res) => {
    const date = req.query.date;
    const result = await Appointment_service_1.AppointmentService.getAllAppointmentbyDays(date);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Appointment fetch Successfully",
        data: result,
    });
});
const getAppointmentById = (0, catchAsync_1.default)(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await Appointment_service_1.AppointmentService.getAppointmentById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Appointment fetch Successfully",
        data: result,
    });
});
const updateAppointment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await Appointment_service_1.AppointmentService.updateAppointment(Number(req.params.id), req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Appointment update Successfully",
        data: result,
    });
});
const updateAppointmentStatus = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    const result = await Appointment_service_1.AppointmentService.updateAppointmentStatus(id, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Appointment status updated successfully",
        data: result,
    });
});
const deleteAppointment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await Appointment_service_1.AppointmentService.deleteAppointment(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Appointment delete Successfully",
        data: result,
    });
});
const lastVisitingDate = (0, catchAsync_1.default)(async (req, res) => {
    const patientId = Number(req.params.patientId);
    const result = await Appointment_service_1.AppointmentService.lastVisitingDate(patientId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Last Visiting Date fetch Successfully",
        data: result,
    });
});
exports.AppointmentController = {
    createAppointment,
    getAllAppointmentbyDays,
    getAppointmentById,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    lastVisitingDate,
};
