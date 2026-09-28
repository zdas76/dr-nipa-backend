"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorInfoService = void 0;
const prisma_1 = require("../../utiles/prisma");
const createConnect = async (connectData) => {
    const result = await prisma_1.prisma.connectorInfo.create({
        data: connectData,
    });
    return result;
};
const getAllConnect = async () => {
    const result = await prisma_1.prisma.connectorInfo.findMany();
    return result;
};
const getConnectById = async (id) => {
    const result = await prisma_1.prisma.connectorInfo.findUnique({
        where: { id },
    });
    return result;
};
const updateConnect = async (id, connectData) => {
    const isExist = await prisma_1.prisma.connectorInfo.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new Error("Connector not found");
    }
    const result = await prisma_1.prisma.connectorInfo.update({
        where: { id },
        data: connectData,
    });
    return result;
};
const deleteConnect = async (id) => {
    const isExist = await prisma_1.prisma.connectorInfo.findUnique({
        where: { id },
    });
    if (!isExist) {
        throw new Error("Connector not found");
    }
    const result = await prisma_1.prisma.connectorInfo.delete({
        where: { id },
    });
    return result;
};
exports.ConnectorInfoService = {
    createConnect,
    getAllConnect,
    getConnectById,
    updateConnect,
    deleteConnect,
};
