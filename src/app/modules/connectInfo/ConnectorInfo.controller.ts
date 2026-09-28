import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ConnectorInfoService } from "./ConnectorInfo.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createConnect = catchAsync(async (req: Request, res: Response) => {
    const result = await ConnectorInfoService.createConnect(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Connector created successfully",
        data: result,
    });
});

const getAllConnect = catchAsync(async (req: Request, res: Response) => {
    const result = await ConnectorInfoService.getAllConnect();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Connectors fetched successfully",
        data: result,
    });
});

const getConnectById = catchAsync(async (req: Request, res: Response) => {
    const result = await ConnectorInfoService.getConnectById(Number(req.params.id));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Connector fetched successfully",
        data: result,
    });
});

const updateConnect = catchAsync(async (req: Request, res: Response) => {
    const result = await ConnectorInfoService.updateConnect(Number(req.params.id), req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Connector updated successfully",
        data: result,
    });
});

const deleteConnect = catchAsync(async (req: Request, res: Response) => {
    const result = await ConnectorInfoService.deleteConnect(Number(req.params.id));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Connector deleted successfully",
        data: result,
    });
});

export const ConnectorInfoController = {
    createConnect,
    getAllConnect,
    getConnectById,
    updateConnect,
    deleteConnect,
};
