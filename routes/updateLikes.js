const express = require("express");
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const { UploadContent } = require("../models/content");

router.put("/", async (req, res) => {
  
  const id = req.body._id;

  UploadContent.update(
    {
      _id: id
    },
    {
      $inc: {
        likes_count: 1
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ success: false, error: err });
      } else {
        UploadContent.find({ uploadStatus: "Approved" }, (err, items) => {
          res.status(200).json({ success: true, updatedItems: items });
        });
      }
    }
  );
});

module.exports = router;
