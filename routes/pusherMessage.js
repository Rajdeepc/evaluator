const express = require("express");
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true,
});

router.post("/", async (req, res) => {
  const payload = req.body.message;
  const uniqueKeyParam = req.body.uniqueId;
  pusher.trigger(uniqueKeyParam, "client-message", payload);
  res.send(payload);
});

module.exports = router;
