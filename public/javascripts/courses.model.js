const mongodb = require('mongodb')
const assert = require('assert')

const url = 'mongodb://mongodb:27017'
const dbName = 'learnHub'

async function getCourse(id) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      const result = await db.collection('courses').findOne({ _id: mongodb.ObjectID(id) })

      return result
   }
   catch (err) {
      console.log(err.stack)
   }
}

async function getCourses() {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      return await db.collection('courses').find().limit(10).toArray()
   }
   catch (err) {
      console.log(err.stack)
   }
}

async function addCourse(course) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      const result = await db.collection('courses').insertOne(course)

      return result.insertedCount === 1
   }
   catch (err) {
      console.log(err.stack)
   }
}

async function editCourse(id, course) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      const result = await db.collection('courses').updateOne({_id: mongodb.ObjectID(id)}, {$set: course})
      
      return result.result.ok
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

      let result = await db.collection('courses').deleteOne({_id: mongodb.ObjectID(id)})

      return result.deletedCount === 1
   }
   catch (err) {
      console.log(err.stack)
   }
}

module.exports = { getCourse, getCourses, addCourse, editCourse, deleteCourse }