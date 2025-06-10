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
const { mean, median, mode, quantile } = require('mathjs');

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
  // Data Cleaning: Remove duplicates
  const uniqueData = Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse);

  // Data Cleaning: Handle missing values by removing rows with missing 'value' column
  const cleanedData = uniqueData.filter(row => row.value !== undefined && row.value !== '');

  // Convert values to numbers and normalize
  const normalizedData = cleanedData.map(row => ({
    value: parseFloat(row.value) || 0 // Convert to float and default to 0 if NaN
  })).filter(row => !isNaN(row.value)); // Filter out any rows that resulted in NaN

  // Outlier Removal using IQR
  const values = normalizedData.map(row => row.value);
  const Q1 = quantile(values, 0.25);
  const Q3 = quantile(values, 0.75);
  const IQR = Q3 - Q1;

  const outlierRemovedData = normalizedData.filter(row => 
    row.value >= (Q1 - 1.5 * IQR) && row.value <= (Q3 + 1.5 * IQR)
  );

  // Feature Engineering: Create new features (e.g., square of the value)
  const featureEnhancedData = outlierRemovedData.map(row => ({
    ...row,
    valueSquared: row.value ** 2 // New feature
  }));

  // Aggregation: Group by value range
  const aggregatedData = featureEnhancedData.reduce((acc, row) => {
    const range = `${Math.floor(row.value / 10) * 10}-${Math.ceil(row.value / 10) * 10}`;
    if (!acc[range]) {
      acc[range] = { count: 0, total: 0 };
    }
    acc[range].count += 1;
    acc[range].total += row.value;
    return acc;
  }, {});

  // Convert aggregated data to an array
  const aggregatedArray = Object.entries(aggregatedData).map(([range, { count, total }]) => ({
    range,
    average: total / count,
    count
  }));

  return aggregatedArray;
}

// Function to perform statistics
function performStatistics(data) {
  const values = data.map(row => row.average);
  const avg = mean(values);
  const med = median(values);
  const mod = mode(values);

  console.log(`Overall Mean: ${avg}`);
  console.log(`Overall Median: ${med}`);
  console.log(`Overall Mode: ${mod}`);
}

/*
Create a sample CSV file named data.csv in the same directory:
Execute the ETL script using Node.js:
bash
node etl.js

For visualization, you can use a simple Express server to serve a webpage with Chart.js. Create a file named server.js:
*/

// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

app.get('/data', (req, res) => {
  const data = fs.readFileSync('output.json');
  res.json(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Create a directory named public and inside it, create an index.html file:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Visualization</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Data Visualization</h1>
    <canvas id="myChart" width="400" height="200"></canvas>
    <script>
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(row => row.value);
                const ctx = document.getElementById('myChart').getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Values',
                            data: labels,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            });
    </script>
</body>
</html>

/*
Start the Express server:
bash
node server.js
*/
