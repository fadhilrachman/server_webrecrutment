import express from "express";
const router = express();
const { createData, login, logout, updateUser } = require("./controller");

router.post("/register", createData);
router.put("/profile/:id", updateUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;
