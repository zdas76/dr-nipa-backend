
export type IConnectorInfo = {
    id?: number,
    name: string,
    email?: string | null,
    contactNumber: string,
    diagnosticName?: string | null,
    newPatientAmount: number,
    oldPatientAmount: number,
}

export type IUpdateConnectorInfo = {
    name?: string,
    email?: string | null,
    contactNumber?: string,
    diagnosticName?: string | null,
    newPatientAmount?: number,
    oldPatientAmount?: number,
}