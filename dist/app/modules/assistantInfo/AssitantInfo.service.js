"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantInfoService = void 0;
const client_1 = require("../../../generated/prisma/client");
const prisma_1 = require("../../utiles/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAssistant = async (assistantData) => {
    const hashedPassword = await bcrypt_1.default.hash(assistantData.password, Number(process.env.HASHPSSWORD_ROUND));
    const isExist = await prisma_1.prisma.user.findUnique({
        where: { userName: assistantData.userName },
    });
    if (isExist) {
        throw new Error("User already exists");
    }
    const isEmailExist = await prisma_1.prisma.assistantInfo.findUnique({
        where: { email: assistantData.email },
    });
    if (isEmailExist) {
        throw new Error("Email already exists");
    }
    const result = await prisma_1.prisma.assistantInfo.create({
        data: {
            name: assistantData.name,
            fatherName: assistantData.fatherName,
            motherName: assistantData.motherName,
            dateOfBirth: new Date(assistantData.dateOfBirth),
            sex: assistantData.sex,
            contactNumber: assistantData.contactNumber,
            users: {
                create: {
                    userName: assistantData.userName,
                    email: assistantData.email,
                    password: hashedPassword,
                    role: assistantData.role,
                },
            }
        },
    });
    return result;
};
const getAllAssistant = async () => {
    const result = await prisma_1.prisma.assistantInfo.findMany();
    return result;
};
const getAssistantById = async (id) => {
    const result = await prisma_1.prisma.assistantInfo.findUnique({
        where: { id },
        include: {
            users: {
                select: {
                    id: true,
                    email: true,
                    userName: true,
                    role: true,
                    status: true,
                }
            },
        }
    });
    return result;
};
const updateAssistant = async (id, assistantData) => {
    const updateData = {};
    if (assistantData.name) {
        updateData.name = assistantData.name;
    }
    if (assistantData.fatherName) {
        updateData.fatherName = assistantData.fatherName;
    }
    if (assistantData.motherName) {
        updateData.motherName = assistantData.motherName;
    }
    if (assistantData.dateOfBirth) {
        updateData.dateOfBirth = new Date(assistantData.dateOfBirth);
    }
    if (assistantData.sex) {
        updateData.sex = assistantData.sex;
    }
    if (assistantData.contactNumber) {
        updateData.contactNumber = assistantData.contactNumber;
    }
    const result = await prisma_1.prisma.assistantInfo.update({
        where: { id },
        data: updateData,
    });
    return result;
};
const deleteAssistant = async (id) => {
    const isExist = await prisma_1.prisma.assistantInfo.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new Error("Assistant not found");
    }
    const deleteUser = await prisma_1.prisma.user.update({
        where: { email: isExist.email },
        data: {
            status: client_1.Status.DELETED
        }
    });
    return deleteUser;
};
exports.AssistantInfoService = {
    createAssistant,
    getAllAssistant,
    getAssistantById,
    updateAssistant,
    deleteAssistant,
};
