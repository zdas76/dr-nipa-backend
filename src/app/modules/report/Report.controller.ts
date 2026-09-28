import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { ReportService } from "./Report.service";

const getAppointmentDailyReportByDate = catchAsync(async (req: Request, res: Response) => {
    const date = req.query.date as string;
    const result = await ReportService.getAppointmentDailyReportByDate(date);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment Daily Report fetch Successfully",
        data: result,
    });
});

export const ReportController = {
    getAppointmentDailyReportByDate
}
