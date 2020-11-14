const express = require("express");
const router = express.Router();
const { UploadContent } = require("../models/content");

router.put("/", async (req, res) => {
  let id = req.body.id;
  let newUploadStatus = req.body.status;
  let newUpdatedQuestion = req.body.question;
  let newUpdatedAnswer = req.body.answer;
  UploadContent.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        uploadStatus: newUploadStatus,
        question:newUpdatedQuestion,
        answer: newUpdatedAnswer
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ success: false, error:err });
      } else {
        UploadContent.find({ uploadStatus: "InReview" }, (err, items) => {
          res.status(200).json({success: true, reviewItems:items });
        });
      }
    }
  );
});

module.exports = router;
