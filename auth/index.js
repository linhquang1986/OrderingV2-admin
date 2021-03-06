var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var appConfig = require('../config');
var secret = appConfig.security.session_secret;
var qaSecret = appConfig.integrations.qa.apiKey;
router.use(bodyParser.json());


router.use((req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['api_key'];
  if (token) {
    if (appConfig.env !== 'test') {
      jwt.verify(token, secret, (err, decoded) => {
        if (err)
          return res.json({ success: false, message: 'Failed to authenticate token.' })
        else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      if (token == qaSecret)
        next();
    }
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

module.exports = router;