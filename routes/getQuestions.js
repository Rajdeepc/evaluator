const express = require("express");
const router = express.Router();
const { UploadContent } = require("../models/content");

router.post("/", async (req, res) => {
  const allQuestions = await UploadContent.find({
    topic_name: req.body.topic_name,
    category_name: req.body.category_name,
    uploadStatus: 'Approved',
  })
  console.log(allQuestions);

  if (allQuestions && allQuestions.length > 0) {
    res.status(200).json({ success: true, allQuestions });
  } else {
    res.status(200).json({ success: false, allQuestions: [] });
  }
});

module.exports = router;
