import express from "express";
import { getAllData, createData, updateData } from "./controller";
const router = express();

router.get("/application", getAllData);
router.post("/application", createData);
router.put("/application/:id", updateData);

export default router;
