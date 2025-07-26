/* 
Step 1: Set Up Your React Application;
npx create-react-app budget-tracker
cd budget-tracker
npm install axios react-bootstrap bootstrap react-chartjs-2 chart.js

Step 2: Create the MySQL Database Connection, Server with Express, and models;
In the root of your project, create a folder named backend. 
cd backend
npm install express body-parser bcryptjs jsonwebtoken sequelize mysql2 cors

// # Install security-related packages only upon deployment / production phase
// npm install helmet cors express-rate-limit

Inside backend folder, create files: db.js, User.js, server.js, and Expense.js;

Step 3: Create stored procedures in MySQL client

Step 4: Create React components folder inside src folder;

Step 5: Create the follwing files inside src/components: App.js, App.css, Navbar, Carousel, Login.js, Register.js, and BudgetTracker;

Step 6: Update App Component
Modify src/App.js to include the App.css, Navbar.js, Carousel.js, Login.js, Register.js, and BudgetTracker.js components:

Step 7: Add Navbar Logo, and Background Images to Carousel
Inside public folder, add another image folder where the logo and background images will be stored
Make sure to replace image1.jpg, image2.jpg, and image3.jpg in the Carousel.js with the paths to your actual image files.

Start the backend server from the CLI:
cd backend
node server.js

Start the React app from the CLI:
npm start

*/
// create strored procedure in MySQL client
-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS budget_tracker;
USE budget_tracker;

-- Users table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE IF NOT EXISTS Expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Budgets table
CREATE TABLE IF NOT EXISTS Budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    month_year VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    UNIQUE KEY unique_user_month (user_id, month_year)
);

DELIMITER //

-- User Registration
CREATE PROCEDURE RegisterUser(IN p_username VARCHAR(50), IN p_password VARCHAR(255))
BEGIN
    INSERT INTO Users (username, password) VALUES (p_username, p_password);
    SELECT LAST_INSERT_ID() AS id, username FROM Users WHERE id = LAST_INSERT_ID();
END //

-- User Login
CREATE PROCEDURE AuthenticateUser(IN p_username VARCHAR(50))
BEGIN
    SELECT id, username, password FROM Users WHERE username = p_username;
END //

-- Get User by ID
CREATE PROCEDURE GetUserById(IN p_user_id INT)
BEGIN
    SELECT id, username, created_at FROM Users WHERE id = p_user_id;
END //

-- Set/Update User Budget
CREATE PROCEDURE SetUserBudget(
    IN p_user_id INT,
    IN p_amount DECIMAL(10, 2),
    IN p_month_year VARCHAR(7)
)
BEGIN
    INSERT INTO Budgets (user_id, amount, month_year)
    VALUES (p_user_id, p_amount, p_month_year)
    ON DUPLICATE KEY UPDATE amount = p_amount;
    
    SELECT * FROM Budgets WHERE user_id = p_user_id AND month_year = p_month_year;
END //

-- Get User Budget
CREATE PROCEDURE GetUserBudget(IN p_user_id INT, IN p_month_year VARCHAR(7))
BEGIN
    SELECT * FROM Budgets WHERE user_id = p_user_id AND month_year = p_month_year;
END //

-- Add Expense
CREATE PROCEDURE AddExpense(
    IN p_user_id INT,
    IN p_title VARCHAR(100),
    IN p_amount DECIMAL(10, 2),
    IN p_date DATE,
    IN p_category VARCHAR(50)
BEGIN
    INSERT INTO Expenses (user_id, title, amount, date, category)
    VALUES (p_user_id, p_title, p_amount, p_date, p_category);
    
    SELECT * FROM Expenses WHERE id = LAST_INSERT_ID();
END //

-- Update Expense
CREATE PROCEDURE UpdateExpense(
    IN p_expense_id INT,
    IN p_user_id INT,
    IN p_title VARCHAR(100),
    IN p_amount DECIMAL(10, 2)
BEGIN
    UPDATE Expenses
    SET title = p_title, amount = p_amount
    WHERE id = p_expense_id AND user_id = p_user_id;
    
    SELECT * FROM Expenses WHERE id = p_expense_id;
END //

-- Delete Expense
CREATE PROCEDURE DeleteExpense(IN p_expense_id INT, IN p_user_id INT)
BEGIN
    DELETE FROM Expenses WHERE id = p_expense_id AND user_id = p_user_id;
    SELECT ROW_COUNT() AS affected_rows;
END //

-- Get User Expenses
CREATE PROCEDURE GetUserExpenses(
    IN p_user_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_category VARCHAR(50))
BEGIN
    SELECT * FROM Expenses
    WHERE user_id = p_user_id
    AND (p_start_date IS NULL OR date >= p_start_date)
    AND (p_end_date IS NULL OR date <= p_end_date)
    AND (p_category IS NULL OR category = p_category)
    ORDER BY date DESC;
END //

-- Get Expense Summary by Category
CREATE PROCEDURE GetExpenseSummary(
    IN p_user_id INT,
    IN p_month_year VARCHAR(7))
BEGIN
    SELECT 
        category,
        SUM(amount) AS total_amount,
        COUNT(*) AS transaction_count
    FROM Expenses
    WHERE user_id = p_user_id
    AND DATE_FORMAT(date, '%Y-%m') = p_month_year
    GROUP BY category
    ORDER BY total_amount DESC;
END //

DELIMITER ;

GRANT EXECUTE ON budget_tracker.* TO 'your_username'@'localhost';

// -- Enable mysql_native_password for better compatibility in deployment phase
ALTER USER 'budget_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'strong_password_123';

-- Set global security parameters
SET GLOBAL validate_password.policy = STRONG;
SET GLOBAL max_connections = 100;

-- Set password expiration policy
ALTER USER 'budget_user'@'localhost' PASSWORD EXPIRE INTERVAL 90 DAY;

-- Enable audit logging
SET GLOBAL audit_log_format = JSON;
SET GLOBAL audit_log_policy = ALL;
SET GLOBAL audit_log_rotate_on_size = 100000000;


// backend/db.js; for database configuration using Sequelize:
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


// backend/Expense.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;


// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise'); // Using promise-based MySQL client
require('dotenv').config();
const User = require('./User');
const Expense = require('./Expense');
const sequelize = require('./db');
const helmet = require('helmet'); // for deployment
const rateLimit = require('express-rate-limit'); // for deployment

const app = express();
const PORT = process.env.PORT || 5000;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork(); // Restart worker
    });
} else {
    // Your existing server code here
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'budget_tracker',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware: uncomment code parts in deployment / production phase
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later"
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, please try again in an hour"
});

app.use('/api/', apiLimiter);
app.use('/login', authLimiter);
app.use('/register', authLimiter);

// Helper function to execute stored procedures
async function executeProcedure(procedureName, params) {
    const connection = await pool.getConnection();
    try {
        const placeholders = params.map(() => '?').join(',');
        const [results] = await connection.query(
            `CALL ${procedureName}(${placeholders})`,
            params
        );
        return results[0];
    } finally {
        connection.release();
    }
}


// User Registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await executeProcedure('RegisterUser', [username, hashedPassword]);
        res.status(201).json(result[0]);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Username already exists' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Registration failed' });
        }
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [user] = await executeProcedure('AuthenticateUser', [username]);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Middleware to authenticate JWT
const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const [user] = await executeProcedure('GetUserById', [decoded.id]);
        if (!user) return res.sendStatus(403);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

// Budget Endpoints
app.post('/api/budget', authenticateToken, async (req, res) => {
    try {
        const { amount, monthYear } = req.body;
        const currentMonth = monthYear || new Date().toISOString().slice(0, 7);
        const result = await executeProcedure('SetUserBudget', [req.user.id, amount, currentMonth]);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to set budget' });
    }
});

app.get('/api/budget', authenticateToken, async (req, res) => {
    try {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const [budget] = await executeProcedure('GetUserBudget', [req.user.id, currentMonth]);
        res.json(budget || { amount: 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get budget' });
    }
});

// Expense Endpoints
app.post('/api/expenses', authenticateToken, async (req, res) => {
    try {
        const { title, amount, date, category } = req.body;
        const expenseDate = date || new Date().toISOString().split('T')[0];
        const result = await executeProcedure('AddExpense', [
            req.user.id,
            title,
            amount,
            expenseDate,
            category || 'Uncategorized'
        ]);
        res.status(201).json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
});

app.get('/api/expenses', authenticateToken, async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;
        const expenses = await executeProcedure('GetUserExpenses', [
            req.user.id,
            startDate || null,
            endDate || null,
            category || null
        ]);
        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get expenses' });
    }
});

app.get('/api/expenses/summary', authenticateToken, async (req, res) => {
    try {
        const monthYear = req.query.month || new Date().toISOString().slice(0, 7);
        const summary = await executeProcedure('GetExpenseSummary', [req.user.id, monthYear]);
        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get expense summary' });
    }
});

app.put('/api/expenses/:id', authenticateToken, async (req, res) => {
    try {
        const { title, amount } = req.body;
        const result = await executeProcedure('UpdateExpense', [
            req.params.id,
            req.user.id,
            title,
            amount
        ]);
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
    try {
        const result = await executeProcedure('DeleteExpense', [req.params.id, req.user.id]);
        if (result[0].affected_rows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



// src/index.js:
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">
    

// src/App.css):
.stats-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.stat-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  margin: 0 5px;
}

.stat-card h5 {
  font-size: 1rem;
  color: #6c757d;
}

.stat-card h3 {
  font-size: 1.5rem;
  margin-top: 5px;
}

.list-group-item {
  transition: all 0.3s ease;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
/* Carousel Styles */
.carousel-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
}

.carousel-caption h3 {
  font-size: 2.5rem;
  font-weight: bold;
}

.carousel-caption p {
  font-size: 1.2rem;
}

/* Modal Enhancements */
.modal-content {
  border-radius: 15px;
}

.modal-header {
  border-bottom: none;
  padding-bottom: 0;
}

.modal-title {
  font-weight: bold;
}
/* Navbar Enhancements */
.navbar {
  padding: 15px 0;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}



// src/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = ({ token, onLogout, onLoginClick, onRegisterClick }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/logo.png" // Replace with your logo path
            height="30"
            className="d-inline-block align-top me-2"
            alt="Budget Tracker Logo"
          />
          Budget Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {token ? (
              <Button variant="outline-light" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline-light" className="me-2" onClick={onLoginClick}>
                  Login
                </Button>
                <Button variant="light" onClick={onRegisterClick}>
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;



// src/ExpenseChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

const ExpenseChart = ({ expenses }) => {
  // Group by category for better chart visualization
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;



// src/Carousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = () => {
  return (
    <Carousel controls={false} indicators={false} interval={3000} pause={false}>
      <Carousel.Item>
        <div className="carousel-image" style={{ 
          backgroundImage: "url('/finance1.jpg')",
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="carousel-caption">
            <h3>Track Your Expenses</h3>
            <p>Gain control over your finances</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image" style={{ 
          backgroundImage: "url('/finance2.jpg')",
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="carousel-caption">
            <h3>Set Budget Goals</h3>
            <p>Plan for your financial future</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;



// src/BudgetTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert, ListGroup, Row, Col } from 'react-bootstrap';
import ExpenseChart from './ExpenseChart';

const BudgetTracker = ({ token }) => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const filteredExpenses = expenses.filter(expense => {
    const categoryMatch = filterCategory ? expense.category === filterCategory : true;
    const dateMatch = filterDate ? new Date(expense.date).toISOString().split('T')[0] === filterDate : true;
    return categoryMatch && dateMatch;
  });

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  // const fetchExpenses = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/expenses', {
  //       headers: { Authorization: token }
  //     });
  //     setExpenses(response.data);
  //   } catch (error) {
  //     showAlert('Failed to fetch expenses', 'danger');
  //   }
  // };

// Getting expenses for current month
const fetchExpenses = async () => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const response = await axios.get('/api/expenses', {
      params: {
        startDate: `${currentMonth}-01`,
        endDate: `${currentMonth}-31`
      },
      headers: { Authorization: token }
    });
    setExpenses(response.data);
  } catch (error) {
    console.error('Failed to fetch expenses:', error);
  }
};

// Getting expense summary
const fetchExpenseSummary = async () => {
  try {
    const response = await axios.get('/api/expenses/summary', {
      headers: { Authorization: token }
    });
    setSummary(response.data);
  } catch (error) {
    console.error('Failed to fetch summary:', error);
  }
};

  const showAlert = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setTimeout(() => setAlertMessage(''), 5000);
  };

  const submitBudget = async (e) => {
    e.preventDefault();
    
    if (budget < 0) {
      showAlert('Budget cannot be negative', 'danger');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/budget', { budget }, {
        headers: { Authorization: token }
      });
      showAlert(`Budget set to: $${budget}`);
    } catch (error) {
      showAlert('Failed to set budget', 'danger');
    }
  };

  const submitExpense = async (e) => {
    e.preventDefault();

    if (!expenseTitle || !expenseAmount) {
      showAlert('Please fill all fields', 'danger');
      return;
    }

    if (parseFloat(expenseAmount) <= 0) {
      showAlert('Expense amount must be greater than zero', 'danger');
      return;
    }

    const newExpense = { 
      title: expenseTitle, 
      amount: parseFloat(expenseAmount), 
      date: new Date().toISOString(), 
      category: filterCategory || 'Uncategorized' 
    };

    try {
      if (editingExpenseId != null) {
        await axios.put(`http://localhost:5000/api/expenses/${editingExpenseId}`, newExpense, {
          headers: { Authorization: token }
        });
        setEditingExpenseId(null);
        showAlert('Expense updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/expenses', newExpense, {
          headers: { Authorization: token }
        });
        showAlert('Expense added successfully');
      }

      setExpenseTitle('');
      setExpenseAmount('');
      fetchExpenses();
    } catch (error) {
      showAlert('Failed to save expense', 'danger');
    }
  };

  const editExpense = (expense) => {
    setExpenseTitle(expense.title);
    setExpenseAmount(expense.amount.toString());
    setFilterCategory(expense.category);
    setEditingExpenseId(expense.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: token }
      });
      showAlert('Expense deleted successfully');
      fetchExpenses();
    } catch (error) {
      showAlert('Failed to delete expense', 'danger');
    }
  };

  const totalExpenses = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
  const averageExpense = filteredExpenses.length > 0 ? (totalExpenses / filteredExpenses.length).toFixed(2) : 0;
  const remainingBudget = (budget - totalExpenses).toFixed(2);

  return (
    <Container className="mt-4">
      {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Budget Overview</Card.Title>
              <Form onSubmit={submitBudget} className="mb-3">
                <Form.Group>
                  <Form.Label>Set Monthly Budget</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)} 
                    placeholder="Enter budget amount"
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-2">
                  Set Budget
                </Button>
              </Form>
              
              <div className="stats-container">
                <div className="stat-card">
                  <h5>Total Budget</h5>
                  <h3>${budget}</h3>
                </div>
                <div className="stat-card">
                  <h5>Total Expenses</h5>
                  <h3>${totalExpenses}</h3>
                </div>
                <div className="stat-card">
                  <h5>Remaining</h5>
                  <h3 className={remainingBudget < 0 ? 'text-danger' : 'text-success'}>
                    ${remainingBudget}
                  </h3>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Add/Edit Expense</Card.Title>
              <Form onSubmit={submitExpense}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={expenseTitle} 
                    onChange={(e) => setExpenseTitle(e.target.value)} 
                    placeholder="Expense title" 
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={expenseAmount} 
                    onChange={(e) => setExpenseAmount(e.target.value)} 
                    placeholder="Amount" 
                    min="0.01"
                    step="0.01"
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={filterDate} 
                        onChange={(e) => setFilterDate(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Button variant={editingExpenseId ? 'warning' : 'success'} type="submit">
                  {editingExpenseId ? 'Update Expense' : 'Add Expense'}
                </Button>
                {editingExpenseId && (
                  <Button variant="secondary" onClick={() => {
                    setEditingExpenseId(null);
                    setExpenseTitle('');
                    setExpenseAmount('');
                  }} className="ms-2">
                    Cancel
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Expense Statistics</Card.Title>
              <div className="stats-container">
                <div className="stat-card">
                  <h5>Total Expenses</h5>
                  <h3>${totalExpenses}</h3>
                </div>
                <div className="stat-card">
                  <h5>Average Expense</h5>
                  <h3>${averageExpense}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Expense Chart</Card.Title>
              <ExpenseChart expenses={filteredExpenses} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Expense List</Card.Title>
          {filteredExpenses.length === 0 ? (
            <Alert variant="info">No expenses found. Add some expenses to get started!</Alert>
          ) : (
            <ListGroup>
              {filteredExpenses.map((expense) => (
                <ListGroup.Item key={expense.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{expense.title}</strong>
                    <div className="text-muted small">
                      ${expense.amount} • {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <Button variant="outline-warning" size="sm" onClick={() => editExpense(expense)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => deleteExpense(expense.id)}>
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BudgetTracker;



// src/Login.js
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginModal = ({ show, onHide, onLogin, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      onLogin(response.data.token);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="link" onClick={onRegisterClick}>
              Don't have an account? Register
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;


// src/Register.js
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const RegisterModal = ({ show, onHide, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      setMessage('Registration successful! Please login');
      setTimeout(() => {
        onRegister();
        onHide();
      }, 1500);
    } catch (err) {
      setMessage('Registration failed. User may already exist');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;



// src/App.js
import React, { useState } from 'react';
import AppNavbar from './Navbar';
import ImageCarousel from './Carousel';
import BudgetTracker from './BudgetTracker';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { Container } from 'react-bootstrap';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="App">
      <AppNavbar 
        token={token} 
        onLogout={handleLogout}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      
      {!token && <ImageCarousel />}
      
      <Container className="mt-4">
        {token ? (
          <BudgetTracker token={token} />
        ) : (
          <div className="text-center py-5">
            <h2>Welcome to Budget Tracker</h2>
            <p className="lead">Please login or register to manage your expenses</p>
          </div>
        )}
      </Container>

      <LoginModal 
        show={showLogin} 
        onHide={() => setShowLogin(false)}
        onLogin={handleLogin}
        onRegisterClick={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      <RegisterModal 
        show={showRegister} 
        onHide={() => setShowRegister(false)}
        onRegister={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
}

export default App;
