import { prisma } from "../../utiles/prisma";
import { IConnectorInfo, IUpdateConnectorInfo } from "./ConnectorInfo.Interface";


const createConnect = async (connectData: IConnectorInfo) => {
    const result = await prisma.connectorInfo.create({
        data: connectData,
    });
    return result;
};

const getAllConnect = async () => {
    const result = await prisma.connectorInfo.findMany();
    return result;
};

const getConnectById = async (id: number) => {
    const result = await prisma.connectorInfo.findUnique({
        where: { id },
    });
    return result;
};

const updateConnect = async (id: number, connectData: IUpdateConnectorInfo) => {
    const isExist = await prisma.connectorInfo.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new Error("Connector not found");
    }

    const result = await prisma.connectorInfo.update({
        where: { id },
        data: connectData,
    });
    return result;
};

const deleteConnect = async (id: number) => {
    const isExist = await prisma.connectorInfo.findUnique({
        where: { id },
    });

    if (!isExist) {
        throw new Error("Connector not found");
    }

    const result = await prisma.connectorInfo.delete({
        where: { id },
    });
    return result;
};

export const ConnectorInfoService = {
    createConnect,
    getAllConnect,
    getConnectById,
    updateConnect,
    deleteConnect,
};