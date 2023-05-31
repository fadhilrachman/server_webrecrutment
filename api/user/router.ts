import express from "express";
import verifyToken from "../../utils/middleware";
const router = express();
const {
  createData,
  login,
  logout,
  updateUser,
  getDataProfile,
  createWorkExperience,
  createEducation,
  deleteWorkExperience,
  deleteEducation,
} = require("./controller");

router.get("/profile", verifyToken, getDataProfile);
router.post("/register", createData);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile/:id", verifyToken, updateUser);
router.put("/work/:id", verifyToken, createWorkExperience);
router.put("/work/delete/:id", verifyToken, deleteWorkExperience);
router.put("/education/:id", verifyToken, createEducation);
router.put("/education/delete/:id", verifyToken, deleteEducation);

export default router;
