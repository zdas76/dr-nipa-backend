import { generatePatientId } from "../../utiles/generatePatientId";
import { prisma } from "../../utiles/prisma";
import { IPatientInfo } from "./patient.Interface";


const createPatient = async (body: IPatientInfo) => {

    const patientId = await generatePatientId()

    const result = await prisma.patientInfo.create({
        data: {
            ...body,
            patientId
        },
    });
    return result;
}

const getAllPatient = async () => {

    const result = await prisma.patientInfo.findMany({
        where: {
            isDeleted: false,
        },

        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
}

const getAllPatientBySearch = async (searchTerm: string) => {

    const result = await prisma.patientInfo.findMany({
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
}


const getPatientById = async (patientId: number): Promise<IPatientInfo | null> => {

    const result = await prisma.patientInfo.findUnique({
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
}


const updatePatient = async (id: number, body: IPatientInfo): Promise<IPatientInfo> => {
    const result = await prisma.patientInfo.update({
        where: { id },
        data: body,
    });
    return result;
}


const deletePatient = async (id: number): Promise<IPatientInfo> => {
    const result = await prisma.patientInfo.delete({
        where: { id },
    });
    return result;
}


export const PatientInfoService = {
    createPatient,
    getAllPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    getAllPatientBySearch
}