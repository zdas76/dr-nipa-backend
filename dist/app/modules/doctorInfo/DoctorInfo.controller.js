"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorInfoController = void 0;
const http_status_codes_1 = require("http-status-codes");
const DoctorInfo_service_1 = require("./DoctorInfo.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const getAllDoctors = (0, catchAsync_1.default)(async (req, res) => {
    const result = await DoctorInfo_service_1.DoctorInfoService.getAllDoctors();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Doctors fetched successfully",
        data: result,
    });
});
const getDoctorByEmail = (0, catchAsync_1.default)(async (req, res) => {
    const result = await DoctorInfo_service_1.DoctorInfoService.getDoctorByEmail(String(req.params.email));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Doctor fetched successfully",
        data: result,
    });
});
const updateDoctor = (0, catchAsync_1.default)(async (req, res) => {
    const result = await DoctorInfo_service_1.DoctorInfoService.updateDoctor(String(req.params.email), req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Doctor updated successfully",
        data: result,
    });
});
const deleteDoctor = (0, catchAsync_1.default)(async (req, res) => {
    const result = await DoctorInfo_service_1.DoctorInfoService.deleteDoctor(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Doctor deleted successfully",
        data: result,
    });
});
const addSafe = (0, catchAsync_1.default)(async (req, res) => {
    const id = Number(req.params.id);
    const result = await DoctorInfo_service_1.DoctorInfoService.addSafe(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Safe added successfully",
        data: result,
    });
});
exports.DoctorInfoController = {
    getAllDoctors,
    getDoctorByEmail,
    updateDoctor,
    deleteDoctor,
    addSafe,
};
