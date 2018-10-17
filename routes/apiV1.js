var express = require('express');
var courses = require('../public/javascripts/courses.model')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let id = req.query.id

  if(!!id) {
    courses.getCourse(id, function(result) {
      if(!!result) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(result))
      }
      else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write("id not found")
      }
      res.end()
    })
  }
  else {
    courses.getCourses(function(result) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(result))
      res.end()
    })
  }
});

router.post('/', function(req, res, next) {
  let course = req.body.course;
  
  if(!!course) {
    courses.addCourse(course, function(result) {
      if(result) {
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.write('Course added')
        res.end()
      }
    })
  }
});

router.put('/', function(req, res, next) {
  let id = req.query.id
  let course = req.body.course;
  if(!!id) {
    courses.editCourse(course, function(result) {
      if(!!result) {
        res.writeHead(204, {'Content-Type': 'text/plain'});
      }
      else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write("id not found")
      }
      res.end()
    })
  }
  else {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('provide id')
    res.end()
  }
});

router.delete('/', function(req, res, next) {
  let id = req.query.id
  if(!!id) {
    courses.deleteCourse(id, function(result) {
      if(!!result) {
        res.writeHead(204, {'Content-Type': 'text/plain'});
      }
      else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write("id not found")
      }
      res.end()
    })
  }
  else {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('provide id')
    res.end()
  }
});

module.exports = router;
