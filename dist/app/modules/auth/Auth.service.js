"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../utiles/jwtHelpers");
const prisma_1 = require("../../utiles/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../error/AppError"));
const enums_1 = require("../../../generated/prisma/enums");
const emailSender_1 = __importDefault(require("./emailSender"));
const loginUser = async (payLoad) => {
    const userData = await prisma_1.prisma.user.findFirst({
        where: {
            userName: payLoad.userName,
            status: enums_1.Status.ACTIVE,
        },
    });
    if (!userData) {
        throw new Error("User name or password not found");
    }
    const isCurrentPasword = await bcrypt_1.default.compare(payLoad.password, userData?.password);
    if (!isCurrentPasword) {
        throw new Error("Password incorrect!");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        email: userData?.email,
        userName: userData?.userName,
        role: userData?.role,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        email: userData?.email,
        userName: userData?.userName,
        role: userData?.role,
    }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    let userData;
    try {
        userData = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    }
    catch (error) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    await prisma_1.prisma.user.findFirstOrThrow({
        where: {
            email: userData.email,
            status: enums_1.Status.ACTIVE,
        },
    });
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        email: userData?.email,
        userName: userData?.userName,
        role: userData?.role,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
};
const changePassword = async (user, data) => {
    const userData = await prisma_1.prisma.user.findFirstOrThrow({
        where: {
            userName: user.userName,
            status: enums_1.Status.ACTIVE,
        },
    });
    const isCorrectPassword = await bcrypt_1.default.compare(data.olePassword, userData.password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const hassPassWord = await bcrypt_1.default.hash(data.newPassword, parseInt(config_1.default.hash_round));
    await prisma_1.prisma.user.update({
        where: {
            userName: userData.userName,
        },
        data: {
            password: hassPassWord,
        },
    });
    return {
        message: "Password Change Succesfully",
    };
};
const forgotPassword = async (playLoad) => {
    const userData = await prisma_1.prisma.user.findFirstOrThrow({
        where: {
            email: playLoad.email,
            status: enums_1.Status.ACTIVE,
        },
    });
    const resetPasswordToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        email: userData?.email,
        userName: userData?.userName,
        role: userData?.role,
    }, config_1.default.jwt.reset_pass_secret, config_1.default.jwt.reset_pass_token_expires_in);
    const resetPassLink = config_1.default.reset_pass_link +
        `?email=${userData.email}&token=${resetPasswordToken}`;
    await (0, emailSender_1.default)(userData.email, `
    <p> Your password reset link 
    <a href=${resetPassLink}>
      Reset Password
    </a>
    </p>
    `);
};
const resetPassword = async (token, payLoad) => {
    const userData = await prisma_1.prisma.user.findFirstOrThrow({
        where: {
            email: payLoad.email,
            status: enums_1.Status.ACTIVE,
        },
    });
    const isValidToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.reset_pass_secret);
    if (!isValidToken) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const hassPassWord = await bcrypt_1.default.hash(payLoad.passWord, parseInt(config_1.default.hash_round));
    await prisma_1.prisma.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hassPassWord,
        },
    });
};
exports.AuthService = {
    loginUser,
    refreshToken,
    forgotPassword,
    changePassword,
    resetPassword,
};
