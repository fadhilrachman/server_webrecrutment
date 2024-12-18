"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailJob = exports.createDataJob = exports.getDataJob = void 0;
const model_1 = __importDefault(require("./model"));
const getDataJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, search = "" } = req.query;
    try {
        const data = yield model_1.default.find({ job_name: { $regex: search, $options: "i" } })
            .limit(6)
            .skip((Number(page) - 1) * 6);
        const count = yield model_1.default.count({
            job_name: { $regex: search, $options: "i" },
        });
        const total_page = Math.ceil(count / 6);
        res.status(200).json({ message: "succes get data", total_page, data });
    }
    catch (error) {
        next(error);
    }
});
exports.getDataJob = getDataJob;
const getDetailJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield model_1.default.findById(id);
        res.status(200).json({ message: "succes get data", data });
    }
    catch (error) {
        next(error);
    }
});
exports.getDetailJob = getDetailJob;
const createDataJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.create(req.body);
        res.status(201).json({ message: "succes create data", result });
    }
    catch (error) {
        next(error);
    }
});
exports.createDataJob = createDataJob;
