const express = require('express');
const router = express.Router();

// Dummy profile data (for demonstration purposes)
const profileData = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
};

// Route to handle profile data retrieval
router.get('/', (req, res) => {
  res.json(profileData);
});

module.exports = router;
