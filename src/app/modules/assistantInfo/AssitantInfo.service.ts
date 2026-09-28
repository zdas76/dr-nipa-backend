import { AssistantInfo, Status } from "../../../generated/prisma/client";
import { prisma } from "../../utiles/prisma";
import { IAssistantInfo } from "./Assistantinfo.Interface";
import bcrypt from "bcrypt";


const createAssistant = async (assistantData: IAssistantInfo) => {
    const hashedPassword = await bcrypt.hash(assistantData.password, Number(process.env.HASHPSSWORD_ROUND));

    const isExist = await prisma.user.findUnique({
        where: { userName: assistantData.userName },
    });

    if (isExist) {
        throw new Error("User already exists");
    }

    const isEmailExist = await prisma.assistantInfo.findUnique({
        where: { email: assistantData.email },
    });

    if (isEmailExist) {
        throw new Error("Email already exists");
    }

    const result = await prisma.assistantInfo.create({
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
    const result = await prisma.assistantInfo.findMany();
    return result;
};

const getAssistantById = async (id: number) => {
    const result = await prisma.assistantInfo.findUnique({
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

const updateAssistant = async (id: number, assistantData: AssistantInfo) => {

    const updateData = {} as AssistantInfo;

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

    const result = await prisma.assistantInfo.update({
        where: { id },
        data: updateData,
    });
    return result;
};

const deleteAssistant = async (id: number) => {

    const isExist = await prisma.assistantInfo.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new Error("Assistant not found");
    }

    const deleteUser = await prisma.user.update({
        where: { email: isExist.email },
        data: {
            status: Status.DELETED
        }
    });

    return deleteUser;
};

export const AssistantInfoService = {
    createAssistant,
    getAllAssistant,
    getAssistantById,
    updateAssistant,
    deleteAssistant,
};