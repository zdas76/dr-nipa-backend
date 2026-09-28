"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsSendService = void 0;
const prisma_1 = require("../../utiles/prisma");
const createSendSms = async (payload) => {
    const callerID = "1234";
    const usercontact = payload.appointmentInfo
        .map((appointment) => appointment.contactNumber)
        .join(",");
    const url = `${process.env.SMS_BASE_URL}` +
        `?apikey=${process.env.SMS_API_KEY}` +
        `&secretkey=${process.env.SMS_SECRET_KEY}` +
        `&content=${encodeURIComponent(JSON.stringify([{ callerID, toUser: usercontact, messageContent: payload.messageContent }]))}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const phone = payload.appointmentInfo;
        const messageId = data.Message_ID.split(",");
        const Messdata = phone.map((n, idx) => {
            const message_ID = messageId[idx];
            return {
                contactNumber: n.contactNumber,
                message_ID: message_ID,
                appointmentId: n.appointmentId,
            };
        });
        await prisma_1.prisma.sendMessage.createMany({
            data: Messdata,
        });
        return data;
    }
    catch (err) {
        return err;
    }
};
const getSmsbyMessageId = async (messId) => {
    const url = `https://smpp.revesms.com:7790/getstatus` +
        `?apikey=${process.env.SMS_API_KEY}` +
        `&secretkey=${process.env.SMS_SECRET_KEY}` +
        `&messageid=${messId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
exports.SmsSendService = {
    createSendSms,
    getSmsbyMessageId,
};
