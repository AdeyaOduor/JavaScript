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
sql_stored_procedure

3.Frontend Setup (React + Bootstrap 5)
bash

cd ../frontend
npx create-react-app .
npm install axios react-bootstrap bootstrap react-router-dom

*/

// src/components/database_setup.sql and execute stored_procedure with linux cli or run in MySql client directly

-- Create database and tables
CREATE DATABASE IF NOT EXISTS animal_quiz;
USE animal_quiz;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz scores table
CREATE TABLE IF NOT EXISTS quiz_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Stored Procedure: Register User
DELIMITER //
CREATE PROCEDURE register_user(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
BEGIN
    INSERT INTO users (username, password) VALUES (p_username, p_password);
    SELECT id, username, created_at FROM users WHERE id = LAST_INSERT_ID();
END //
DELIMITER ;

-- Stored Procedure: Authenticate User
DELIMITER //
CREATE PROCEDURE authenticate_user(IN p_username VARCHAR(50))
BEGIN
    SELECT id, username, password FROM users WHERE username = p_username;
END //
DELIMITER ;

-- Stored Procedure: Save Quiz Score
DELIMITER //
CREATE PROCEDURE save_quiz_score(
    IN p_user_id INT,
    IN p_score INT,
    IN p_total_questions INT)
BEGIN
    INSERT INTO quiz_scores (user_id, score, total_questions) 
    VALUES (p_user_id, p_score, p_total_questions);
    
    SELECT * FROM quiz_scores WHERE id = LAST_INSERT_ID();
END //
DELIMITER ;

-- Stored Procedure: Get User Scores
DELIMITER //
CREATE PROCEDURE get_user_scores(IN p_user_id INT)
BEGIN
    SELECT score, total_questions, created_at 
    FROM quiz_scores 
    WHERE user_id = p_user_id 
    ORDER BY created_at DESC;
END //
DELIMITER ;



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

// Helper function to calculate score
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

// Routes using stored procedures
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.execute(
            'CALL register_user(?, ?)',
            [username, hashedPassword]
        );
        
        res.status(201).json(result[0][0]);
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
            'CALL authenticate_user(?)',
            [username]
        );
        
        if (users[0].length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = users[0][0];
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

app.post('/score', authenticateToken, async (req, res) => {
    try {
        const { answers } = req.body;
        const score = calculateScore(questions, answers);
        const totalQuestions = questions.length;
        
        const [result] = await pool.execute(
            'CALL save_quiz_score(?, ?, ?)',
            [req.user.id, score, totalQuestions]
        );
        
        res.json({ 
            message: 'Score saved successfully',
            score,
            totalQuestions,
            scoreDetails: result[0][0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save score' });
    }
});

app.get('/scores', authenticateToken, async (req, res) => {
    try {
        const [scores] = await pool.execute(
            'CALL get_user_scores(?)',
            [req.user.id]
        );
        
        res.json(scores[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch scores' });
    }
});

// Landing page data
app.get('/landing-data', (req, res) => {
    res.json({
        carouselItems: [
            {
                id: 1,
                title: "Test Your Animal Knowledge",
                description: "Discover fascinating facts about baby animals and their parents",
                image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
                id: 2,
                title: "Multiple Question Types",
                description: "Single answer, multiple choice, and dropdown questions",
                image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            },
            {
                id: 3,
                title: "Track Your Progress",
                description: "See your scores improve over time",
                image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
        ],
        features: [
            "Secure user authentication",
            "Interactive quiz interface",
            "Detailed score tracking",
            "Responsive design"
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

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
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Scores from './components/Scores';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    };

    return (
        <>
            {token && (
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Animal Quiz</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="/quiz">Quiz</Nav.Link>
                                <Nav.Link href="/scores">My Scores</Nav.Link>
                                <Button variant="outline-light" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}

            <Container className="mt-4">
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/quiz" /> : <Landing />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/quiz" element={token ? <Quiz token={token} /> : <Navigate to="/login" />} />
                    <Route path="/scores" element={token ? <Scores token={token} /> : <Navigate to="/login" />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;


// frontend/src/App.css
/* Landing Page Styles */
.landing-page {
    min-height: 100vh;
}

.carousel-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}

.feature-item {
    border: none;
    text-align: center;
    padding: 1.5rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #0d6efd;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .feature-item {
        min-width: 150px;
        padding: 1rem;
    }
    
    .carousel-slide {
        height: 300px;
    }
}

/* Quiz component styles */
.quiz-container {
    max-width: 800px;
    margin: 0 auto;
}

.question-text {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
}

.answer-option {
    margin-bottom: 0.5rem;
    cursor: pointer;
    padding: 0.75rem;
    border-radius: 0.25rem;
}

.answer-option:hover {
    background-color: #f8f9fa;
}

.answer-option.selected {
    background-color: #e9f5ff;
    border-left: 4px solid #0d6efd;
}



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

// frontend/src/components/Landing.js
import { useState, useEffect } from 'react';
import { Carousel, Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Landing = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [carouselItems, setCarouselItems] = useState([]);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLandingData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/landing-data');
                setCarouselItems(response.data.carouselItems);
                setFeatures(response.data.features);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching landing data:', error);
                setLoading(false);
            }
        };
        fetchLandingData();
    }, []);

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    return (
        <div className="landing-page">
            <Carousel fade indicators={false} controls={false} interval={5000}>
                {carouselItems.map((item) => (
                    <Carousel.Item key={item.id}>
                        <div 
                            className="carousel-slide"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '400px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                textAlign: 'center',
                                padding: '2rem'
                            }}
                        >
                            <div>
                                <h2>{item.title}</h2>
                                <p className="lead">{item.description}</p>
                                <Button 
                                    variant="light" 
                                    size="lg"
                                    onClick={() => navigate(activeTab === 'login' ? '/login' : '/register')}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card>
                            <Card.Header className="bg-dark text-white">
                                <Nav variant="tabs" defaultActiveKey="login">
                                    <Nav.Item>
                                        <Nav.Link 
                                            eventKey="login" 
                                            onClick={() => setActiveTab('login')}
                                            className={activeTab === 'login' ? 'active' : ''}
                                        >
                                            Login
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link 
                                            eventKey="register" 
                                            onClick={() => setActiveTab('register')}
                                            className={activeTab === 'register' ? 'active' : ''}
                                        >
                                            Register
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body>
                                {activeTab === 'login' ? (
                                    <Login />
                                ) : (
                                    <Register />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col>
                        <h2 className="text-center mb-4">Features</h2>
                        <ListGroup horizontal className="justify-content-center">
                            {features.map((feature, index) => (
                                <ListGroup.Item key={index} className="feature-item">
                                    <div className="feature-icon">
                                        <i className={`bi bi-${getFeatureIcon(index)}`}></i>
                                    </div>
                                    {feature}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// Helper function for feature icons
const getFeatureIcon = (index) => {
    const icons = ['shield-lock', 'question-square', 'graph-up', 'phone'];
    return icons[index % icons.length];
};

export default Landing;


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
                       `Quiz completed! You scored ${response.data.score} out of ${response.data.totalQuestions} (${Math.round(
                        (response.data.score / response.data.totalQuestions) * 100
                     )}%)`
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

       <div className="progress mb-4" style={{ height: '10px' }}>
       <div 
        className="progress-bar" 
        role="progressbar" 
        style={{ 
            width: `${((currentQuestionIndex + (quizOver ? 1 : 0)) / questions.length * 100}%` 
             }}
         />
       </div>


    return (
        <Card.Text className="fs-4 mb-2">
           {currentQuestion.question}
        </Card.Text>
        <small className="text-muted mb-3 d-block">
           {currentQuestion.type === 'radio' && 'Select one answer'}
           {currentQuestion.type === 'checkbox' && 'Select all that apply'}
           {currentQuestion.type === 'dropdown' && 'Choose from dropdown'}
        </small>      
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
import { Table, Card, Accordion, Badge } from 'react-bootstrap';
import axios from 'axios';

const Scores = ({ token }) => {
    const [scores, setScores] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [scoresRes, questionsRes] = await Promise.all([
                    axios.get('http://localhost:5000/scores', {
                        headers: { Authorization: token }
                    }),
                    axios.get('http://localhost:5000/questions', {
                        headers: { Authorization: token }
                    })
                ]);
                
                setScores(scoresRes.data);
                setQuestions(questionsRes.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load data');
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    if (loading) return <div className="text-center my-5">Loading scores...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center mb-4">Your Quiz Results</Card.Title>
                
                <Table striped bordered hover className="mb-5">
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
                                <td>
                                    <Badge bg={score.score/score.total_questions >= 0.7 ? 'success' : 'warning'}>
                                        {Math.round((score.score / score.total_questions) * 100)}%
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>View All Questions and Answers</Accordion.Header>
                        <Accordion.Body>
                            <div className="question-list">
                                {questions.map((question, qIndex) => (
                                    <div key={qIndex} className="mb-4 p-3 border rounded">
                                        <h5>{question.question}</h5>
                                        <div className="ms-3">
                                            {question.type === 'radio' || question.type === 'dropdown' ? (
                                                <>
                                                    <p><strong>Correct answer:</strong> {question.choices[question.correctAnswer]}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p><strong>Correct answers:</strong></p>
                                                    <ul>
                                                        {question.choices
                                                            .filter(choice => choice.correct)
                                                            .map((choice, cIndex) => (
                                                                <li key={cIndex}>{choice.text}</li>
                                                            ))}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
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
