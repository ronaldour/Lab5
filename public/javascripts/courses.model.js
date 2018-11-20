const mongodb = require('mongodb')

const url = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_ENDPOINT
const dbName = 'learnHub'

async function getCourse(id) {
   try {
      let client = await mongodb.MongoClient.connect(url)
      console.log("Connected correctly to server")
      const db = client.db(dbName)

      const result = await db.collection('courses').findOne({ _id: mongodb.ObjectID(id) })

      client.close()
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

      const result = await db.collection('courses').find().limit(10).toArray()
      
      client.close()
      return result
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
      
      client.close()
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
      
      client.close()
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

      client.close()
      return result.deletedCount === 1
   }
   catch (err) {
      console.log(err.stack)
   }
}

module.exports = { getCourse, getCourses, addCourse, editCourse, deleteCourse }