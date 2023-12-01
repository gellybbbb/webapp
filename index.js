// controllers/userController.js
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'mySecretKey';

// Registration controller
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
      const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
              }
    const newUser = await UserModel.create({ username, password: await bcrypt.hash(password, 10) });
        res.status(201).json({ message: 'User registered successfully', newUser });
          } catch (error) {
              console.error('Registration failed:', error);
                  res.status(500).json({ message: 'Internal server error' });
                    }
                    };
// Login controller
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
      const validUser = await UserModel.findOne({ username, password });
    if (!validUser) {
          return res.status(404).json({ message: 'Username or password is incorrect' });
              }
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1d' });
        res.json({ token });
          } catch (error) {
              console.error('Login failed:', error);
                  res.status(500).json({ message: 'Internal server error' });
                    }
                    };









// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Registration route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

module.exports = router;







// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://angelbelangel:angel@cluster0.zdy2k51.mongodb.net/angeldb");

// Use user routes
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });
