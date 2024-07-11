const mongoose = require('mongoose');

const Review = require('./schema/review');

module.exports = mongoose.model('Review', Review);
