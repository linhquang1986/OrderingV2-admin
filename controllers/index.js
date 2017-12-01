"use strict"
let drinkController = require('./drinkOrder');
let witController = require('./witai');
let Controllers = {
  drinkController: drinkController,
  witController: witController
}
module.exports = Controllers;