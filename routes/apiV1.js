var express = require('express');
var courses = require('../public/javascripts/courses.model')
var cache = require('express-redis-cache')({ expire: 60 });
var router = express.Router();

function validateCourse(course) {
  let properties = ['name', 'mentor', 'price', 'releaseDate', 'level']

  for (let prop of properties) {
    let val = course[prop]
    if (val === null || val === undefined) {
      return false
    }
  }
  return true
}

/* GET home page. */
router.get('/:id?', cache.route(), function(req, res, next) {
  let id = req.params.id
  if(!!id) {
    courses.getCourse(id).then(result => {
      if(!!result) {
        res.status(200).json(result)
      }
      else {
        res.status(404).json({ error: 'id not found' })
      }
    })
  }
  else {
    courses.getCourses().then(result => {
      if(!!result) {
        res.status(200).json(result)
      }
      else {
        res.status(200).json([])
      }
    })
  }
});

router.post('/', function(req, res, next) {
  let course = req.body.course

  if(validateCourse(course)) {
    let newCourse = {
      name: course.name,
      mentor: course.mentor,
      price: course.price,
      imageUrl: course.imageUrl,
      releaseDate: course.releaseDate,
      level: course.level
    }
    
    courses.addCourse(newCourse).then(result => {
      if(!!result) {
        res.status(201).end()
      }
      else {
        res.status(409).json({error: 'not created'})
      }
    })
  }
  else {
    res.status(400).end()
  }
});

router.put('/:id', function(req, res, next) {
  let id = req.params.id
  let course = req.body.course;

  if(!!id && validateCourse(course)) {
    let newCourse = {
      name: course.name,
      mentor: course.mentor,
      price: course.price,
      imageUrl: course.imageUrl,
      releaseDate: course.releaseDate,
      level: course.level
    }
    
    courses.editCourse(id, newCourse).then(result => {
      if(result) {
        res.status(204).end()
      }
      else {
        res.status(409).json({ error: 'not updated' })
      }
    })
  }
  else {
    res.status(400).end()
  }
});

router.delete('/:id', function(req, res, next) {
  let id = req.params.id
  if(!!id) {
    courses.deleteCourse(id).then(result => {
      if(!!result) {
        res.status(204).end()
      }
      else {
        res.status(404).json({error: 'not deleted'})
      }
    })
  }
  else {
    res.status(400).end()
  }
});

module.exports = router;
