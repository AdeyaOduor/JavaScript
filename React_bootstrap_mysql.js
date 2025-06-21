/* 
Step 1: Set Up Your React Application;
npx create-react-app budget-tracker
cd budget-tracker
npm install axios react-bootstrap bootstrap mysql2 sequelize

Include Bootstrap in your project. Modify src/index.js:
import 'bootstrap/dist/css/bootstrap.min.css';

Step 2: Create the MySQL Database Connection;
In the root of your project, create a folder named backend. Inside, create a file named db.js 
for database configuration using Sequelize:

Step 3: Create User Model
In the backend folder, create a file named User.js:

Step 4: Create Server with Express
In the backend folder, create a file named server.js:
*/

// backend/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

// backend/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;

// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./User');
const sequelize = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Connect to the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

// User Registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
