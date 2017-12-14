var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var con = require('../connection');

var menuSchma = new Schema({
    name: { type: String, default: '', required: true, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    expressions: {type: Array, default: []},
    best: {type: Boolean, default: false}
}, { versionKey: false });
var Menu = con.model('Menu', menuSchma);
module.exports = Menu;