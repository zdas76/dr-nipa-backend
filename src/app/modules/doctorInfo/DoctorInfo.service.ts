import { StatusCodes } from "http-status-codes";
import { prisma } from "../../utiles/prisma";
import AppError from "../../error/AppError";

const getAllDoctors = async () => {
    const result = await prisma.doctorInfo.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
}

const getDoctorByEmail = async (email: string) => {

    const result = await prisma.doctorInfo.findUnique({
        where: { email: email },
        include: {
            isSafes: true,
        }
    });
    return result;
}

const updateDoctor = async (email: string, payload: any) => {

    const doctor = await prisma.doctorInfo.findUnique({
        where: { email },
    });
    if (!doctor) {
        throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found");
    }
    const result = await prisma.doctorInfo.update({
        where: { id: doctor.id },
        data: payload,
    });
    return result;
}

const deleteDoctor = async (id: number) => {
    const result = await prisma.doctorInfo.delete({
        where: { id },
    });
    return result;
}

const addSafe = async (id: number, payload: any) => {

    const doctor = await prisma.doctorInfo.findUnique({
        where: { id: payload.doctorId },
    });

    if (!doctor) {
        throw new AppError(StatusCodes.NOT_FOUND, "Doctor not found");
    }

    const safe = await prisma.isSafe.upsert({
        where: { id: Number(id) || undefined },
        update: { ...payload.isSafe && { isSafe: payload.isSafe }, ...payload.limit && { limit: payload.limit } },
        create: { ...payload.isSafe && { isSafe: payload.isSafe }, ...payload.limit && { limit: payload.limit }, doctorId: doctor.id },
    });
    return safe;
}

export const DoctorInfoService = {
    getAllDoctors,
    getDoctorByEmail,
    updateDoctor,
    deleteDoctor,
    addSafe,
}
