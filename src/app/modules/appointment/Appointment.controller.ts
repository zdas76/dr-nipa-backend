import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AppointmentService } from "./Appointment.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.createAppointment(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment create Successfully",
        data: result,
    });
});

const getAllAppointmentbyDays = catchAsync(async (req: Request, res: Response) => {

    const date = req.query.date as string;

    const result = await AppointmentService.getAllAppointmentbyDays(date);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment fetch Successfully",
        data: result,
    });
});

const getAppointmentById = catchAsync(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const result = await AppointmentService.getAppointmentById(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment fetch Successfully",
        data: result,
    });
});


const updateAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.updateAppointment(Number(req.params.id), req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment update Successfully",
        data: result,
    });
});

const updateAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    const result = await AppointmentService.updateAppointmentStatus(id, status);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment status updated successfully",
        data: result,
    });
});

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.deleteAppointment(Number(req.params.id));

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment delete Successfully",
        data: result,
    });
});

const lastVisitingDate = catchAsync(async (req: Request, res: Response) => {
    const patientId = Number(req.params.patientId);
    const result = await AppointmentService.lastVisitingDate(patientId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Last Visiting Date fetch Successfully",
        data: result,
    });
});


export const AppointmentController = {
    createAppointment,
    getAllAppointmentbyDays,
    getAppointmentById,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    lastVisitingDate,
}
