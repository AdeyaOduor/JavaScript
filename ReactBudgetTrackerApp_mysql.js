/* 
Step 1: Set Up Your React Application;
npx create-react-app budget-tracker
cd budget-tracker
npm install axios react-bootstrap bootstrap react-chartjs-2 chart.js

Step 2: Create the MySQL Database Connection;
In the root of your project, create a folder named backend. 
cd backend
npm install express body-parser bcryptjs jsonwebtoken sequelize mysql2 cors
Inside backend, create file db.js; // for database configuration using Sequelize:

Step 3: Create Models
In the backend folder create files; User.js, Expense.js:

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
const User = require('./User');
const Expense = require('./Expense');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// In-memory budget storage (replace with a database in production)
let budget = 0;

// POST endpoint for updating the budget
app.post('/api/budget', (req, res) => {
  const { budget: newBudget } = req.body;

  if (typeof newBudget !== 'number' || newBudget < 0) {
    return res.status(400).json({ error: 'Invalid budget value' });
  }

  budget = newBudget; // Store the budget
  res.status(200).json({ message: 'Budget updated successfully' });
});

// Connect to the database and start the server
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
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

// Expense routes
app.post('/api/expenses', authenticateToken, async (req, res) => {
  const { title, amount, date, category } = req.body;
  const expense = await Expense.create({ userId: req.user.id, title, amount, date, category });
  res.status(201).json(expense);
});

app.get('/api/expenses', authenticateToken, async (req, res) => {
  const expenses = await Expense.findAll({ where: { userId: req.user.id } });
  res.json(expenses);
});

app.put('/api/expenses/:id', authenticateToken, async (req, res) => {
  const { title, amount } = req.body;
  const expense = await Expense.findByPk(req.params.id);
  if (expense && expense.userId === req.user.id) {
    expense.title = title;
    expense.amount = amount;
    await expense.save();
    res.json(expense);
  } else {
    res.status(404).json({ error: 'Expense not found' });
  }
});

app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);
  if (expense && expense.userId === req.user.id) {
    await expense.destroy();
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Expense not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Protected route example
app.get('/api/user', authenticateToken, (req, res) => {
  res.json({ message: 'Hello, user!' });
});

// src/index.js:
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">

// Add CSS for better styling (in App.css):
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

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: token }
      });
      setExpenses(response.data);
    } catch (error) {
      showAlert('Failed to fetch expenses', 'danger');
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
import axios from 'axios';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';

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
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
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
