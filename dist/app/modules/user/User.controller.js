"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const User_service_1 = require("./User.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await User_service_1.UserService.createUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User created successfully",
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await User_service_1.UserService.deleteUser(Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});
exports.UserController = {
    createUser,
    deleteUser
};
