const express = require('express');
const router = express.Router();
const {UploadContent} = require('../models/content')


router.post('/', async (req,res) => {

    const reviewItems = await UploadContent.find({ uploadStatus : req.body.uploadStatus})
    console.log(reviewItems);

    if(reviewItems && reviewItems.length > 0) {
      res.status(200).json({success: true, reviewItems });
    } else {
      res.status(200).json({ success: false, reviewItems:[] });
    }
   
});

module.exports = router;