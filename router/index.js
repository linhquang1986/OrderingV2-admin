"use strict"
var express = require('express');
var router = express.Router();
let drink = require('./dinksOrder');
let witai = require('./witAi');

router.use('/drink', drink);

router.use('/wit', witai);

router.get('/management', (req, res) => {
    res.render('management');
})
router.get('/', (req, res) => {
    res.render('management');
})

module.exports = router;