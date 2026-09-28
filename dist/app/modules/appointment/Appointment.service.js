"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const client_1 = require("../../../generated/prisma/client");
const prisma_1 = require("../../utiles/prisma");
const generatePatientId_1 = require("../../utiles/generatePatientId");
const createAppointment = async (appointmentData) => {
    const patientId = await (0, generatePatientId_1.generatePatientId)();
    let isPatientExist = null;
    if (!appointmentData.patientId) {
        isPatientExist = await prisma_1.prisma.patientInfo.create({
            data: {
                patientId,
                name: appointmentData.name,
                contactNumber: appointmentData.contactNumber,
                age: appointmentData.age,
                sex: appointmentData.sex,
                address: appointmentData.address,
            },
        });
    }
    else {
        isPatientExist = await prisma_1.prisma.patientInfo.findUnique({
            where: { patientId: appointmentData.patientId },
        });
        if (!isPatientExist) {
            throw new Error("Patient not found");
        }
    }
    if (appointmentData.connectorId) {
        const isConnectorExist = await prisma_1.prisma.connectorInfo.findUnique({
            where: { id: appointmentData.connectorId },
        });
        if (!isConnectorExist) {
            throw new Error("Connector not found");
        }
    }
    const checkAppointmentByDate = await prisma_1.prisma.appointment.findFirst({
        where: {
            patientId: isPatientExist.patientId,
            visitingDate: new Date(appointmentData.visitingDate),
        },
    });
    if (checkAppointmentByDate) {
        throw new Error("This Patient already appointed on this day, please select another day.");
    }
    const result = await prisma_1.prisma.appointment.create({
        data: {
            patientId: isPatientExist?.patientId,
            visitingDate: new Date(appointmentData.visitingDate),
            patientType: appointmentData.patientType,
            visitingTime: appointmentData.visitingTime,
            connectorId: appointmentData.connectorId,
            visitingFee: appointmentData.visitingFee,
            discount: appointmentData.discount,
            weight: appointmentData.weight,
            booldPusher: appointmentData.booldPusher,
            bloodGroup: appointmentData.bloodGroup,
            status: appointmentData.status,
            paymentStatus: appointmentData.paymentStatus,
        },
    });
    const appoinmentInfo = await prisma_1.prisma.appointment.findFirst({
        where: { id: result.id },
        include: {
            patientInfo: {
                select: {
                    id: true,
                    patientId: true,
                    name: true,
                    contactNumber: true,
                },
            },
        },
    });
    return appoinmentInfo;
};
const getAllAppointmentbyDays = async (queryDate) => {
    const isSafestatus = await prisma_1.prisma.isSafe.findFirst();
    let date = new Date();
    if (queryDate) {
        date = new Date(queryDate);
    }
    const PresentAppointment = await prisma_1.prisma.appointment.findMany({
        where: {
            visitingDate: date,
            status: client_1.AppointmentStatus.PRESENT,
        },
        ...(isSafestatus?.isSafe === true &&
            isSafestatus?.limit != null && {
            take: isSafestatus.limit,
        }),
        include: {
            patientInfo: true,
            connectorInfo: {
                select: {
                    id: true,
                    name: true,
                    diagnosticName: true,
                },
            },
            sendMessage: {
                select: {
                    contactNumber: true,
                    message_ID: true,
                    appointmentId: true,
                },
            },
        },
    });
    const OtherAppointments = await prisma_1.prisma.appointment.findMany({
        where: {
            visitingDate: date,
            OR: [
                { status: client_1.AppointmentStatus.BOOKED },
                { status: client_1.AppointmentStatus.ABSENT },
                { status: client_1.AppointmentStatus.VISITED },
            ],
        },
        ...(isSafestatus?.isSafe === true &&
            isSafestatus?.limit != null && {
            take: isSafestatus.limit,
        }),
        include: {
            patientInfo: true,
            connectorInfo: {
                select: {
                    id: true,
                    name: true,
                    diagnosticName: true,
                },
            },
            sendMessage: {
                select: {
                    contactNumber: true,
                    message_ID: true,
                    appointmentId: true,
                },
            },
        },
    });
    return [...PresentAppointment, ...OtherAppointments];
};
const getAppointmentById = async (id) => {
    const result = await prisma_1.prisma.appointment.findFirst({
        where: { id: Number(id) },
        include: {
            patientInfo: true,
            connectorInfo: {
                select: {
                    id: true,
                    name: true,
                    diagnosticName: true,
                },
            },
        },
    });
    return result;
};
const updateAppointment = async (id, appointmentData) => {
    const updateData = {};
    if (appointmentData.visitingDate) {
        updateData.visitingDate = new Date(appointmentData.visitingDate);
    }
    if (appointmentData.patientType) {
        updateData.patientType = appointmentData.patientType;
    }
    if (appointmentData.visitingTime) {
        updateData.visitingTime = appointmentData.visitingTime;
    }
    if (appointmentData.connectorId) {
        updateData.connectorId = appointmentData.connectorId;
    }
    if (appointmentData.visitingFee) {
        updateData.visitingFee = appointmentData.visitingFee;
    }
    if (appointmentData.connectorFee) {
        updateData.connectorFee = appointmentData.connectorFee;
    }
    if (appointmentData.discount) {
        updateData.discount = appointmentData.discount;
    }
    if (appointmentData.weight) {
        updateData.weight = appointmentData.weight;
    }
    if (appointmentData.booldPusher) {
        updateData.booldPusher = appointmentData.booldPusher;
    }
    if (appointmentData.bloodGroup) {
        updateData.bloodGroup = appointmentData.bloodGroup;
    }
    if (appointmentData.status) {
        updateData.status = appointmentData.status;
    }
    if (appointmentData.paymentStatus) {
        updateData.paymentStatus = appointmentData.paymentStatus;
    }
    const appointment = await prisma_1.prisma.appointment.findFirst({
        where: { id: Number(id) },
    });
    if (!appointment) {
        throw new Error("Appointment not found");
    }
    const result = await prisma_1.prisma.appointment.update({
        where: { id: appointment.id },
        data: updateData,
    });
    return result;
};
const updateAppointmentStatus = async (id, status) => {
    const appointment = await prisma_1.prisma.appointment.findFirst({
        where: { id: Number(id) },
    });
    if (!appointment) {
        throw new Error("Appointment not found");
    }
    const result = await prisma_1.prisma.appointment.update({
        where: { id: appointment.id },
        data: { status },
    });
    return result;
};
const deleteAppointment = async (id) => {
    const isExist = await prisma_1.prisma.appointment.findFirst({
        where: { id: Number(id) },
    });
    if (!isExist) {
        throw new Error("Appointment not found");
    }
    const result = await prisma_1.prisma.appointment.delete({
        where: { id: isExist.id },
    });
    return result;
};
const lastVisitingDate = async (patientId) => {
    const patientInfo = await prisma_1.prisma.appointment.findFirst({
        where: { patientId: patientId, status: client_1.AppointmentStatus.VISITED },
        orderBy: {
            visitingDate: "desc",
        },
    });
    return patientInfo?.visitingDate || null;
};
exports.AppointmentService = {
    createAppointment,
    getAllAppointmentbyDays,
    getAppointmentById,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    lastVisitingDate,
};
