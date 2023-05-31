import User from "./model";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Register {
  username: string;
  is_admin?: string;
  email: string;
  password: string;
  confirm_password: string;
}

const createData = async (
  req: Request<{}, {}, Register>,
  res: Response,
  next: NextFunction
) => {
  const { username, is_admin, password, confirm_password, email } = req.body;

  try {
    if (password !== confirm_password)
      return res.status(400).json({ message: "password error" });

    const checkEmail = await User.findOne({ email });
    if (checkEmail)
      return res.status(400).json({ message: "email already registered" });
    const salt = bcrypt.genSaltSync(10);
    const bcryptPassword = bcrypt.hashSync(password, salt);
    await User.create({
      username,
      is_admin,
      email,
      password: bcryptPassword,
    });
    res.status(201).json({ message: "succes register" });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser)
      return res.status(404).json({ message: "email not registered" });

    bcrypt.compare(password, checkUser?.password, async (err, isMatch) => {
      console.log({ isMatch });
      console.log({ err });

      if (isMatch) {
        const token = await jwt.sign(
          { email, password },
          "aaofnasfasd.1ef.24tredr4t2redc42te",
          { expiresIn: "1d" }
        );
        await User.findOneAndUpdate({ email }, { token }, { new: true });

        res.json({ message: "login success", token });
      } else {
        res.status(400).json({ message: "Incorrect password or e-mail" });
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "succes update data", data });
  } catch (error) {
    next(error);
  }
};

const createWorkExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      user?.work_experience.push(req.body);
      const result = await user.save();
      return res.status(200).json({ message: "succes create data", result });
    }
  } catch (error) {
    next(error);
  }
};

const deleteWorkExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { idWork } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      user.work_experience = user.work_experience.filter(
        (item: any) => item?._id.toString() !== idWork
      );
      const result = await user.save();
      return res.status(200).json({ message: "succes delete data", result });
    }
  } catch (error) {
    next(error);
  }
};

const createEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      user.education.push(req.body);
      const result = await user.save();
      return res.status(200).json({ message: "succes create data", result });
    }
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { idEducation } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      user.education = user.education.filter(
        (item: any) => item?._id.toString() !== idEducation
      );
      const result = await user.save();
      return res.status(200).json({ message: "succes delete data", result });
    }
  } catch (error) {
    next(error);
  }
};

const getDataProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  try {
    jwt.verify(
      token,
      "aaofnasfasd.1ef.24tredr4t2redc42te",
      async (err, decode) => {
        if (err) return res.sendStatus(403);
        const checkUser = await User.findOne({ email: decode.email }).select(
          "username email about is_admin work_experience education token"
        );
        if (!checkUser || token !== checkUser?.token)
          return res.sendStatus(403);
        res.status(200).json({ message: "succes get data", data: checkUser });
      }
    );
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(
      token,
      "aaofnasfasd.1ef.24tredr4t2redc42te",
      async (err, decode) => {
        if (err) return res.sendStatus(403);

        const user = await User.findOneAndUpdate(
          { email: decode.email },
          { token: null },
          { new: true }
        );
        res.status(200).json({ message: "succes logout", user });
      }
    );
  } catch (error) {
    next(error);
  }
};

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
