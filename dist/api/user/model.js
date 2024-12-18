"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "panjang minimal 6 karakter"],
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    about: String,
    work_experience: [
        {
            company_name: String,
            position: String,
            start_date: Date,
            end_date: Date,
            additional_information: String,
        },
    ],
    education: [
        {
            school_name: String,
            major: String,
            start_date: Date,
            end_date: Date,
            additional_information: String,
        },
    ],
    token: String,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", userSchema);
