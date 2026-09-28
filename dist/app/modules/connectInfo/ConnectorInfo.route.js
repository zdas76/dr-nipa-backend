"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorInfoRoute = void 0;
const express_1 = __importDefault(require("express"));
const ConnectorInfo_controller_1 = require("./ConnectorInfo.controller");
const router = express_1.default.Router();
router.post("/", ConnectorInfo_controller_1.ConnectorInfoController.createConnect);
router.get("/", ConnectorInfo_controller_1.ConnectorInfoController.getAllConnect);
router.get("/:id", ConnectorInfo_controller_1.ConnectorInfoController.getConnectById);
router.patch("/:id", ConnectorInfo_controller_1.ConnectorInfoController.updateConnect);
router.delete("/:id", ConnectorInfo_controller_1.ConnectorInfoController.deleteConnect);
exports.ConnectorInfoRoute = router;
