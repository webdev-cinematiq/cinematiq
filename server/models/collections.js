const mongoose = require('mongoose');

const Collection = require('./schema/collection');

module.exports = mongoose.model('Collection', Collection);
