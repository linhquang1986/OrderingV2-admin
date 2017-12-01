"use strict"
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var witController = require('../controllers').witController;
var header = require('../auth/setHearder');

router.use(bodyParser.json());
router.use(header);
//add value
router.post('/addValue', witController.addValue)
//get all value
router.get('/getAll/:id', witController.getAllValue)

//api insecure
//router.put('/editValue/:id', witController.editValue)

//add expression of value
router.post('/addExpression', witController.addExpression)
//del expression of value
router.post('/delExpression', witController.delExpression)
//del value
router.post('/delValue', witController.delValue)

//api not working
//router.post('/samples', witController.train)

module.exports = router;