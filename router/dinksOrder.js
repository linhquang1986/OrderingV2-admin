var express = require('express');
var router = express.Router();
var drinkCtrl = require('../controllers').drinkController
var bodyparser = require('body-parser');
var header = require('../auth/setHearder');
router.use(bodyparser.json());
router.use(header);

router.post('/addMenu', drinkCtrl.addMenu)

router.post('/addDrink', drinkCtrl.addDrink)

router.get('/getAllMenu', drinkCtrl.getAllMenu)

router.get('/getAllDrink', drinkCtrl.getAllDrink)

router.put('/editMenu/:id', drinkCtrl.editMenu)

router.put('/editDrink/:id', drinkCtrl.editDrink)

router.delete('/delMenu/:id', drinkCtrl.delMenu);

router.delete('/delDrink/:id', drinkCtrl.delDrink);

router.get('/getDrinkByMenu/:id', drinkCtrl.getDrinkByMenu)


module.exports = router;