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

function getCourse(id) {
   return courses[findPosition(id)]
}

function getCourses() {
   return courses
}

function addCourse(course) {
   courses.push(course)
   return true
}

module.exports = { getCourse, exist, getCourses, addCourse }