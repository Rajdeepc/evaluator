const express = require("express");
const router = express.Router();
const { UploadContent } = require("../models/content");

router.get("/", async (req, res) => {
  const allApprovedQuestions = await UploadContent.find({
    uploadStatus: 'Approved'
  })

  if (allApprovedQuestions && allApprovedQuestions.length > 0) {
    res.status(200).json({ success: true, allApprovedQuestions });
  } else {
    res.status(200).json({ success: false, allApprovedQuestions: [] });
  }
});

module.exports = router;
