"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantInfoController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const AssitantInfo_service_1 = require("./AssitantInfo.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createAssistant = (0, catchAsync_1.default)(async (req, res) => {
    const result = await AssitantInfo_service_1.AssistantInfoService.createAssistant(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Assistant create Successfully",
        data: result,
    });
});
const getAllAssistant = (0, catchAsync_1.default)(async (req, res) => {
    const result = await AssitantInfo_service_1.AssistantInfoService.getAllAssistant();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Assistant fetch Successfully",
        data: result,
    });
});
const getAssistantById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await AssitantInfo_service_1.AssistantInfoService.getAssistantById(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Assistant fetch Successfully",
        data: result,
    });
});
const updateAssistant = (0, catchAsync_1.default)(async (req, res) => {
    const result = await AssitantInfo_service_1.AssistantInfoService.updateAssistant(Number(req.params.id), req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Assistant update Successfully",
        data: result,
    });
});
const deleteAssistant = (0, catchAsync_1.default)(async (req, res) => {
    const result = await AssitantInfo_service_1.AssistantInfoService.deleteAssistant(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Assistant delete Successfully",
        data: result,
    });
});
exports.AssistantInfoController = {
    createAssistant,
    getAllAssistant,
    getAssistantById,
    updateAssistant,
    deleteAssistant
};
