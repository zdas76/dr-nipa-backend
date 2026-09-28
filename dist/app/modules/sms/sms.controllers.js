"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sms_service_1 = require("./sms.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createSendSMS = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sms_service_1.SmsSendService.createSendSms(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Message send Successfully",
        data: result,
    });
});
const getSMSByMessageId = (0, catchAsync_1.default)(async (req, res) => {
    const messid = req.query.messageId;
    const result = await sms_service_1.SmsSendService.getSmsbyMessageId(messid);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Message retrieve Successfully",
        data: result,
    });
});
exports.SMSController = {
    createSendSMS,
    getSMSByMessageId,
};
