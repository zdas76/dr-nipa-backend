"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientInfoController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const PatientInfo_service_1 = require("./PatientInfo.service");
const createPatient = (0, catchAsync_1.default)(async (req, res) => {
    const result = await PatientInfo_service_1.PatientInfoService.createPatient(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Patient create Successfully",
        data: result,
    });
});
const getAllPatient = (0, catchAsync_1.default)(async (req, res) => {
    const result = await PatientInfo_service_1.PatientInfoService.getAllPatient();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Patient fetch Successfully",
        data: result,
    });
});
const getAllPatientBySearch = (0, catchAsync_1.default)(async (req, res) => {
    const searchTerm = (req.query.search || null);
    const result = await PatientInfo_service_1.PatientInfoService.getAllPatientBySearch(searchTerm);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Patient fetch Successfully",
        data: result,
    });
});
const getPatientById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await PatientInfo_service_1.PatientInfoService.getPatientById(Number(req.params.patientId));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Patient fetch Successfully",
        data: result,
    });
});
const updatePatient = (0, catchAsync_1.default)(async (req, res) => {
    const result = await PatientInfo_service_1.PatientInfoService.updatePatient(Number(req.params.id), req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Patient update Successfully",
        data: result,
    });
});
const deletePatient = (0, catchAsync_1.default)(async (req, res) => {
    const result = await PatientInfo_service_1.PatientInfoService.deletePatient(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Patient delete Successfully",
        data: result,
    });
});
exports.PatientInfoController = {
    createPatient,
    getAllPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    getAllPatientBySearch
};
