const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  body: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  contact: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    type: String,
    default: "company"
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
  updated: Date
});

companySchema
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
companySchema.methods = {
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

module.exports = mongoose.model("Company", companySchema);
