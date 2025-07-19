/*
1. Backend Setup (Node.js + Express + MySQL)
bash

mkdir animal-quiz-app
cd animal-quiz-app
mkdir backend frontend
cd backend
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken cors body-parser dotenv


2. Database Setup (MySQL)
sql

CREATE DATABASE animal_quiz;
USE animal_quiz;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

3.Frontend Setup (React + Bootstrap 5)
bash

cd ../frontend
npx create-react-app .
npm install axios react-bootstrap bootstrap react-router-dom

*/

// backend/server.js

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'animal_quiz',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Questions data
const questions = [
    {
        id: 1,
        question: 'What is the baby of a moth known as?',
        type: 'radio',
        choices: ['baby', 'infant', 'kit', 'larva'],
        correctAnswer: 3
    },
    {
        id: 2,
        question: 'What are the young of these animals called? (Select all that apply)',
        type: 'checkbox',
        choices: [
            { text: 'Kangaroo: joey', correct: true },
            { text: 'Elephant: calf', correct: true },
            { text: 'Butterfly: kitten', correct: false },
            { text: 'Frog: tadpole', correct: true }
        ]
    },
    {
        id: 3,
        question: 'What is the adult of a kid called?',
        type: 'dropdown',
        choices: ['calf', 'doe', 'goat', 'chick'],
        correctAnswer: 2
    },
    {
        id: 4,
        question: 'Which of these are baby animal names? (Select all correct)',
        type: 'checkbox',
        choices: [
            { text: 'Pup', correct: true },
            { text: 'Fry', correct: true },
            { text: 'Lamb', correct: true },
            { text: 'Stallion', correct: false }
        ]
    },
    {
        id: 5,
        question: 'What is a baby swan called?',
        type: 'dropdown',
        choices: ['cygnet', 'gander', 'cob', 'pen'],
        correctAnswer: 0
    }
];
// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// Routes
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        
        res.status(201).json({ id: result.insertId, username });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Username already exists' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Registration failed' });
        }
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/questions', authenticateToken, (req, res) => {
    res.json(questions);
});

// score endpoint
app.post('/score', authenticateToken, async (req, res) => {
    try {
        const { answers } = req.body;
        const score = calculateScore(questions, answers);
        const totalQuestions = questions.length;
        
        await pool.execute(
            'INSERT INTO quiz_scores (user_id, score, total_questions) VALUES (?, ?, ?)',
            [req.user.id, score, totalQuestions]
        );
        
        res.json({ 
            message: 'Score saved successfully',
            score,
            totalQuestions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save score' });
    }
});

app.get('/scores', authenticateToken, async (req, res) => {
    try {
        const [scores] = await pool.execute(
            'SELECT score, total_questions, created_at FROM quiz_scores WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );
        res.json(scores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch scores' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// helper function
function calculateScore(questions, answers) {
    let score = 0;
    
    questions.forEach(question => {
        const userAnswer = answers[question.id];
        
        if (question.type === 'radio' || question.type === 'dropdown') {
            if (userAnswer == question.correctAnswer) {
                score++;
            }
        } 
        else if (question.type === 'checkbox') {
            const correctChoices = question.choices
                .map((choice, index) => choice.correct ? index : null)
                .filter(val => val !== null);
            
            const isCorrect = 
                userAnswer.length === correctChoices.length &&
                userAnswer.every(ans => correctChoices.includes(ans));
            
            if (isCorrect) score++;
        }
    });
    
    return score;
}

// -----------------------------------------------------------------------------------------------------------------------

// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// frontend/src/App.js
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Alert } from 'react-bootstrap';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Scores from './components/Scores';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Animal Quiz</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {token ? (
                <>
                  <Nav.Link href="/quiz">Quiz</Nav.Link>
                  <Nav.Link href="/scores">My Scores</Nav.Link>
                  <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        <Routes>
          <Route path="/" element={token ? <Navigate to="/quiz" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setToken={setToken} setError={setError} />} />
          <Route path="/register" element={<Register setError={setError} />} />
          <Route path="/quiz" element={token ? <Quiz token={token} /> : <Navigate to="/login" />} />
          <Route path="/scores" element={token ? <Scores token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

// frontend/src/components/Login.js
import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/quiz');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Login</Card.Title>
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
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;


// frontend/src/components/Register.js
import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ setError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Register</Card.Title>
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
      </Card.Body>
    </Card>
  );
};

export default Register;


// frontend/src/components/Quiz.js
import { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Alert, Form } from 'react-bootstrap';
import axios from 'axios';

const Quiz = ({ token }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizOver, setQuizOver] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/questions', {
                    headers: { Authorization: token }
                });
                setQuestions(response.data);
            } catch (err) {
                setError('Failed to load questions');
            }
        };
        fetchQuestions();
    }, [token]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerChange = (value) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));
    };

    const handleCheckboxChange = (index, isChecked) => {
        const currentAnswer = userAnswers[currentQuestion.id] || [];
        
        if (isChecked) {
            handleAnswerChange([...currentAnswer, index]);
        } else {
            handleAnswerChange(currentAnswer.filter(i => i !== index));
        }
    };

    const handleNext = async () => {
        if (!quizOver) {
            // Validate current question
            if (userAnswers[currentQuestion.id] === undefined || 
                (Array.isArray(userAnswers[currentQuestion.id]) && userAnswers[currentQuestion.id].length === 0)) {
                setError('Please select an answer');
                return;
            }

            setError('');

            // Move to next question or finish quiz
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setIsSubmitting(true);
                try {
                    const response = await axios.post(
                        'http://localhost:5000/score',
                        { answers: userAnswers },
                        { headers: { Authorization: token } }
                    );
                    setSuccess(
                        `Quiz completed! You scored ${response.data.score} out of ${response.data.totalQuestions}`
                    );
                    setQuizOver(true);
                } catch (err) {
                    setError('Failed to submit quiz');
                } finally {
                    setIsSubmitting(false);
                }
            }
        } else {
            // Reset quiz
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setQuizOver(false);
            setSuccess('');
        }
    };

    if (questions.length === 0) {
        return <div className="text-center my-5">Loading questions...</div>;
    }

    return (
        <Card className="mx-auto" style={{ maxWidth: '800px' }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </Card.Title>
                
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                
                <Card.Text className="fs-4 mb-4">
                    {currentQuestion.question}
                </Card.Text>
                
                {currentQuestion.type === 'radio' && (
                    <ListGroup>
                        {currentQuestion.choices.map((choice, index) => (
                            <ListGroup.Item 
                                key={index}
                                action
                                active={userAnswers[currentQuestion.id] === index}
                                onClick={() => handleAnswerChange(index)}
                                className="d-flex align-items-center"
                            >
                                <Form.Check
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    checked={userAnswers[currentQuestion.id] === index}
                                    onChange={() => {}}
                                    className="me-3"
                                    label={choice}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                
                {currentQuestion.type === 'checkbox' && (
                    <ListGroup>
                        {currentQuestion.choices.map((choice, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-center">
                                <Form.Check
                                    type="checkbox"
                                    id={`check-${currentQuestion.id}-${index}`}
                                    label={choice.text}
                                    checked={(userAnswers[currentQuestion.id] || []).includes(index)}
                                    onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                    className="me-3"
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                
                {currentQuestion.type === 'dropdown' && (
                    <Form.Select 
                        size="lg"
                        value={userAnswers[currentQuestion.id] || ''}
                        onChange={(e) => handleAnswerChange(parseInt(e.target.value))}
                    >
                        <option value="">Select an answer</option>
                        {currentQuestion.choices.map((choice, index) => (
                            <option key={index} value={index}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                )}
                
                <div className="d-flex justify-content-between mt-4">
                    {currentQuestionIndex > 0 && !quizOver && (
                        <Button 
                            variant="outline-primary"
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        >
                            Previous
                        </Button>
                    )}
                    
                    <Button 
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="ms-auto"
                    >
                        {isSubmitting && 'Submitting...'}
                        {!isSubmitting && (quizOver ? 'Play Again' : 
                            (currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'))}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Quiz;

// frontend/src/components/Scores.js
import { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import axios from 'axios';

const Scores = ({ token }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/scores', {
          headers: { Authorization: token }
        });
        setScores(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load scores');
        setLoading(false);
      }
    };
    fetchScores();
  }, [token]);

  if (loading) return <div>Loading scores...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center mb-4">Your Quiz Scores</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Score</th>
              <th>Total Questions</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{new Date(score.created_at).toLocaleDateString()}</td>
                <td>{score.score}</td>
                <td>{score.total_questions}</td>
                <td>{Math.round((score.score / score.total_questions) * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Scores;

/*
Running the Application

    Start the backend:

bash

cd backend
node server.js

    Start the frontend:

bash

cd ../frontend
npm start

*/
