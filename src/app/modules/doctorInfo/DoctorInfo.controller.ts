import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DoctorInfoService } from "./DoctorInfo.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorInfoService.getAllDoctors();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctors fetched successfully",
        data: result,
    });
});

const getDoctorByEmail = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorInfoService.getDoctorByEmail(String(req.params.email));
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor fetched successfully",
        data: result,
    });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorInfoService.updateDoctor(String(req.params.email), req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor updated successfully",
        data: result,
    });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorInfoService.deleteDoctor(Number(req.params.id));
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor deleted successfully",
        data: result,
    });
});

const addSafe = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await DoctorInfoService.addSafe(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Safe added successfully",
        data: result,
    });
});

export const DoctorInfoController = {
    getAllDoctors,
    getDoctorByEmail,
    updateDoctor,
    deleteDoctor,
    addSafe,
};
