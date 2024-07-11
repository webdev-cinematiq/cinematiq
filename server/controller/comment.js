const express = require('express');
const Comment = require('../models/comments');

const Discussion = require('../models/discussions');

const router = express.Router();

const addComment = async (req, res) => {
  try {
    const { did, comment } = req.body;
    const { author, text, created } = comment;
    const newComment = await Comment.create({ author, text, created });

    const updatedDiscussion = await Discussion.findOneAndUpdate(
      { _id: did },
      { $push: { comments: { $each: [newComment._id], $position: 0 } } },
      { new: true }
    );

    if (updatedDiscussion) {
      res.json(newComment);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'Something went wrong while adding new comment' });
  }
};

router.post('/addComment', addComment);

module.exports = router;
