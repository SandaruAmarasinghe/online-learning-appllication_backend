const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy users data (for demonstration purposes)
const users = [
  { id: 1, username: 'user1', passwordHash: '$2b$10$YXQzREhxYhJ.dCzXsOJXHeG6m9S6YF.z3N1Y2kH6zgrE0y8ZSJMCa' } // password: 123456
];

// Secret key for JWT
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  try {
    if (await bcrypt.compare(password, user.passwordHash)) {
      const accessToken = jwt.sign({ username: user.username }, secretKey);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/auth/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.username === req.user.username);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ username: user.username });
});

// Dummy courses data
const courses = [
  { id: 1, title: 'Course 1', description: 'Description 1' },
  { id: 2, title: 'Course 2', description: 'Description 2' }
];

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
