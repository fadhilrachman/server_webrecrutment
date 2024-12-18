import express, { Request, Response } from "express";
import db from "./database";
import userRouter from "./api/user/router";
import JobRouter from "./api/job/router";
import ApplicationRouter from "./api/application/router";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
  console.log("HOST CONNECTED");
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Vercel Express Server!");
});
app.use(userRouter);
app.use(JobRouter);
app.use(ApplicationRouter);
db.on("open", () => {
  console.log("database berhasil tersambung");
});

db.on("error", () => {
  console.log("database tidak tersambung");
});
