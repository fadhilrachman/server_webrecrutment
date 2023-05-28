import express from "express";
import db from "./database";
import userRouter from "./api/user/router";
import JobRouter from "./api/job/router";
import ApplicationRouter from "./api/application/router";
const app = express();

app.use(express.json());

db.on("open", () => {
  app.listen(4000, () => {
    console.log("database berhasil tersambung");
    app.use(userRouter);
    app.use(JobRouter);
    app.use(ApplicationRouter);
  });
});

db.on("error", () => {
  console.log("database tidak tersambung");
});
