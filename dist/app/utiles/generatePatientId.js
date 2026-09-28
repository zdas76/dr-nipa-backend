"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePatientId = void 0;
const prisma_1 = require("./prisma");
const generatePatientId = async () => {
    const lastPatient = await prisma_1.prisma.patientInfo.findFirst({
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
};
exports.generatePatientId = generatePatientId;
