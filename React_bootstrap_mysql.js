/*
npx create-react-app budget-tracker
cd budget-tracker
npm install axios react-bootstrap bootstrap mysql2 sequelize
Include Bootstrap in your project. Modify src/index.js:

import 'bootstrap/dist/css/bootstrap.min.css';

In the root of your project, create a folder named backend. Inside, create a file named db.js 
for database configuration using Sequelize:
*/

// backend/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
