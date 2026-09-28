import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PatientInfoService } from "./PatientInfo.service";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await PatientInfoService.createPatient(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient create Successfully",
        data: result,
    });
});


const getAllPatient = catchAsync(async (req: Request, res: Response) => {

    const result = await PatientInfoService.getAllPatient();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient fetch Successfully",
        data: result,
    });
});

const getAllPatientBySearch = catchAsync(async (req: Request, res: Response) => {
    const searchTerm = (req.query.search || null) as string;

    const result = await PatientInfoService.getAllPatientBySearch(searchTerm);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient fetch Successfully",
        data: result,
    });
});

const getPatientById = catchAsync(async (req: Request, res: Response) => {
    const result = await PatientInfoService.getPatientById(Number(req.params.patientId));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient fetch Successfully",
        data: result,
    });
});




const updatePatient = catchAsync(async (req: Request, res: Response) => {
    const result = await PatientInfoService.updatePatient(Number(req.params.id), req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient update Successfully",
        data: result,
    });
});


const deletePatient = catchAsync(async (req: Request, res: Response) => {
    const result = await PatientInfoService.deletePatient(Number(req.params.id));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient delete Successfully",
        data: result,
    });
});


export const PatientInfoController = {
    createPatient,
    getAllPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    getAllPatientBySearch
}