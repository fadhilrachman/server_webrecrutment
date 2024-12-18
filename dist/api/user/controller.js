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
const model_1 = __importDefault(require("./model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, is_admin, password, confirm_password, email } = req.body;
    try {
        if (password !== confirm_password)
            return res.status(400).json({ message: "password error" });
        const checkEmail = yield model_1.default.findOne({ email });
        if (checkEmail)
            return res.status(400).json({ message: "email already registered" });
        const salt = bcrypt_1.default.genSaltSync(10);
        const bcryptPassword = bcrypt_1.default.hashSync(password, salt);
        yield model_1.default.create({
            username,
            is_admin: false,
            email,
            password: bcryptPassword,
        });
        res.status(201).json({ message: "succes register" });
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const checkUser = yield model_1.default.findOne({ email });
        if (!checkUser)
            return res.status(404).json({ message: "email not registered" });
        bcrypt_1.default.compare(password, checkUser === null || checkUser === void 0 ? void 0 : checkUser.password, (err, isMatch) => __awaiter(void 0, void 0, void 0, function* () {
            console.log({ isMatch });
            console.log({ err });
            if (isMatch) {
                const token = yield jsonwebtoken_1.default.sign({ email, password }, "aaofnasfasd.1ef.24tredr4t2redc42te", { expiresIn: "1d" });
                yield model_1.default.findOneAndUpdate({ email }, { token }, { new: true });
                res.json({ message: "login success", token });
            }
            else {
                res.status(400).json({ message: "Incorrect password or e-mail" });
            }
        }));
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield model_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "succes update data", data });
    }
    catch (error) {
        next(error);
    }
});
const createWorkExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield model_1.default.findById(id);
        if (user) {
            user === null || user === void 0 ? void 0 : user.work_experience.push(req.body);
            const result = yield user.save();
            return res.status(200).json({ message: "succes create data", result });
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteWorkExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { idWork } = req.body;
    try {
        const user = yield model_1.default.findById(id);
        if (user) {
            user.work_experience = user.work_experience.filter((item) => (item === null || item === void 0 ? void 0 : item._id.toString()) !== idWork);
            const result = yield user.save();
            return res.status(200).json({ message: "succes delete data", result });
        }
    }
    catch (error) {
        next(error);
    }
});
const createEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield model_1.default.findById(id);
        if (user) {
            user.education.push(req.body);
            const result = yield user.save();
            return res.status(200).json({ message: "succes create data", result });
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { idEducation } = req.body;
    try {
        const user = yield model_1.default.findById(id);
        if (user) {
            user.education = user.education.filter((item) => (item === null || item === void 0 ? void 0 : item._id.toString()) !== idEducation);
            const result = yield user.save();
            return res.status(200).json({ message: "succes delete data", result });
        }
    }
    catch (error) {
        next(error);
    }
});
const getDataProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token)
        return res.sendStatus(401);
    try {
        jsonwebtoken_1.default.verify(token, "aaofnasfasd.1ef.24tredr4t2redc42te", (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            const checkUser = yield model_1.default.findOne({ email: decode.email }).select("username email about is_admin work_experience education token");
            if (!checkUser || token !== (checkUser === null || checkUser === void 0 ? void 0 : checkUser.token))
                return res.sendStatus(403);
            res.status(200).json({ message: "succes get data", data: checkUser });
        }));
    }
    catch (error) {
        next(error);
    }
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token)
        return res.sendStatus(401);
    try {
        jsonwebtoken_1.default.verify(token, "aaofnasfasd.1ef.24tredr4t2redc42te", (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            const user = yield model_1.default.findOneAndUpdate({ email: decode.email }, { token: null }, { new: true });
            res.status(200).json({ message: "succes logout", user });
        }));
    }
    catch (error) {
        next(error);
    }
});
module.exports = {
    createData,
    login,
    logout,
    updateUser,
    getDataProfile,
    createWorkExperience,
    createEducation,
    deleteWorkExperience,
    deleteEducation,
};
