import express from "express";
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

router.get("/profile", getDataProfile);
router.post("/register", createData);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile/:id", updateUser);
router.put("/work/:id", createWorkExperience);
router.put("/work/delete/:id", deleteWorkExperience);
router.put("/education/:id", createEducation);
router.put("/education/delete/:id", deleteEducation);

export default router;
