const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  updated: Date,
  capacity: {
    type: Number,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  // photo: {
  //   data: Buffer,
  //   contentType: String
  // },
  postedBy: {
    type: ObjectId,
    ref: "Company"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
