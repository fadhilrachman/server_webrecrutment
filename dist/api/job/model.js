"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    job_name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    requirement: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    job_description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Job", jobSchema);
