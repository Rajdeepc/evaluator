const express = require("express");
const router = express.Router();
const { QuizModel } = require("../models/quizModel");

router.put("/", async (req, res) => {
  let email = req.body.email;

  let quiz = req.body.quiz;

  const query = { email : email};

  const update = { $addToSet: { quiz: quiz }, $set :{profile: req.body.profile} };
  const options = { upsert:  true, new: true}

  QuizModel.findOneAndUpdate(
    query, update, options,
    (err, data) => {
      if (err) {
        res.status(400).json({ success: false, error:err });
      } else {
        res.status(200).json({success: true , updatedItems: data})
      }
    }
  );
});

module.exports = router;
