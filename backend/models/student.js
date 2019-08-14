const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  interest: {
    type: [],
    required: true
  },
  paid: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "student"
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  photo: {
    data: Buffer,
    contentType: String
  }
});

studentSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });
// methods
studentSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};
module.exports = mongoose.model("Student", studentSchema);
