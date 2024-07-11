const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    postType: {
      type: String,
      enum: ['DISCUSSION', 'COMMENT'],
      required: true,
      default: 'DISCUSSION',
      immutable: true,
    },
    movie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    title: { type: String, required: true, maxLength: 100 },
    text: { type: String, required: true },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created: { type: Date, required: true },
    views: { type: Number, required: true, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'COMMENT' }],
  },
  { collection: 'Discussion' }
);
