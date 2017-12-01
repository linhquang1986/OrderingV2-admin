"use strict"
var express = require('express');
var path = require('path');
var appConfig = require('./config');
var app = express();
// node js automatically open browser
var opn = require('opn');


let port = appConfig.server.port;

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// router
var router = require('./router');
app.use('/', router);
app.set('port', port)

let listener = app.listen(port, () => {
    console.log('Server running on localhost:' + listener.address().port);
    //opn('http://localhost:5000');
});


module.exports = app;// for testing


