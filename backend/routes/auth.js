const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  studentSignupValidator,
  companySignupValidator
} = require("../validation");
const router = express.Router();

router.post("/signup/student", studentSignupValidator, signup);
router.post("/signup/company", companySignupValidator, signup);
router.post("/signup/admin", signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.param("userId", userById);
module.exports = router;
