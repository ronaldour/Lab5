var express = require('express');
var courses = require('../public/javascripts/courses.model')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let id = req.query.id

  if(!!id) {
    if(courses.exist(id)) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(courses.getCourse(id)))
    }
    else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("id not found")
    }
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(courses.getCourses()))
  }
  res.end()
});

router.post('/', function(req, res, next) {
  var course = req.body.course;
  
  if(courses.addCourse(course)) {
    res.writeHead(201, {'Content-Type': 'text/plain'});
    res.write('Agregado')
  }
  res.end()
});

module.exports = router;
