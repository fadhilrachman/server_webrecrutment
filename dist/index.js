"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const router_1 = __importDefault(require("./api/user/router"));
const router_2 = __importDefault(require("./api/job/router"));
const router_3 = __importDefault(require("./api/application/router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello from Vercel Express Server!");
});
database_1.default.on("open", () => {
    app.listen(4000, () => {
        console.log("database berhasil tersambung");
        app.use(router_1.default);
        app.use(router_2.default);
        app.use(router_3.default);
    });
});
database_1.default.on("error", () => {
    console.log("database tidak tersambung");
});
