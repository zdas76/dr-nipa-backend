"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_route_1 = require("../modules/auth/Auth.route");
const PatientInfo_route_1 = require("../modules/patientInfo/PatientInfo.route");
const AssitantInfo_route_1 = require("../modules/assistantInfo/AssitantInfo.route");
const ConnectorInfo_route_1 = require("../modules/connectInfo/ConnectorInfo.route");
const Appointment_route_1 = require("../modules/appointment/Appointment.route");
const User_route_1 = require("../modules/user/User.route");
const DoctorInfo_route_1 = require("../modules/doctorInfo/DoctorInfo.route");
const Report_route_1 = require("../modules/report/Report.route");
const sms_route_1 = require("../modules/sms/sms.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: Auth_route_1.AuthRoutes,
    },
    {
        path: "/patient",
        route: PatientInfo_route_1.PatientInfoRoute,
    },
    {
        path: "/assistant",
        route: AssitantInfo_route_1.AssistantInfoRoute,
    },
    {
        path: "/connector",
        route: ConnectorInfo_route_1.ConnectorInfoRoute,
    },
    {
        path: "/appointment",
        route: Appointment_route_1.AppointmentRoute,
    },
    {
        path: "/users",
        route: User_route_1.UserRoute,
    },
    {
        path: "/doctor",
        route: DoctorInfo_route_1.DoctorInfoRoute,
    },
    {
        path: "/report",
        route: Report_route_1.ReportRoute,
    },
    {
        path: "/sms",
        route: sms_route_1.SmsRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
