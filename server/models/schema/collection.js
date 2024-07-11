const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { collection: 'Collection' }
);
