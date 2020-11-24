const express = require("express");
const router = express.Router();
const { QuizModel } = require("../models/quizModel");

router.get("/", async (req, res) => {
    const leaderBoardList = await QuizModel.find({});
    if(leaderBoardList && leaderBoardList.length > 0) {
        res.status(200).json({success: true, leaderBoardList });
      } else {
        res.status(400).json({ success: false, leaderBoardList:[] });
      }
});

module.exports = router;
