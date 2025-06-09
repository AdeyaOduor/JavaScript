/*
Create a new directory for your project:
bash
mkdir etl-csv
cd etl-csv

Initialize a new Node.js project:
bash
npm init -y

Install required packages:
bash
npm install csv-parser fs mathjs express
*/
// etl.js
const fs = require('fs');
const csv = require('csv-parser');
const { mean, median, mode } = require('mathjs');

const inputFile = 'data.csv'; // Path to your input CSV file
const outputFile = 'output.json'; // Path to your output JSON file
const data = [];

// Step 1: Extract
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');

    // Step 2: Transform
    const transformedData = transformData(data);
    
    // Step 3: Load
    fs.writeFileSync(outputFile, JSON.stringify(transformedData, null, 2));
    console.log('Transformed data saved to output.json');

    // Perform statistical computations
    performStatistics(transformedData);
  });

// Function to transform data
function transformData(data) {
  return data.map(row => ({
    // Assuming your CSV has 'value' column for stats
    value: parseFloat(row.value) || 0
  }));
}

// Function to perform statistics
function performStatistics(data) {
  const values = data.map(row => row.value);
  const avg = mean(values);
  const med = median(values);
  const mod = mode(values);

  console.log(`Mean: ${avg}`);
  console.log(`Median: ${med}`);
  console.log(`Mode: ${mod}`);
}
