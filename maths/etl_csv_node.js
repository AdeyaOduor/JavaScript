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
    const transformedData = transformData(data, ['value', 'category']); // Specify columns to transform
    
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

Explanations
    Column Selection:
        The transformData function now accepts a second parameter, columns, which is an array of column names to focus on (e.g., ['value', 'category']).
        During data processing, the script only considers these specified columns for transformation and analysis.

    Data Cleaning:
        Rows are filtered based on the presence of values in the specified columns.

    Transformation:
        Each specified column is processed, converted to a float, and stored in the transformed row.

    Aggregation:
        The aggregation step groups data by the specified categorical column (e.g., category), calculating the average and count for each category.

*/

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV Data Processor</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        header {
            background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            padding: 30px;
        }
        
        .card {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #e1e5eb;
        }
        
        .card-full {
            grid-column: 1 / -1;
        }
        
        h2 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: #4b6cb7;
            border-bottom: 2px solid #4b6cb7;
            padding-bottom: 10px;
        }
        
        .upload-section {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .file-input {
            position: relative;
            overflow: hidden;
            display: inline-block;
        }
        
        .file-input input[type="file"] {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
            width: 100%;
            height: 100%;
        }
        
        .file-input-label {
            display: inline-block;
            padding: 12px 20px;
            background-color: #4b6cb7;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.3s;
        }
        
        .file-input-label:hover {
            background-color: #3a5999;
        }
        
        button {
            padding: 12px 20px;
            background-color: #4b6cb7;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #3a5999;
        }
        
        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        
        .result {
            margin-top: 15px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            font-family: monospace;
            font-size: 1rem;
            border-left: 4px solid #4b6cb7;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e1e5eb;
        }
        
        th {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #4b6cb7;
        }
        
        tr:hover {
            background-color: #f8f9fa;
        }
        
        .log-entry {
            padding: 10px;
            border-bottom: 1px solid #e1e5eb;
            font-family: monospace;
        }
        
        .log-time {
            color: #6c757d;
            margin-right: 10px;
        }
        
        .stat-card {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
        }
        
        .stat-item {
            text-align: center;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            flex: 1;
            margin: 0 5px;
        }
        
        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #4b6cb7;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #6c757d;
        }
        
        .visualization {
            height: 200px;
            margin-top: 20px;
            background-color: #f8f9fa;
            border-radius: 5px;
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            padding: 10px;
        }
        
        .bar {
            width: 40px;
            background-color: #4b6cb7;
            margin: 0 5px;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            position: relative;
        }
        
        .bar-label {
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .stat-card {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>CSV Data Processor</h1>
            <p class="subtitle">Upload, process, and analyze CSV data with statistical computations</p>
        </header>
        
        <div class="main-content">
            <div class="card">
                <h2>Upload CSV File</h2>
                <div class="upload-section">
                    <div class="file-input">
                        <label for="csvFile" class="file-input-label">Choose CSV File</label>
                        <input type="file" id="csvFile" accept=".csv">
                    </div>
                    <div id="fileName">No file chosen</div>
                    <button id="processBtn" disabled>Process Data</button>
                </div>
                
                <div class="result" id="uploadResult">
                    Please select a CSV file to process. The file should have a header row with columns named "value" and "category".
                </div>
            </div>
            
            <div class="card">
                <h2>Data Statistics</h2>
                <div id="statsContainer">
                    <div class="stat-card">
                        <div class="stat-item">
                            <div class="stat-value" id="meanValue">-</div>
                            <div class="stat-label">Mean</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="medianValue">-</div>
                            <div class="stat-label">Median</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="modeValue">-</div>
                            <div class="stat-label">Mode</div>
                        </div>
                    </div>
                    
                    <div class="visualization" id="visualization">
                        <div class="bar" style="height: 40%;">
                            <span class="bar-label">Q1</span>
                        </div>
                        <div class="bar" style="height: 60%;">
                            <span class="bar-label">Q2</span>
                        </div>
                        <div class="bar" style="height: 80%;">
                            <span class="bar-label">Q3</span>
                        </div>
                        <div class="bar" style="height: 70%;">
                            <span class="bar-label">Q4</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h2>Processed Data</h2>
                <div id="processedData">
                    <table>
                        <thead>
                            <tr>
                                <th>Range</th>
                                <th>Average</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody id="dataTable">
                            <!-- Will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="card">
                <h2>Processing Log</h2>
                <div id="activityLog">
                    <div class="log-entry"><span class="log-time">[System]</span> Ready to process CSV data</div>
                </div>
            </div>
            
            <div class="card card-full">
                <h2>How It Works</h2>
                <p>This application demonstrates the ETL (Extract, Transform, Load) process:</p>
                <ol>
                    <li><strong>Extract</strong>: Read CSV data from the uploaded file</li>
                    <li><strong>Transform</strong>: Clean data, remove outliers, and create new features</li>
                    <li><strong>Load</strong>: Output the processed data and compute statistics</li>
                </ol>
                <p>The transformation process includes:</p>
                <ul>
                    <li>Removing duplicate entries</li>
                    <li>Handling missing values</li>
                    <li>Outlier removal using Interquartile Range (IQR)</li>
                    <li>Feature engineering (value squared)</li>
                    <li>Data aggregation by value ranges</li>
                </ul>
            </div>
        </div>
    </div>

    <script>
        // DOM elements
        const csvFileInput = document.getElementById('csvFile');
        const processBtn = document.getElementById('processBtn');
        const fileNameDiv = document.getElementById('fileName');
        const uploadResultDiv = document.getElementById('uploadResult');
        const dataTableBody = document.getElementById('dataTable');
        const activityLog = document.getElementById('activityLog');
        const meanValue = document.getElementById('meanValue');
        const medianValue = document.getElementById('medianValue');
        const modeValue = document.getElementById('modeValue');

        // Event listeners
        csvFileInput.addEventListener('change', handleFileSelect);
        processBtn.addEventListener('click', processData);

        // Handle file selection
        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                fileNameDiv.textContent = file.name;
                processBtn.disabled = false;
                addLogEntry(`File selected: ${file.name}`);
            } else {
                fileNameDiv.textContent = 'No file chosen';
                processBtn.disabled = true;
            }
        }

        // Process the CSV data
        function processData() {
            const file = csvFileInput.files[0];
            if (!file) return;

            addLogEntry('Starting CSV processing...');
            uploadResultDiv.textContent = 'Processing CSV file...';

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const csvData = e.target.result;
                    const data = parseCSV(csvData);
                    
                    // Transform data
                    const transformedData = transformData(data);
                    
                    // Display results
                    displayResults(transformedData);
                    
                    // Perform statistics
                    performStatistics(transformedData);
                    
                    uploadResultDiv.textContent = 'CSV file successfully processed.';
                    addLogEntry('CSV processing completed successfully.');
                } catch (error) {
                    uploadResultDiv.textContent = `Error: ${error.message}`;
                    addLogEntry(`Error: ${error.message}`);
                    console.error(error);
                }
            };
            reader.readAsText(file);
        }

        // Parse CSV data
        function parseCSV(csvData) {
            const lines = csvData.split('\n');
            const headers = lines[0].split(',').map(header => header.trim());
            
            // Check if required columns exist
            if (!headers.includes('value')) {
                throw new Error('CSV file must contain a "value" column');
            }
            
            const data = [];
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '') continue;
                
                const values = lines[i].split(',').map(value => value.trim());
                const row = {};
                
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                
                data.push(row);
            }
            
            addLogEntry(`Parsed ${data.length} rows from CSV`);
            return data;
        }

        // Transform data (simplified version of the original function)
        function transformData(data) {
            // Data Cleaning: Remove duplicates
            const uniqueData = Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse);
            addLogEntry(`Removed ${data.length - uniqueData.length} duplicate rows`);

            // Data Cleaning: Handle missing values by removing rows with missing 'value' column
            const cleanedData = uniqueData.filter(row => row.value !== undefined && row.value !== '');
            addLogEntry(`Removed ${uniqueData.length - cleanedData.length} rows with missing values`);

            // Convert values to numbers
            const numericData = cleanedData.map(row => ({
                value: parseFloat(row.value) || 0
            })).filter(row => !isNaN(row.value));
            
            addLogEntry(`Converted values to numbers, ${numericData.length} rows remaining`);

            // Outlier Removal using IQR (simplified)
            const values = numericData.map(row => row.value).sort((a, b) => a - b);
            const Q1 = values[Math.floor(values.length * 0.25)];
            const Q3 = values[Math.floor(values.length * 0.75)];
            const IQR = Q3 - Q1;
            
            const outlierRemovedData = numericData.filter(row => 
                row.value >= (Q1 - 1.5 * IQR) && row.value <= (Q3 + 1.5 * IQR)
            );
            
            addLogEntry(`Removed ${numericData.length - outlierRemovedData.length} outliers using IQR`);

            // Feature Engineering: Create new features
            const featureEnhancedData = outlierRemovedData.map(row => ({
                value: row.value,
                valueSquared: row.value ** 2
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

            addLogEntry(`Aggregated data into ${aggregatedArray.length} ranges`);
            return aggregatedArray;
        }

        // Display results in table
        function displayResults(data) {
            dataTableBody.innerHTML = '';
            
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.range}</td>
                    <td>${row.average.toFixed(2)}</td>
                    <td>${row.count}</td>
                `;
                dataTableBody.appendChild(tr);
            });
        }

        // Perform statistics
        function performStatistics(data) {
            const values = data.map(row => row.average);
            
            // Calculate mean
            const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
            
            // Calculate median
            const sortedValues = [...values].sort((a, b) => a - b);
            const mid = Math.floor(sortedValues.length / 2);
            const median = sortedValues.length % 2 !== 0 
                ? sortedValues[mid] 
                : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
            
            // Calculate mode
            const frequencyMap = {};
            let maxFreq = 0;
            let mode = null;
            
            values.forEach(val => {
                frequencyMap[val] = (frequencyMap[val] || 0) + 1;
                if (frequencyMap[val] > maxFreq) {
                    maxFreq = frequencyMap[val];
                    mode = val;
                }
            });
            
            // Update UI
            meanValue.textContent = mean.toFixed(2);
            medianValue.textContent = median.toFixed(2);
            modeValue.textContent = mode.toFixed(2);
            
            addLogEntry(`Statistics computed: Mean=${mean.toFixed(2)}, Median=${median.toFixed(2)}, Mode=${mode.toFixed(2)}`);
            
            // Update visualization
            updateVisualization(data);
        }

        // Update visualization
        function updateVisualization(data) {
            const visualization = document.getElementById('visualization');
            visualization.innerHTML = '';
            
            // Show up to 6 ranges in the visualization
            const displayData = data.slice(0, 6);
            const maxAverage = Math.max(...displayData.map(d => d.average));
            
            displayData.forEach(item => {
                const height = (item.average / maxAverage) * 100;
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = `${height}%`;
                
                const label = document.createElement('span');
                label.className = 'bar-label';
                label.textContent = item.range;
                
                bar.appendChild(label);
                visualization.appendChild(bar);
            });
        }

        // Add log entry
        function addLogEntry(message) {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            
            logEntry.innerHTML = `<span class="log-time">[${timeString}]</span> ${message}`;
            activityLog.appendChild(logEntry);
            activityLog.scrollTop = activityLog.scrollHeight;
        }

        // Generate sample data for demonstration
        function generateSampleData() {
            let csvContent = 'value,category\n';
            for (let i = 0; i < 100; i++) {
                const value = (Math.random() * 100).toFixed(2);
                const category = ['A', 'B', 'C'][Math.floor(Math.random() * 3)];
                csvContent += `${value},${category}\n`;
            }
            return csvContent;
        }

        // Initialize with sample data
        window.onload = function() {
            const sampleData = generateSampleData();
            const blob = new Blob([sampleData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            
            // Create a download link for sample data
            const sampleLink = document.createElement('a');
            sampleLink.href = url;
            sampleLink.download = 'sample_data.csv';
            sampleLink.textContent = 'Download sample CSV file';
            sampleLink.style.display = 'block';
            sampleLink.style.marginTop = '15px';
            sampleLink.style.textAlign = 'center';
            
            uploadResultDiv.appendChild(sampleLink);
        };
    </script>
</body>
</html>
