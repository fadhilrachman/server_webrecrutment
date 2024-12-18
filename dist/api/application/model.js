"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    job: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Job",
    },
    status: {
        type: String,
        enum: [
            "in review",
            "enter the shortlist",
            "interview",
            "test",
            "recruited",
            "unsuccessful",
        ],
    },
    notes: String,
    cover_latter: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Application", applicationSchema);
