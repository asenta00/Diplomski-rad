const Student = require("../models/student");
const Company = require("../models/company");
const Admin = require("../models/admin");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

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
  let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
  let adminUser = req.profile && req.auth && req.auth.role == "admin";
  const authorized = sameUser || adminUser;
  // const authorized =
  //   req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action!"
    });
  }
  next();
};

exports.allStudents = (req, res) => {
  Student.find((err, students) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(students);
  }).select(
    "firstName lastName email birthdate fieldOfStudy degree interest paid role updated created"
  );
};
exports.allCompanies = (req, res) => {
  Company.find((err, companies) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(companies);
  }).select("name email body contact role updated created ");
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    // save user
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    });
  });
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }
  next();
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
