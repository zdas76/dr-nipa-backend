import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AssistantInfoService } from "./AssitantInfo.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createAssistant = catchAsync(async (req: Request, res: Response) => {
    const result = await AssistantInfoService.createAssistant(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Assistant create Successfully",
        data: result,
    });
});

const getAllAssistant = catchAsync(async (req: Request, res: Response) => {
    const result = await AssistantInfoService.getAllAssistant();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Assistant fetch Successfully",
        data: result,
    });
});

const getAssistantById = catchAsync(async (req: Request, res: Response) => {
    const result = await AssistantInfoService.getAssistantById(Number(req.params.id));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Assistant fetch Successfully",
        data: result,
    });
});

const updateAssistant = catchAsync(async (req: Request, res: Response) => {
    const result = await AssistantInfoService.updateAssistant(Number(req.params.id), req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Assistant update Successfully",
        data: result,
    });
});

const deleteAssistant = catchAsync(async (req: Request, res: Response) => {
    const result = await AssistantInfoService.deleteAssistant(Number(req.params.id));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Assistant delete Successfully",
        data: result,
    });
});

export const AssistantInfoController = {
    createAssistant,
    getAllAssistant,
    getAssistantById,
    updateAssistant,
    deleteAssistant
}