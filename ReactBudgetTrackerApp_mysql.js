/* 
Step 1: Set Up Your React Application;
npx create-react-app budget-tracker
cd budget-tracker
npm install axios react-bootstrap bootstrap mysql2 sequelize react-chartjs-2 chart.js

Include Bootstrap in your project. Modify src/index.js:
import 'bootstrap/dist/css/bootstrap.min.css';

Step 2: Create the MySQL Database Connection;
In the root of your project, create a folder named backend. Inside, create a file named db.js 
for database configuration using Sequelize:

Step 3: Create User Model
In the backend folder, create a file named User.js:

Step 4: Create Server with Express
In the backend folder, create a file named server.js:

Step 5: Create the follwing React Components inside src folder Navbar, Carousel, Login.js, Register.js, and BudgetTracker;

Step 6: Update App Component
Modify src/App.js to include the Navbar, Carousel, Login.js, Register.js, and Budget Tracker components:

Step 7: Add Background Images to Carousel
Make sure to replace image1.jpg, image2.jpg, and image3.jpg in the Carousel.js with the paths to your actual image files.

Start the backend server from the CLI:
cd backend
node server.js

Start the React app from the CLI:
npm start

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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to check JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected route example
app.get('/api/user', authenticateToken, (req, res) => {
  res.json({ message: 'Hello, user!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// src/Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Budget Tracker</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#login">Login</Nav.Link>
        <Nav.Link href="#register">Register</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;

// src/Carousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="image1.jpg" alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="image2.jpg" alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="image3.jpg" alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;

// src/BudgetTracker.js
import React, { useState } from 'react';
import axios from 'axios';

const BudgetTracker = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);

  const submitBudget = () => {
    // Handle budget submission
    setBudget(budget);
  };

  const submitExpense = () => {
    const newExpense = { title: expenseTitle, amount: expenseAmount };
    setExpenses([...expenses, newExpense]);
    setExpenseTitle('');
    setExpenseAmount(0);
  };

  return (
    <div>
      <h1>Budget Tracker</h1>
      <form onSubmit={submitBudget}>
        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Set Budget" />
        <button type="submit">Set Budget</button>
      </form>
      <form onSubmit={submitExpense}>
        <input type="text" value={expenseTitle} onChange={(e) => setExpenseTitle(e.target.value)} placeholder="Expense Title" />
        <input type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} placeholder="Amount" />
        <button type="submit">Add Expense</button>
      </form>
      <div>
        <h2>Expenses</h2>
        {expenses.map((expense, index) => (
          <div key={index}>
            <span>{expense.title}: ${expense.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTracker;

// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      setMessage('User registered successfully!');
      setUsername('');
      setPassword('');
    } catch (err) {
      setMessage('User already exists');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

// src/App.js
import React from 'react';
import AppNavbar from './Navbar';
import ImageCarousel from './Carousel';
import BudgetTracker from './BudgetTracker';

function App() {
  return (
    <div>
      <AppNavbar />
      <ImageCarousel />
      <div className="container">
        <BudgetTracker />
      </div>
    </div>
  );
}

export default App;
