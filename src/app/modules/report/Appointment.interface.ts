import { AppointmentStatus, PatientType, PaymentStatus } from "../../../generated/prisma/enums";

export type IAppointment = {
    id?: number,
    patientId: number,
    visitingDate?: Date,
    patientType?: PatientType,
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
