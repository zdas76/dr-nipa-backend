import { prisma } from "./prisma";

export const generatePatientId = async () => {
    const lastPatient = await prisma.patientInfo.findFirst({
        orderBy: {
            patientId: "desc",
        },
        select: {
            patientId: true,
        },
    });

    if (lastPatient && lastPatient.patientId) {
        return lastPatient.patientId + 1;
    }

    return 1001; // Starting patient ID
}