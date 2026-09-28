import { AppointmentStatus, PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../utiles/prisma";


const getAppointmentDailyReportByDate = async (date: string) => {

    const isSafestatus = await prisma.isSafe.findFirst();

    const [
        newMale,
        newFemale,
        oldMale,
        oldFemale,
    ] = await Promise.all([

        prisma.appointment.aggregate({
            where: {
                patientType: "NEW",
                patientInfo: {
                    sex: "MALE",
                },
                visitingDate: new Date(date),
                status: AppointmentStatus.VISITED,
                paymentStatus: PaymentStatus.PAID
            },
            ...(isSafestatus?.isSafe === true &&
                isSafestatus?.limit != null && {
                take: isSafestatus.limit,
            }),
            _count: {
                id: true,
                connectorId: true,
            },
            _sum: {
                visitingFee: true,
                discount: true,
                connectorFee: true,
            },
        }),

        prisma.appointment.aggregate({
            where: {
                patientType: "NEW",
                patientInfo: {
                    sex: "FEMALE",
                },
                visitingDate: new Date(date),
                status: AppointmentStatus.VISITED,
                paymentStatus: PaymentStatus.PAID
            },
            ...(isSafestatus?.isSafe === true &&
                isSafestatus?.limit != null && {
                take: isSafestatus.limit,
            }),
            _count: {
                id: true,
                connectorId: true,
            },
            _sum: {
                visitingFee: true,
                discount: true,
                connectorFee: true,
            },
        }),

        prisma.appointment.aggregate({
            where: {
                patientType: "OLD",
                patientInfo: {
                    sex: "MALE",
                },
                visitingDate: new Date(date),
                status: AppointmentStatus.VISITED,
                paymentStatus: PaymentStatus.PAID
            },
            ...(isSafestatus?.isSafe === true &&
                isSafestatus?.limit != null && {
                take: isSafestatus.limit,
            }),
            _count: {
                id: true,
                connectorId: true,
            },
            _sum: {
                visitingFee: true,
                discount: true,
                connectorFee: true,
            },
        }),

        prisma.appointment.aggregate({
            where: {
                patientType: "OLD",
                patientInfo: {
                    sex: "FEMALE",
                },
                visitingDate: new Date(date),
                status: AppointmentStatus.VISITED,
                paymentStatus: PaymentStatus.PAID
            },
            ...(isSafestatus?.isSafe === true &&
                isSafestatus?.limit != null && {
                take: isSafestatus.limit,
            }),
            _count: {
                id: true,
                connectorId: true,
            },
            _sum: {
                visitingFee: true,
                discount: true,
                connectorFee: true,
            },
        }),
    ]);

    const result = {
        NewPatientMale: {
            TotalConnector: newMale._count.connectorId,
            TotalPatient: newMale._count.id,
            TotalDiscount: newMale._sum.discount || 0,
            TotalVisitingAmount: newMale._sum.visitingFee || 0,
            TotalConnectorAmount: newMale._sum.connectorFee || 0,
        },

        NewPatientFemale: {
            TotalConnector: newFemale._count.connectorId,
            TotalPatient: newFemale._count.id,
            TotalDiscount: newFemale._sum.discount || 0,
            TotalVisitingAmount: newFemale._sum.visitingFee || 0,
            TotalConnectorAmount: newFemale._sum.connectorFee || 0,
        },

        OldPatientMale: {
            TotalConnector: oldMale._count.connectorId,
            TotalPatient: oldMale._count.id,
            TotalDiscount: oldMale._sum.discount || 0,
            TotalVisitingAmount: oldMale._sum.visitingFee || 0,
            TotalConnectorAmount: oldMale._sum.connectorFee || 0,
        },

        OldPatientFemale: {
            TotalConnector: oldFemale._count.connectorId,
            TotalPatient: oldFemale._count.id,
            TotalDiscount: oldFemale._sum.discount || 0,
            TotalVisitingAmount: oldFemale._sum.visitingFee || 0,
            TotalConnectorAmount: oldFemale._sum.connectorFee || 0,
        },
    };

    return result;
};

export const ReportService = {
    getAppointmentDailyReportByDate
};
