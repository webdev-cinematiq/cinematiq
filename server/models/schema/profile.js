const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    profileImage: { type: String },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collections' }],
  },
  { collection: 'Profile' }
);
