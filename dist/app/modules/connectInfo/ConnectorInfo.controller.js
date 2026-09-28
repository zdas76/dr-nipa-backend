"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorInfoController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const ConnectorInfo_service_1 = require("./ConnectorInfo.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createConnect = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ConnectorInfo_service_1.ConnectorInfoService.createConnect(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Connector created successfully",
        data: result,
    });
});
const getAllConnect = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ConnectorInfo_service_1.ConnectorInfoService.getAllConnect();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Connectors fetched successfully",
        data: result,
    });
});
const getConnectById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ConnectorInfo_service_1.ConnectorInfoService.getConnectById(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Connector fetched successfully",
        data: result,
    });
});
const updateConnect = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ConnectorInfo_service_1.ConnectorInfoService.updateConnect(Number(req.params.id), req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Connector updated successfully",
        data: result,
    });
});
const deleteConnect = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ConnectorInfo_service_1.ConnectorInfoService.deleteConnect(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Connector deleted successfully",
        data: result,
    });
});
exports.ConnectorInfoController = {
    createConnect,
    getAllConnect,
    getConnectById,
    updateConnect,
    deleteConnect,
};
