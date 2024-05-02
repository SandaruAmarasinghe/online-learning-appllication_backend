const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Dummy user data (for demonstration purposes)
let users = [];

// Secret key for JWT
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

// Route to handle user registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = {
      id: users.length + 1,
      email,
      passwordHash
    };

    // Add the new user to the array
    users.push(newUser);

    // Generate JWT token
    const accessToken = jwt.sign({ email: newUser.email }, secretKey);

    // Respond with the user and token
    res.json({ user: newUser, accessToken });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ email: user.email }, secretKey);

    // Respond with token
    res.json({ accessToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
