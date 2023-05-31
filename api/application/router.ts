import express from "express";
import { getAllData, createData, updateData } from "./controller";
import verifyToken from "../../utils/middleware";
const router = express();

router.get("/application", verifyToken, getAllData);
router.post("/application", verifyToken, createData);
router.put("/application/:id", verifyToken, updateData);

export default router;
