const express = require('express');
const router = express.Router();
const GroupMessage = require('../models/GroupMessage');
const PrivateMessage = require('../models/PrivateMessage');

// Send Group Message
router.post('/sendGroupMessage', async (req, res) => {
  const { from_user, room, message } = req.body;
  try {
    const newMessage = new GroupMessage({ from_user, room, message, date_sent: new Date() });
    await newMessage.save();
    res.status(201).send({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Error sending message.' });
  }
});

// Send Private Message
router.post('/sendPrivateMessage', async (req, res) => {
  const { from_user, to_user, message } = req.body;
  try {
    const newMessage = new PrivateMessage({ from_user, to_user, message, date_sent: new Date() });
    await newMessage.save();
    res.status(201).send({ message: 'Private message sent successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Error sending private message.' });
  }
});

module.exports = router;

