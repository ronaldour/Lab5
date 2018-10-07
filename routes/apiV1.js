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
  let course = req.body.course;
  
  if(!!course) {
    if(courses.addCourse(course)) {
      res.writeHead(201, {'Content-Type': 'text/plain'});
      res.write('Course added')
    }
  }
  res.end()
});

router.put('/', function(req, res, next) {
  let id = req.query.id
  let course = req.body.course;
  if(!!id) {
    if(courses.exist(id)) {
      courses.editCourse(course)
      res.writeHead(204, {'Content-Type': 'text/plain'});
    }
    else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("id not found")
    }
  }
  else {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('provide id')
  }
  res.end()
});

router.delete('/', function(req, res, next) {
  let id = req.query.id
  if(!!id) {
    if(courses.exist(id)) {
      courses.deleteCourse(id)
      res.writeHead(204, {'Content-Type': 'text/plain'});
    }
    else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("id not found")
    }
  }
  else {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('provide id')
  }
  res.end()
});

module.exports = router;
