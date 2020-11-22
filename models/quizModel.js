const mongoose = require("mongoose");

/**
 * Creating the User Model
 */

const QuizModel = mongoose.model(
  "QuizModel",
  new mongoose.Schema({
    email_id: { type: String },
    quiz: {
        type: Array,
        quizName: {
            type: String,
            required: true
        },
        quizId: {
            type: String,
            
        },
        highest_score: {
            type: Number
        },
        last_updated: {
            type: String
        }
     }
  })
);

exports.QuizModel = QuizModel;
