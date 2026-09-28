import { User, Status, UserRole } from "../../../generated/prisma/client";
import { prisma } from "../../utiles/prisma";
import bcrypt from "bcrypt";

const createUser = async (userData: any) => {

    const hashedPassword = await bcrypt.hash(userData.password, Number(process.env.HASHPSSWORD_ROUND) || 10);

    const isExist = await prisma.user.findUnique({
        where: { userName: userData.userName },
    });

    if (isExist) {
        throw new Error("User already exists with this username");
    }

    const isEmailExist = await prisma.user.findUnique({
        where: { email: userData.email },
    });

    if (isEmailExist) {
        throw new Error("User already exists with this email");
    }

    if (userData.role === "ASSISTANT") {

        const result = await prisma.user.create({
            data: {
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                status: userData.status || Status.ACTIVE,
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
        const result = await prisma.user.create({
            data: {
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                status: userData.status || Status.ACTIVE,
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
        const result = await prisma.user.create({
            data: {
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                status: userData.status || Status.ACTIVE,
            },
        });
        return result;
    }

};

const deleteUser = async (id: number) => {
    const result = await prisma.user.update({
        where: { id },
        data: {
            status: Status.DELETED
        }
    });
    return result;
};

export const UserService = {
    createUser,
    deleteUser,
};
