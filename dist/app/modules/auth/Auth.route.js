"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Auth_controllers_1 = require("./Auth.controllers");
const enums_1 = require("../../../generated/prisma/enums");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/login", Auth_controllers_1.AuthControllers.loginUser);
router.post("/refresh-token", Auth_controllers_1.AuthControllers.refreshToken);
router.post("/change-password", (0, auth_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.DOCTOR, enums_1.UserRole.ASSISTANT), Auth_controllers_1.AuthControllers.changePassword);
router.post("/forgot-password", Auth_controllers_1.AuthControllers.forgotPassword);
router.post("/reset-password", Auth_controllers_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
