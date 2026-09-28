"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsRoute = void 0;
const express_1 = __importDefault(require("express"));
const sms_controllers_1 = require("./sms.controllers");
const router = express_1.default.Router();
router.post("/", 
// auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
sms_controllers_1.SMSController.createSendSMS);
router.get("/", 
//   auth(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.DOCTOR),
sms_controllers_1.SMSController.getSMSByMessageId);
exports.SmsRoute = router;
