const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    postType: {
      type: String,
      enum: ['DISCUSSION', 'COMMENT'],
      required: true,
      default: 'COMMENT',
      immutable: true,
    },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    text: { type: String, required: true },
    created: { type: Date, required: true },
  },
  { collection: 'Comment' }
);
