import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../utiles/jwtHelpers";
import { prisma } from "../../utiles/prisma";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { Status } from "../../../generated/prisma/enums";
import emailSender from "./emailSender";



const loginUser = async (payLoad: { userName: string; password: string }) => {


    const userData = await prisma.user.findFirst({
        where: {
            userName: payLoad.userName,
            status: Status.ACTIVE,
        },
    });

    if (!userData) {
        throw new Error("User name or password not found");
    }

    const isCurrentPasword = await bcrypt.compare(
        payLoad.password,
        userData?.password as string
    );

    if (!isCurrentPasword) {
        throw new Error("Password incorrect!");
    }

    const accessToken = jwtHelpers.generateToken(
        {
            id: userData.id,
            email: userData?.email,
            userName: userData?.userName,
            role: userData?.role,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            id: userData.id,
            email: userData?.email,
            userName: userData?.userName,
            role: userData?.role,
        },
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as string
    );
    return {
        accessToken,
        refreshToken,
    };
};

const refreshToken = async (token: string) => {
    let userData;
    try {
        userData = jwtHelpers.verifyToken(
            token,
            config.jwt.refresh_token_secret as Secret
        );
    } catch (error) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }

    await prisma.user.findFirstOrThrow({
        where: {
            email: userData.email,
            status: Status.ACTIVE,
        },
    });

    const accessToken = jwtHelpers.generateToken(
        {
            id: userData.id,
            email: userData?.email,
            userName: userData?.userName,
            role: userData?.role,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken,
    };
};

const changePassword = async (
    user: { userName: string; role: string; iat: number; exp: number },
    data: { olePassword: string; newPassword: string }
) => {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            userName: user.userName,
            status: Status.ACTIVE,
        },
    });
    const isCorrectPassword: boolean = await bcrypt.compare(
        data.olePassword,
        userData.password
    );

    if (!isCorrectPassword) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const hassPassWord: string = await bcrypt.hash(
        data.newPassword,
        parseInt(config.hash_round as string)
    );

    await prisma.user.update({
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

const forgotPassword = async (playLoad: { email: string }) => {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: playLoad.email,
            status: Status.ACTIVE,
        },
    });

    const resetPasswordToken = jwtHelpers.generateToken(
        {
            id: userData.id,
            email: userData?.email,
            userName: userData?.userName,
            role: userData?.role,
        },
        config.jwt.reset_pass_secret as Secret,
        config.jwt.reset_pass_token_expires_in as string
    );
    const resetPassLink =
        config.reset_pass_link +
        `?email=${userData.email}&token=${resetPasswordToken}`;
    await emailSender(
        userData.email,
        `
    <p> Your password reset link 
    <a href=${resetPassLink}>
      Reset Password
    </a>
    </p>
    `
    );
};

const resetPassword = async (
    token: string,
    payLoad: { email: string; passWord: string }
) => {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payLoad.email,
            status: Status.ACTIVE,
        },
    });

    const isValidToken = jwtHelpers.verifyToken(
        token,
        config.jwt.reset_pass_secret as Secret
    );

    if (!isValidToken) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Your are not Authorized");
    }
    const hassPassWord: string = await bcrypt.hash(
        payLoad.passWord,
        parseInt(config.hash_round as string)
    );
    await prisma.user.update({
        where: {
            email: userData.email!,
        },
        data: {
            password: hassPassWord,
        },
    });
};

export const AuthService = {
    loginUser,
    refreshToken,
    forgotPassword,
    changePassword,
    resetPassword,
};