const express = require("express");
const router = express.Router();
const { QuizModel } = require("../models/quizModel");

router.put("/", async (req, res) => {
  let email_id = req.body.email;
  let objTobeUpdated = req.body.payload;
  const query = { email_id : email_id};
  const update = { $addToSet: { quiz: objTobeUpdated } };
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
