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
exports.updateData = exports.createData = exports.getAllData = void 0;
const model_1 = __importDefault(require("./model"));
const getAllData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.query;
    try {
        const data = yield model_1.default.find(user ? { user } : {})
            .populate({
            path: "user",
            select: "username email about work_experience education",
        })
            .populate("job");
        res.status(200).json({ message: "succes get data", data });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllData = getAllData;
const createData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model_1.default.create(req.body);
        res.status(201).json({ message: "succes create data", data });
    }
    catch (error) {
        next(error);
    }
});
exports.createData = createData;
const updateData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(201).json({ message: "succes create data", data });
    }
    catch (error) {
        next(error);
    }
});
exports.updateData = updateData;
