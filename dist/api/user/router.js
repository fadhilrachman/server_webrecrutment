"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../../utils/middleware"));
const router = (0, express_1.default)();
const { createData, login, logout, updateUser, getDataProfile, createWorkExperience, createEducation, deleteWorkExperience, deleteEducation, } = require("./controller");
router.get("/profile", middleware_1.default, getDataProfile);
router.post("/register", createData);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile/:id", middleware_1.default, updateUser);
router.put("/work/:id", middleware_1.default, createWorkExperience);
router.put("/work/delete/:id", middleware_1.default, deleteWorkExperience);
router.put("/education/:id", middleware_1.default, createEducation);
router.put("/education/delete/:id", middleware_1.default, deleteEducation);
exports.default = router;
