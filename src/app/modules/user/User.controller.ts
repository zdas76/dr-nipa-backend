import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./User.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User created successfully",
        data: result,
    });
});


const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(Number(req.params.id));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});

export const UserController = {
    createUser,
    deleteUser
};
