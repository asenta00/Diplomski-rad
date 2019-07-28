const Student = require("../models/student");
const Company = require("../models/company");
const Admin = require("../models/admin");
const _ = require("lodash");

exports.userById = async (req, res, next, id) => {
  const studentExist = await Student.findById(id);
  const companyExist = await Company.findById(id);
  const adminExist = await Admin.findById(id);
  if (companyExist) req.profile = companyExist;
  else if (studentExist) req.profile = studentExist;
  else if (adminExist) req.profile = adminExist;
  next();
};

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action!"
    });
  }
};

exports.allStudents = (req, res) => {
  Student.find((err, students) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ students });
  }).select(
    "firstName lastName email birthdate fieldOfStudy degree interes paid role updated created"
  );
};
exports.allCompanies = (req, res) => {
  Company.find((err, companies) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ companies });
  }).select("name email body contact role updated created ");
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body); // extend- mutate the source object
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: "You are not authorized to perform this action."
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({ user });
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ message: "User deleted successfully!" });
  });
};
