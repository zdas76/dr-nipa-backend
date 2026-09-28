import { Sex } from "../../../generated/prisma/enums";

export type IPatientInfo = {
    id?: number;
    name: string;
    age: string;
    sex: Sex;
    contactNumber: string;
    address: string;
    patientId?: number | null;
}