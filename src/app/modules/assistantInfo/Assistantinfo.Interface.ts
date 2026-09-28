import { Sex, Status, UserRole } from "../../../generated/prisma/enums";


export type User = {
    userName: string,
    email: string,
    password: string,
    role: UserRole,
    status: Status,
}

export type IAssistantInfo = {
    id?: number,
    name: string,
    fatherName: string,
    motherName: string,
    dateOfBirth: Date,
    sex: Sex,
    contactNumber: string,
    email: string,
    userName: string,
    password: string,
    role: UserRole,
    status: Status,
}