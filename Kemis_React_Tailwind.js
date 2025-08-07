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
sudo -u postgres psql -c "CREATE DATABASE education-management-system_db WITH OWNER devuser;"
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

// Backend/Node structure
src/
├── config/               # Configuration files
├── controllers/         # Route controllers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API routes
├── services/            # Business logic
├── utils/               # Utility classes/functions
└── validators/          # Request validators
================================== FRONT END SETUP ================================================

cd ..
npx create-react-app frontend
cd frontend

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install axios react-router-dom react-chartjs-2 chart.js
npm install --save-dev @tailwindcss/forms

// education-management-system/package.json
echo '{
  "name": "education-management-system",
  "version": "1.0.0",
  "scripts": {
    "backend": "cd backend && npm run dev",
    "frontend": "cd frontend && npm start",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\"",
    "setup": "cd backend && npm install && cd ../frontend && npm install"
  },
  "devDependencies": {
    "concurrently": "^7.0.0"
  }
}' > package.json

// Install Concurrently for running both servers, and Run both frontend and backend simultaneously:
bash

npm install --save-dev concurrently
npm run dev

Production Build:
bash

cd frontend && npm run build

Process Manager (for production):
bash

sudo npm install -g pm2
pm2 start backend/server.js

// Frontend structure
src/
├── assets/              # Static assets
├── components/         # Reusable components
│   ├── auth/
│   ├── dashboard/
│   ├── data/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
│   ├── admin/
│   ├── county/
│   ├── institution/
│   ├── public/
│   └── shared/
├── services/           # API service calls
├── styles/             # Custom styles
├── utils/              # Utility functions
└── App.js              # Main app component

*/
// ============================================== BACK END ============================================

// Sql
-- Jurisdictions hierarchy (National -> County -> Sub-County)
CREATE TABLE IF NOT EXISTS jurisdictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    level ENUM('national', 'county', 'subcounty') NOT NULL,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES jurisdictions(id) ON DELETE CASCADE
);

-- Departments within each jurisdiction
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jurisdiction_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jurisdiction_id) REFERENCES jurisdictions(id) ON DELETE CASCADE,
    UNIQUE KEY (jurisdiction_id, code)
);

-- Institutions
CREATE TABLE institutions (
  institution_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('Early Learning', 'Primary', 'Junior Secondary', 'High School', 'TVET', 'University') NOT NULL,
  registration_date DATE,
  status ENUM('Pending', 'Approved', 'Suspended', 'Deregistered') DEFAULT 'Pending',
  physical_address TEXT,
  county_id INT,
  sub_county_id INT,
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (county_id) REFERENCES counties(id),
  FOREIGN KEY (sub_county_id) REFERENCES sub_counties(id)
);

-- Users/Roles
CREATE TABLE users (
  user_id VARCHAR(20) PRIMARY KEY,
  institution_id VARCHAR(20),
  national_id VARCHAR(20) UNIQUE,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  role ENUM('national_admin', 'county_admin', 'subcounty_admin', 'institution_admin', 'institution_staff', 'public') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);

-- Learners
CREATE TABLE learners (
  learner_id VARCHAR(20) PRIMARY KEY,
  institution_id VARCHAR(20) NOT NULL,
  national_id VARCHAR(20) UNIQUE,
  upi_number VARCHAR(20) UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  gender ENUM('Male', 'Female', 'Other'),
  enrollment_date DATE,
  current_grade VARCHAR(20),
  is_foreign BOOLEAN DEFAULT FALSE,
  foreign_passport_no VARCHAR(50),
  foreign_country VARCHAR(50),
  visa_type VARCHAR(50),
  visa_expiry DATE;
  status ENUM('Active', 'Transferred', 'Graduated', 'Dropped Out') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id)
);
 
-- Create parent/guardian table
CREATE TABLE parent_guardians (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  national_id VARCHAR(20),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  relationship VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  address TEXT,
  is_foreign BOOLEAN DEFAULT FALSE,
  iprs_validated BOOLEAN DEFAULT FALSE,
  validation_timestamp TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  INDEX idx_parent_national_id (national_id),
  INDEX idx_parent_phone (phone_number)
);

-- Create table for foreign learner details
CREATE TABLE foreign_learner_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  passport_number VARCHAR(50) NOT NULL,
  country_of_origin VARCHAR(50) NOT NULL,
  visa_type VARCHAR(50),
  visa_expiry DATE,
  entry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  UNIQUE KEY (passport_number)
);

-- Learner Progress
CREATE TABLE learner_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  academic_year VARCHAR(10) NOT NULL,
  term VARCHAR(20) NOT NULL,
  grade VARCHAR(20) NOT NULL,
  subjects JSON, -- Stores subject grades {subject: string, marks: decimal, grade: string}
  overall_remarks TEXT,
  teacher_id VARCHAR(20) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);

-- Institution Applications
CREATE TABLE institution_applications (
  application_id VARCHAR(20) PRIMARY KEY,
  institution_name VARCHAR(100) NOT NULL,
  institution_type VARCHAR(50) NOT NULL,
  applicant_user_id VARCHAR(20) NOT NULL,
  documents JSON, -- {registration_cert: string, kra_pin: string, etc.}
  status ENUM('Submitted', 'Under Review', 'Approved', 'Rejected') DEFAULT 'Submitted',
  review_notes TEXT,
  reviewed_by VARCHAR(20),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (applicant_user_id) REFERENCES users(user_id),
  FOREIGN KEY (reviewed_by) REFERENCES users(user_id)
);

-- Financial Records
CREATE TABLE financial_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution_id VARCHAR(20) NOT NULL,
  record_type ENUM('Fee Payment', 'Government Funding', 'Donor Funding', 'Other Income', 'Expense') NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  reference_number VARCHAR(50),
  transaction_date DATE NOT NULL,
  recorded_by VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (recorded_by) REFERENCES users(user_id)
);

-- Procurement
CREATE TABLE procurement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution_id VARCHAR(20) NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  category ENUM('Learning Materials', 'Sanitary', 'Equipment', 'Other') NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  supplier VARCHAR(100),
  order_date DATE,
  delivery_date DATE,
  status ENUM('Requested', 'Ordered', 'Delivered', 'Cancelled') DEFAULT 'Requested',
  ordered_by VARCHAR(20),
  received_by VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (ordered_by) REFERENCES users(user_id),
  FOREIGN KEY (received_by) REFERENCES users(user_id)
);

-- Learner Transfers
CREATE TABLE learner_transfers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learner_id VARCHAR(20) NOT NULL,
  from_institution_id VARCHAR(20) NOT NULL,
  to_institution_id VARCHAR(20) NOT NULL,
  transfer_date DATE NOT NULL,
  reason TEXT,
  initiated_by VARCHAR(20) NOT NULL,
  status ENUM('Pending', 'Approved', 'Rejected', 'Completed') DEFAULT 'Pending',
  approved_by VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(learner_id),
  FOREIGN KEY (from_institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (to_institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (initiated_by) REFERENCES users(user_id),
  FOREIGN KEY (approved_by) REFERENCES users(user_id)
);

-- Grievances
CREATE TABLE grievances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  submitted_by VARCHAR(20) NOT NULL,
  institution_id VARCHAR(20),
  status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
  assigned_to VARCHAR(20),
  resolution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  FOREIGN KEY (submitted_by) REFERENCES users(user_id),
  FOREIGN KEY (institution_id) REFERENCES institutions(institution_id),
  FOREIGN KEY (assigned_to) REFERENCES users(user_id)
);

// ========================================================================================================================

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

// middleware/roleMiddleware.js
const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};

// Usage in routes
router.get('/county-data', authenticate, checkRole(['county_admin', 'national_admin']), countyController.getData);


// CORS configuration
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

// controllers/institutionController.js
const applyForRegistration = async (req, res) => {
  try {
    const { institutionName, institutionType, documents } = req.body;
    const userId = req.user.user_id;
    
    // Generate unique institution ID
    const institutionId = `INST-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const application = await InstitutionApplication.create({
      application_id: `APP-${Date.now()}`,
      institution_name: institutionName,
      institution_type: institutionType,
      applicant_user_id: userId,
      documents,
      status: 'Submitted'
    });
    
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reviewApplication = async (req, res) => {
  try {
    const { applicationId, decision, notes } = req.body;
    const reviewerId = req.user.user_id;
    
    const application = await InstitutionApplication.findByPk(applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    if (decision === 'Approved') {
      // Create the institution
      const institution = await Institution.create({
        institution_id: `INST-${Date.now()}`,
        name: application.institution_name,
        type: application.institution_type,
        status: 'Approved',
        // other fields...
      });
      
      // Update the applicant's role
      await User.update(
        { role: 'institution_admin', institution_id: institution.institution_id },
        { where: { user_id: application.applicant_user_id } }
      );
    }
    
    application.status = decision;
    application.review_notes = notes;
    application.reviewed_by = reviewerId;
    application.reviewed_at = new Date();
    await application.save();
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/progressController.js
const recordProgress = async (req, res) => {
  try {
    const { learnerId, academicYear, term, grade, subjects, remarks } = req.body;
    const teacherId = req.user.user_id;
    
    // Verify teacher has permission for this learner
    const learner = await Learner.findByPk(learnerId);
    if (!learner || learner.institution_id !== req.user.institution_id) {
      return res.status(403).json({ message: 'Not authorized to update this learner' });
    }
    
    const progress = await LearnerProgress.create({
      learner_id: learnerId,
      academic_year: academicYear,
      term: term,
      grade: grade,
      subjects: subjects,
      overall_remarks: remarks,
      teacher_id: teacherId
    });
    
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// controllers/financialController.js
const getFinancialReports = async (req, res) => {
  try {
    let queryOptions = {};
    const userRole = req.user.role;
    const institutionId = req.user.institution_id;
    
    // Apply filters based on role
    if (userRole === 'institution_admin' || userRole === 'institution_staff') {
      queryOptions.where = { institution_id: institutionId };
    } else if (userRole === 'county_admin') {
      // Get all institutions in the county
      const institutions = await Institution.findAll({ 
        where: { county_id: req.user.county_id },
        attributes: ['institution_id']
      });
      queryOptions.where = { 
        institution_id: institutions.map(i => i.institution_id)
      };
    }
    
    // Date filters if provided
    if (req.query.startDate && req.query.endDate) {
      queryOptions.where = {
        ...queryOptions.where,
        transaction_date: {
          [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)]
        }
      };
    }
    
    const records = await FinancialRecord.findAll(queryOptions);
    
    // Generate summary report
    const summary = records.reduce((acc, record) => {
      if (!acc[record.record_type]) {
        acc[record.record_type] = 0;
      }
      acc[record.record_type] += record.amount;
      return acc;
    }, {});
    
    res.json({
      records,
      summary,
      totalRecords: records.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/publicController.js
const searchLearner = async (req, res) => {
  try {
    const { upiNumber, birthCertificateNumber, institutionId, secretCode } = req.body;
    
    // Verify the secret code is valid for this learner/institution
    const validAccess = await verifySearchAccess(
      upiNumber, 
      birthCertificateNumber, 
      institutionId, 
      secretCode
    );
    
    if (!validAccess) {
      return res.status(403).json({ message: 'Invalid search credentials' });
    }
    
    const learner = await Learner.findOne({
      where: { 
        [Op.or]: [
          { upi_number: upiNumber },
          { national_id: birthCertificateNumber }
        ],
        institution_id: institutionId
      },
      include: [
        {
          model: Institution,
          attributes: ['name', 'type']
        },
        {
          model: LearnerProgress,
          order: [['academic_year', 'DESC'], ['term', 'DESC']],
          limit: 5
        }
      ]
    });
    
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }
    
    res.json(learner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
