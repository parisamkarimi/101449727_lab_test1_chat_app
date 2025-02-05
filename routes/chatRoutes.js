const express = require("express");
const GroupMessage = require("../models/GroupMessage");

const router = express.Router();

// Fetch room messages
router.get("/room/:room", async (req, res) => {
  const messages = await GroupMessage.find({ room: req.params.room });
  res.json(messages);
});

module.exports = router;
