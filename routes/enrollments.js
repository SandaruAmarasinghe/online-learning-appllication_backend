const express = require('express');
const router = express.Router();

// Dummy enrollments data (for demonstration purposes)
const enrollments = [
  { id: 1, student: 'John Doe', course: 'Course 1' },
  { id: 2, student: 'Jane Doe', course: 'Course 2' }
];

// Route to fetch all enrollments
router.get('/enrollments', (req, res) => {
  res.json(enrollments);
});

module.exports = router;
