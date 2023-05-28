import express from "express";
const router = express();
const { getDataJob, createDataJob, getDetailJob } = require("./controller");

router.get("/job", getDataJob);
router.get("/job/:id", getDetailJob);
router.post("/job", createDataJob);

export default router;
