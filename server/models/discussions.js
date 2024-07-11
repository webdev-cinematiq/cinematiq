const mongoose = require('mongoose');

const Discussion = require('./schema/discussion');

module.exports = mongoose.model('Discussion', Discussion);
