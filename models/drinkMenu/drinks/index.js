var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var con = require('../connection');
var drinkSchema = new Schema({
    name: { type: String, default: true, required: true, unique: true },
    menu: { type: Schema.Types.ObjectId, ref: 'Menu' },
    price: { type: Number, required: true, default: 0 }
}, { versionKey: false });

var Drink = con.model('Drink', drinkSchema);
module.exports = Drink;
