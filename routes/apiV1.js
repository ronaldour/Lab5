var express = require('express');
var courses = require('../public/javascripts/courses.model')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(JSON.stringify(courses.getCourse()))
  res.end();
});

module.exports = router;
