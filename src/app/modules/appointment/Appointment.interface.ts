import { AppointmentStatus, PatientType, PaymentStatus, Sex } from "../../../generated/prisma/enums";

export type IAppointment = {
    id?: number,
    patientId: number | null,
    name?: string,
    age?: string,
    sex?: Sex,
    contactNumber: string,
    address?: string,
    visitingDate: Date,
    patientType: PatientType,
    visitingTime?: string,
    connectorId?: number,
    visitingFee?: number,
    discount?: number,
    weight?: number,
    booldPusher?: string,
    bloodGroup?: string,
    status?: AppointmentStatus,
    paymentStatus?: PaymentStatus,
}
