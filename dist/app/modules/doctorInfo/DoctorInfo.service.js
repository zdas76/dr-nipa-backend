"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorInfoService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../utiles/prisma");
const AppError_1 = __importDefault(require("../../error/AppError"));
const getAllDoctors = async () => {
    const result = await prisma_1.prisma.doctorInfo.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
};
const getDoctorByEmail = async (email) => {
    const result = await prisma_1.prisma.doctorInfo.findUnique({
        where: { email: email },
        include: {
            isSafes: true,
        }
    });
    return result;
};
const updateDoctor = async (email, payload) => {
    const doctor = await prisma_1.prisma.doctorInfo.findUnique({
        where: { email },
    });
    if (!doctor) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Doctor not found");
    }
    const result = await prisma_1.prisma.doctorInfo.update({
        where: { id: doctor.id },
        data: payload,
    });
    return result;
};
const deleteDoctor = async (id) => {
    const result = await prisma_1.prisma.doctorInfo.delete({
        where: { id },
    });
    return result;
};
const addSafe = async (id, payload) => {
    const doctor = await prisma_1.prisma.doctorInfo.findUnique({
        where: { id: payload.doctorId },
    });
    if (!doctor) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Doctor not found");
    }
    const safe = await prisma_1.prisma.isSafe.upsert({
        where: { id: Number(id) || undefined },
        update: { ...payload.isSafe && { isSafe: payload.isSafe }, ...payload.limit && { limit: payload.limit } },
        create: { ...payload.isSafe && { isSafe: payload.isSafe }, ...payload.limit && { limit: payload.limit }, doctorId: doctor.id },
    });
    return safe;
};
exports.DoctorInfoService = {
    getAllDoctors,
    getDoctorByEmail,
    updateDoctor,
    deleteDoctor,
    addSafe,
};
