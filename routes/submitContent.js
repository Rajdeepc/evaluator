const express = require('express');
const router = express.Router();
const {UploadContent} = require('../models/content')


router.post('/', (req,res) => {
    console.log(req.body);


    const uploadContentToDatabase = new UploadContent(req.body);
     uploadContentToDatabase.save()
     .then(item => {
        res.status(200).send({success: true});
      })
      .catch(err => {
        res.status(400).json({ success: false, error: err });
      });
   
});

module.exports = router;