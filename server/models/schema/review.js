const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['SHORT', 'LONG'],
      required: true,
      default: 'SHORT',
      immutable: true,
    },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    movie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    rating: { type: Number, required: true, default: 0 },
    text: { type: String, required: true },
    watch_date: { type: Date, required: true },
    review_date: { type: Date, required: true },
  },
  { collection: 'Review' }
);
