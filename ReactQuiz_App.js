/*
1. mkdir animal-quiz-app
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

*/

