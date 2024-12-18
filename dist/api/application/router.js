"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const middleware_1 = __importDefault(require("../../utils/middleware"));
const router = (0, express_1.default)();
router.get("/application", middleware_1.default, controller_1.getAllData);
router.post("/application", middleware_1.default, controller_1.createData);
router.put("/application/:id", middleware_1.default, controller_1.updateData);
exports.default = router;
