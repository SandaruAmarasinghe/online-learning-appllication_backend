const express = require('express');
const router = express.Router();

// Dummy courses data (for demonstration purposes)
let courses = [
  { id: 1, title: 'Course 1', description: 'Description 1', instructor: 'Instructor 1', price: 50 },
  { id: 2, title: 'Course 2', description: 'Description 2', instructor: 'Instructor 2', price: 60 }
];

// Get all courses
router.get('/', (req, res) => {
  res.json(courses);
});

// Add a new course
router.post('/', (req, res) => {
  const newCourse = req.body;
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

module.exports = router;
