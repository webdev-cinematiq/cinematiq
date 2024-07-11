const express = require('express');
const Discussion = require('../models/discussions');

const router = express.Router();

const addDiscussion = async (req, res) => {
  try {
    const { movie, title, text, author } = req.body;

    const discussion = {
      movie: movie,
      title: title,
      text: text,
      author: author,
      created: new Date(),
    };

    const newDiscussion = await Discussion.create(discussion);

    res.json(newDiscussion);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Something went wrong while adding new question' });
  }
};

router.post('/addQuestion', addDiscussion);

module.exports = router;
