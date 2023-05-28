import Job from "./model";
import { Request, Response, NextFunction } from "express";
import JobInterface from "../../utils/interfaces/job";

const getDataJob = async (req: Request, res: Response, next: NextFunction) => {
  const { page, search = "" } = req.query;
  try {
    const data = await Job.find({ job_name: { $regex: search, $options: "i" } })
      .limit(6)
      .skip((Number(page) - 1) * 6);
    const count = await Job.count({
      job_name: { $regex: search, $options: "i" },
    });
    const total_page = Math.ceil(count / 6);
    res.status(200).json({ message: "succes get data", total_page, data });
  } catch (error) {
    next(error);
  }
};

const getDetailJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await Job.findById(id);
    res.status(200).json({ message: "succes get data", data });
  } catch (error) {
    next(error);
  }
};
const createDataJob = async (
  req: Request<{}, {}, JobInterface>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await Job.create(req.body);
    res.status(201).json({ message: "succes create data", result });
  } catch (error) {
    next(error);
  }
};

export { getDataJob, createDataJob, getDetailJob };
