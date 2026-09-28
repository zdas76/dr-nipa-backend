"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantInfoRoute = void 0;
const express_1 = __importDefault(require("express"));
const AssitantInfo_controller_1 = require("./AssitantInfo.controller");
const router = express_1.default.Router();
router.post("/", AssitantInfo_controller_1.AssistantInfoController.createAssistant);
router.get("/", AssitantInfo_controller_1.AssistantInfoController.getAllAssistant);
router.get("/:id", AssitantInfo_controller_1.AssistantInfoController.getAssistantById);
router.patch("/:id", AssitantInfo_controller_1.AssistantInfoController.updateAssistant);
router.delete("/:id", AssitantInfo_controller_1.AssistantInfoController.deleteAssistant);
exports.AssistantInfoRoute = router;
