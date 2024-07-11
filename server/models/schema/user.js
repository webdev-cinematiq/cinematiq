const mongoose = require('mongoose');

module.exports = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['VIEWER', 'CRITIC', 'ADMIN'],
      required: true,
      default: 'VIEWER',
      immutable: true,
    },
    name: { type: String, required: true, unique: true },
    reputation: { type: Number, required: true, default: 0 },
    join_date: { type: Date, required: true },
  },
  { collection: 'User' }
);
