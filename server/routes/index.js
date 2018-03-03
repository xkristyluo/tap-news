var express = require('express');
var router = express.Router();

/* GET home page */
var path = require('path');
router.get('/', function(req, res, next) {
  // Send index.html located in build folder to the client
  res.sendFile('index.html', {root: path.join(__dirname, '../../client/build/')});
})

module.exports = router;
