"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientInfoService = void 0;
const generatePatientId_1 = require("../../utiles/generatePatientId");
const prisma_1 = require("../../utiles/prisma");
const createPatient = async (body) => {
    const patientId = await (0, generatePatientId_1.generatePatientId)();
    const result = await prisma_1.prisma.patientInfo.create({
        data: {
            ...body,
            patientId
        },
    });
    return result;
};
const getAllPatient = async () => {
    const result = await prisma_1.prisma.patientInfo.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
};
const getAllPatientBySearch = async (searchTerm) => {
    const result = await prisma_1.prisma.patientInfo.findMany({
        where: {
            isDeleted: false,
            ...(searchTerm && {
                OR: [
                    {
                        name: {
                            contains: searchTerm
                        }
                    },
                    {
                        contactNumber: {
                            contains: searchTerm
                        }
                    }
                ]
            })
        },
        select: {
            id: true,
            name: true,
            contactNumber: true,
            patientId: true,
            age: true,
            sex: true,
            address: true
        }
    });
    return result;
};
const getPatientById = async (patientId) => {
    const result = await prisma_1.prisma.patientInfo.findUnique({
        where: { patientId: patientId },
        include: {
            appointments: {
                orderBy: {
                    visitingDate: "desc"
                },
                select: {
                    visitingDate: true,
                    status: true,
                    paymentStatus: true,
                    patientType: true,
                    visitingFee: true,
                    discount: true
                }
            },
        },
    });
    return result;
};
const updatePatient = async (id, body) => {
    const result = await prisma_1.prisma.patientInfo.update({
        where: { id },
        data: body,
    });
    return result;
};
const deletePatient = async (id) => {
    const result = await prisma_1.prisma.patientInfo.delete({
        where: { id },
    });
    return result;
};
exports.PatientInfoService = {
    createPatient,
    getAllPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    getAllPatientBySearch
};
