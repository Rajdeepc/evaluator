// const Joi = require("@hapi/joi"); // a validator package
const mongoose = require("mongoose");

/**
 * Creating the User Model
 */

const UploadContent = mongoose.model(
  "UploadContent",
  new mongoose.Schema({
    topic_name: { type: String },
    category_name: { type: String },
    question: { type: String },
    answer: { type: String },
    difficulty: {type: String},
    uploadedby: { type: String },
    updated_date: { type: String },
    likes_count: { type: Number },
    uploadStatus: { type: String },
  })
);

exports.UploadContent = UploadContent;
