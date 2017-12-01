var mongoose = require('mongoose');
var appConfig = require('../../config');
var connection = mongoose.createConnection(appConfig.mongo.URI.drinkmenu);
module.exports = connection;