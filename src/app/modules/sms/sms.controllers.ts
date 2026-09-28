import { Strict } from "./../../../generated/prisma/internal/prismaNamespace";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { SmsSendService } from "./sms.service";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createSendSMS = catchAsync(async (req: Request, res: Response) => {
  const result = await SmsSendService.createSendSms(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message send Successfully",
    data: result,
  });
});

const getSMSByMessageId = catchAsync(async (req: Request, res: Response) => {
  const messid = req.query.messageId as string;

  const result = await SmsSendService.getSmsbyMessageId(messid);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Message retrieve Successfully",
    data: result,
  });
});

export const SMSController = {
  createSendSMS,
  getSMSByMessageId,
};
