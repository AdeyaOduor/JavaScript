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
