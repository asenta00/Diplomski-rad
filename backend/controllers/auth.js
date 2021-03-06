const Student = require("../models/student");
const Company = require("../models/company");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();
let userExists;
let user;

exports.signup = async (req, res) => {
  if (req.body.role == "student" || req.body.role == "company") {
    userExists =
      (await Company.findOne({ email: req.body.email })) ||
      (await Student.findOne({ email: req.body.email }));
  } else {
    userExists = false;
  }
  if (userExists)
    return res.status(403).json({
      error: "Email već postoji u bazi registriranih korisnika!"
    });
  if (req.body.role == "student") {
    user = await new Student(req.body);
  } else if (req.body.role == "company") {
    user = await new Company(req.body);
  } else if (req.body.role == "admin") {
    user = await new Admin(req.body);
  }
  await user.save();
  res.status(200).json({ message: "Signup success! Please login." });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const studentExist = await Student.findOne({ email });
  const companyExist = await Company.findOne({ email });
  const adminExist = await Admin.findOne({ email });
  if (studentExist) {
    if (!studentExist.authenticate(password)) {
      return res.status(401).json({
        error: "Unesena je neispravna lozinka za navedenu email adresu."
      });
    }
    const token = jwt.sign({ _id: studentExist._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, firstName, lastName, email, role } = studentExist;
    return res.json({ token, user: { _id, email, firstName, lastName, role } });
  } else if (companyExist) {
    if (!companyExist.authenticate(password)) {
      return res.status(401).json({
        error: "Unesena je neispravna lozinka za navedenu email adresu."
      });
    }
    const token = jwt.sign({ _id: companyExist._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = companyExist;
    return res.json({ token, user: { _id, email, name, role } });
  } else if (adminExist) {
    if (!adminExist.authenticate(password)) {
      return res.status(401).json({
        error: "Unesena je neispravna lozinka za navedenu email adresu."
      });
    }
    const token = jwt.sign({ _id: adminExist._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = adminExist;
    return res.json({ token, user: { _id, email, name, role } });
  } else {
    return res.status(401).json({
      error:
        "Navedenog korisnika nema u bazi. Molimo Vas da provjerite jeste li ispravno unijeli podatke ili kreirajte novi korisnički račun (student/tvrtka)."
    });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success!" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
