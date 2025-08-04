/*
Linux CLI Setup for Full-Stack Development (React, Node.js, Express, PostgreSQL, Tailwind CSS)

//update packages
sudo apt update && sudo apt upgrade -y

//install essential buid tools
sudo apt install -y build-essential curl git

// install nodesource repository latest version
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

// verify installation
node --version
npm --version

// Create postgre database
sudo -u postgres psql -c "CREATE USER devuser WITH PASSWORD '@K3m1s_2025';"
sudo -u postgres psql -c "CREATE DATABASE kemis_db WITH OWNER devuser;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE kemis_db TO devuser;"

//Setup Backend
mkdir education-management-system && cd education-management-system
mkdir backend && cd backend

// initialize project
npm init -y

// Install required dependencies:
npm install express pg sequelize cors dotenv bcryptjs jsonwebtoken
npm install --save-dev nodemon morgan

touch server.js

// Create .env file:
echo "DB_NAME=kemis_db
DB_USER=devuser
DB_PASSWORD=@K3m1s_2025
DB_HOST=localhost
PORT=5000
JWT_SECRET=your_jwt_secret_here" > .env

// Add scripts to package.json:
json

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}

================================== FRONT END SETUP ================================================

cd ..
npx create-react-app frontend
cd frontend

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install axios react-router-dom react-chartjs-2 chart.js
npm install --save-dev @tailwindcss/forms

*/
// ============================================== BACK END ============================================
// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Update your CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your React app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Routes
app.get('/', (req, res) => {
  res.json({ message: 'education Management System API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// ============================================= FRONY END =============================================================

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// src/components/GradeChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const GradeChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Performance by Subject',
      },
    },
  };

  const data = {
    labels: ['Math', 'English', 'Science', 'History', 'Geography'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 78, 92, 65, 70],
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

// src/App.js
import React from 'react';
import { GradeChart } from './components/GradeChart';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        education Management System
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <GradeChart />
      </div>
    </div>
  );
}

export default App;
