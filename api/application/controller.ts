import Application from "./model";
import { Request, Response, NextFunction } from "express";
import ApplicationInterface from "../../utils/interfaces/Application";

const getAllData = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.query;
  try {
    const data = await Application.find(user ? { user } : {})
      .populate({
        path: "user",
        select: "username email about work_experience education",
      })
      .populate("job");
    res.status(200).json({ message: "succes get data", data });
  } catch (error) {
    next(error);
  }
};

const createData = async (
  req: Request<{}, {}, ApplicationInterface>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Application.create(req.body);
    res.status(201).json({ message: "succes create data", data });
  } catch (error) {
    next(error);
  }
};

const updateData = async (
  req: Request<{ id: string }, {}, ApplicationInterface>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await Application.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "succes create data", data });
  } catch (error) {
    next(error);
  }
};
export { getAllData, createData, updateData };
