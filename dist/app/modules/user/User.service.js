"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("../../../generated/prisma/client");
const prisma_1 = require("../../utiles/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (userData) => {
    const hashedPassword = await bcrypt_1.default.hash(userData.password, Number(process.env.HASHPSSWORD_ROUND) || 10);
    const isExist = await prisma_1.prisma.user.findUnique({
        where: { userName: userData.userName },
    });
    if (isExist) {
        throw new Error("User already exists with this username");
    }
    const isEmailExist = await prisma_1.prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (isEmailExist) {
        throw new Error("User already exists with this email");
    }
    if (userData.role === "ASSISTANT") {
        const result = await prisma_1.prisma.user.create({
            data: {
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                status: userData.status || client_1.Status.ACTIVE,
                assistant: {
                    create: {
                        name: userData.name,
                        fatherName: userData.fatherName,
                        motherName: userData.motherName,
                        dateOfBirth: new Date(userData.dateOfBirth),
                        sex: userData.sex,
                        contactNumber: userData.contactNumber,
                    },
                }
            },
        });
        return result;
    }
    if (userData.role === "DOCTOR") {
        const result = await prisma_1.prisma.user.create({
            data: {
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                status: userData.status || client_1.Status.ACTIVE,
                doctorInfo: {
                    create: {
                        nameEnglish: userData.nameEnglish || "",
                        nameBangla: userData.nameBangla || "",
                        designation: userData.designation || "",
                        contactNumber: userData.contactNumber || "",
                        newPatientVisitingFee: userData.newPatientVisitingFee || 0,
                        oldPatientVisitingFee: userData.oldPatientVisitingFee || 0,
                    },
                }
            },
        });
        return result;
    }
    if (userData.role === "ADMIN") {
        const result = await prisma_1.prisma.user.create({
            data: {
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                status: userData.status || client_1.Status.ACTIVE,
            },
        });
        return result;
    }
};
const deleteUser = async (id) => {
    const result = await prisma_1.prisma.user.update({
        where: { id },
        data: {
            status: client_1.Status.DELETED
        }
    });
    return result;
};
exports.UserService = {
    createUser,
    deleteUser,
};
