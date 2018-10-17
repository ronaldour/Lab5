const mongodb = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017'
const dbName = 'learnHub'

var courses  = [
   {
      id: 0,
      name: 'PHP for dummies',
      mentor: 'Geovanny Lopez',
      price: 1.99,
      imageUrl: '/assets/php.png',
      releaseDate: new Date('05/06/2018'),
      level: 'beginer'
   },
   {
      id: 1,
      name: 'Advanced C++',
      mentor: 'Ronaldo U',
      price: 99.98,
      imageUrl: '/assets/cpp.png',
      releaseDate: new Date('05/10/2018'),
      level: 'advanced'
   },
   {
      id: 2,
      name: 'Assembler',
      mentor: 'Martin P',
      price: 85.99,
      imageUrl: '/assets/asm.png',
      releaseDate: new Date('07/07/1999'),
      level: 'advanced'
   },
   {
      id: 3,
      name: 'Angular Tour',
      mentor: 'Juanito',
      price: 50.50,
      imageUrl: '/assets/angular.png',
      releaseDate: new Date('06/06/2018'),
      level: 'intermediate'
   },
   {
      id: 4,
      name: 'Master React',
      mentor: 'Paolo',
      price: 50.50,
      imageUrl: '/assets/react.png',
      releaseDate: new Date('06/06/2018'),
      level: 'intermediate'
   }
]

function findPosition(id) {
   for(let i = 0; i < courses.length; i++) {
      if(courses[i].id == id) {
         return i
      }
   }
   return -1
}

function exist(id) {
   if(findPosition(id) === -1) {
      return false
   }
   else {
      return true
   }
}

async function getCourse(id, callback) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      let result = await db.collection('courses').findOne({id: id})

      callback(result)
   }
   catch (err) {
      console.log(err.stack)
   }
}

async function getCourses(callback) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      let result = await db.collection('courses').find().limit(10).toArray()

      callback(result)
   }
   catch (err) {
      console.log(err.stack)
   }
}

async function addCourse(course, callback) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      let result = await db.collection('courses').insertOne(course)

      callback(result)
   }
   catch (err) {
      console.log(err.stack)
   }
}

async function editCourse(course, callback) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      let result = await db.collection('courses').updateOne({id: course.id}, {$set: course})

      callback(result)
   }
   catch (err) {
      console.log(err.stack)
   }
}

async function deleteCourse(id) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      let result = await db.collection('courses').deleteOne({id: id})

      callback(result)
   }
   catch (err) {
      console.log(err.stack)
   }
}

module.exports = { getCourse, exist, getCourses, addCourse, editCourse, deleteCourse }