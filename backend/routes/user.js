const express = require("express");
const { requireSignin } = require("../controllers/auth");
const {
  userById,
  allStudents,
  allCompanies,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/user");

const router = express.Router();

router.get("/students", allStudents);
router.get("/companies", allCompanies);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);

router.param("userId", userById);
module.exports = router;
