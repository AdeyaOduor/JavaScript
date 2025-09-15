/* program to convert a comma-separated values (CSV) string to a 2D array
1. Function Definition
    const csv_to_array: This declares a constant variable csv_to_array and assigns it a function.
    Parameters:
        data: A string containing CSV data.
        delimiter: A string that specifies the character used to separate values in the CSV (default is a comma ,).
        omitFirstRow: A boolean that indicates whether to skip the first row (often used for headers).

2. Function Logic
    slice Method:
        This method is used to remove the first row from the data if omitFirstRow is true. It uses data.indexOf('\n') 
        to find the position of the first newline character and slices the string from there onward.
        If omitFirstRow is false, it starts from the beginning of the string.

    split('\n'):
        After slicing, the data is split into an array of rows based on the newline character.

    map(v => v.split(delimiter)):
        Finally, for each row, it splits the row into individual values (columns) based on the specified delimiter, resulting 
        in a two-dimensional array where each inner array represents a row of data.
*/
const csv_to_array = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0) // Remove the first row if specified
    .split('\n') // Split the data into rows
    .map(v => v.split(delimiter)); // Split each row into columns


const salesData = csv_to_array(fetchCSVData('sales_data.csv'), ',', true);
const stockPriceData = csv_to_array(fetchCSVData('stock_prices.csv'), ',', true);
// Perform data transformations on the parsed data
const transformedData = sourceData.map(row => transformRow(row));
// Analyze the sales data and generate visualizations

// Assuming the CSV data is submitted through a form
const csvData = document.getElementById('csv-upload').value;
const parsedData = csv_to_array(csvData, ',', true);

/*
Store the parsed data in the application's database
Load the transformed data into a database
Visualize the stock price data in a custom charting application*/ 
// ---------------------------------------------------------------------------------------

  // Extract the CSV data
const rawSalesData = fetchCSVData('sales_data.csv');

// Parse the CSV data into a nested array
const salesData = csv_to_array(rawSalesData, ',', true);

// Transform the data
const transformedSalesData = salesData.map(row => {
  return {
    productId: parseInt(row[0]),
    productName: row[1],
    quantity: parseInt(row[2]),
    price: parseFloat(row[3]),
    date: new Date(row[4])
  };
});

// Load the transformed data into a database
saveDataToDatabase(transformedSalesData);

// ====================================================================================================
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV Data Processor with SQL Integration</title>
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
        
        .sql-query {
            width: 100%;
            height: 100px;
            padding: 10px;
            border: 1px solid #e1e5eb;
            border-radius: 5px;
            font-family: monospace;
            margin-bottom: 10px;
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
            <h1>CSV Data Processor with SQL Integration</h1>
            <p class="subtitle">Upload, process, and analyze CSV data with SQL database integration</p>
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
                    Please select a CSV file to process. The file should have a header row.
                </div>
            </div>
            
            <div class="card">
                <h2>SQL Query Interface</h2>
                <textarea class="sql-query" id="sqlQuery" placeholder="SELECT * FROM sales_data WHERE quantity > 10">SELECT * FROM sales_data</textarea>
                <button id="runQueryBtn">Run Query</button>
                <div class="result" id="queryResult">
                    Query results will appear here
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
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody id="dataTable">
                            <!-- Will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="card">
                <h2>Database Operations</h2>
                <div class="upload-section">
                    <button id="createTableBtn">Create Table</button>
                    <button id="insertDataBtn">Insert Data</button>
                    <button id="clearDataBtn">Clear Data</button>
                </div>
                <div class="result" id="dbResult">
                    Database operations will be shown here
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
                <p>This application demonstrates the ETL (Extract, Transform, Load) process with SQL database integration:</p>
                <ol>
                    <li><strong>Extract</strong>: Read CSV data from the uploaded file</li>
                    <li><strong>Transform</strong>: Clean data, remove outliers, and create new features</li>
                    <li><strong>Load</strong>: Store the processed data in a SQL database</li>
                </ol>
                <p>The application simulates SQL database operations using browser storage:</p>
                <ul>
                    <li>Create table structure based on CSV headers</li>
                    <li>Insert transformed data into the database</li>
                    <li>Execute SQL queries on the stored data</li>
                    <li>Visualize query results</li>
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
        const createTableBtn = document.getElementById('createTableBtn');
        const insertDataBtn = document.getElementById('insertDataBtn');
        const clearDataBtn = document.getElementById('clearDataBtn');
        const runQueryBtn = document.getElementById('runQueryBtn');
        const sqlQuery = document.getElementById('sqlQuery');
        const queryResult = document.getElementById('queryResult');
        const dbResult = document.getElementById('dbResult');

        // Database simulation
        let database = {
            tables: {},
            data: {}
        };

        // Event listeners
        csvFileInput.addEventListener('change', handleFileSelect);
        processBtn.addEventListener('click', processData);
        createTableBtn.addEventListener('click', createTable);
        insertDataBtn.addEventListener('click', insertData);
        clearDataBtn.addEventListener('click', clearData);
        runQueryBtn.addEventListener('click', runQuery);

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

        // Transform data
        function transformData(data) {
            // Data Cleaning: Remove duplicates
            const uniqueData = Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse);
            addLogEntry(`Removed ${data.length - uniqueData.length} duplicate rows`);

            // Data Cleaning: Handle missing values
            const cleanedData = uniqueData.filter(row => {
                return Object.values(row).some(value => value !== undefined && value !== '');
            });
            addLogEntry(`Removed ${uniqueData.length - cleanedData.length} rows with missing values`);

            // Convert values to appropriate types
            const transformedData = cleanedData.map(row => {
                const transformedRow = {};
                
                for (const key in row) {
                    if (key.toLowerCase().includes('date')) {
                        transformedRow[key] = new Date(row[key]);
                    } else if (key.toLowerCase().includes('price') || key.toLowerCase().includes('amount')) {
                        transformedRow[key] = parseFloat(row[key]) || 0;
                    } else if (key.toLowerCase().includes('quantity') || key.toLowerCase().includes('id')) {
                        transformedRow[key] = parseInt(row[key]) || 0;
                    } else {
                        transformedRow[key] = row[key];
                    }
                }
                
                return transformedRow;
            });
            
            addLogEntry(`Transformed data types for ${transformedData.length} rows`);
            return transformedData;
        }

        // Display results in table
        function displayResults(data) {
            dataTableBody.innerHTML = '';
            
            // Show first 5 rows only for display
            const displayData = data.slice(0, 5);
            
            if (displayData.length === 0) {
                dataTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No data to display</td></tr>';
                return;
            }
            
            const headers = Object.keys(displayData[0]);
            
            // Update table headers
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            dataTableBody.appendChild(headerRow);
            
            // Add data rows
            displayData.forEach(row => {
                const tr = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header];
                    tr.appendChild(td);
                });
                dataTableBody.appendChild(tr);
            });
            
            if (data.length > 5) {
                const moreRow = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = headers.length;
                td.style.textAlign = 'center';
                td.textContent = `... and ${data.length - 5} more rows`;
                moreRow.appendChild(td);
                dataTableBody.appendChild(moreRow);
            }
        }

        // Perform statistics
        function performStatistics(data) {
            // Find numeric columns
            const numericColumns = {};
            
            if (data.length > 0) {
                Object.keys(data[0]).forEach(key => {
                    if (typeof data[0][key] === 'number') {
                        numericColumns[key] = data.map(row => row[key]);
                    }
                });
            }
            
            // Calculate statistics for the first numeric column
            const firstNumericKey = Object.keys(numericColumns)[0];
            if (firstNumericKey) {
                const values = numericColumns[firstNumericKey];
                
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
                let modeVal = null;
                
                values.forEach(val => {
                    frequencyMap[val] = (frequencyMap[val] || 0) + 1;
                    if (frequencyMap[val] > maxFreq) {
                        maxFreq = frequencyMap[val];
                        modeVal = val;
                    }
                });
                
                // Update UI
                meanValue.textContent = mean.toFixed(2);
                medianValue.textContent = median.toFixed(2);
                modeValue.textContent = modeVal.toFixed(2);
                
                addLogEntry(`Statistics computed for ${firstNumericKey}: Mean=${mean.toFixed(2)}, Median=${median.toFixed(2)}, Mode=${modeVal.toFixed(2)}`);
                
                // Update visualization
                updateVisualization(values);
            }
        }

        // Update visualization
        function updateVisualization(values) {
            const visualization = document.getElementById('visualization');
            visualization.innerHTML = '';
            
            // Create quartiles for visualization
            const sortedValues = [...values].sort((a, b) => a - b);
            const quartileSize = Math.floor(sortedValues.length / 4);
            
            for (let i = 0; i < 4; i++) {
                const start = i * quartileSize;
                const end = (i + 1) * quartileSize;
                const quartileValues = sortedValues.slice(start, end);
                const quartileAvg = quartileValues.reduce((sum, val) => sum + val, 0) / quartileValues.length;
                
                const maxValue = Math.max(...sortedValues);
                const height = (quartileAvg / maxValue) * 100;
                
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = `${height}%`;
                
                const label = document.createElement('span');
                label.className = 'bar-label';
                label.textContent = `Q${i+1}`;
                
                bar.appendChild(label);
                visualization.appendChild(bar);
            }
        }

        // Database operations
        function createTable() {
            const file = csvFileInput.files[0];
            if (!file) {
                dbResult.textContent = 'Please upload a CSV file first';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const csvData = e.target.result;
                    const lines = csvData.split('\n');
                    const headers = lines[0].split(',').map(header => header.trim());
                    
                    // Create table structure
                    database.tables.sales_data = {
                        columns: headers.reduce((acc, header) => {
                            acc[header] = 'TEXT'; // Simple type assignment
                            return acc;
                        }, {})
                    };
                    
                    dbResult.textContent = `Table 'sales_data' created with columns: ${headers.join(', ')}`;
                    addLogEntry(`SQL: CREATE TABLE sales_data (${headers.join(' TEXT, ')} TEXT)`);
                } catch (error) {
                    dbResult.textContent = `Error: ${error.message}`;
                    addLogEntry(`Error: ${error.message}`);
                }
            };
            reader.readAsText(file);
        }

        function insertData() {
            if (!database.tables.sales_data) {
                dbResult.textContent = 'Please create a table first';
                return;
            }

            const file = csvFileInput.files[0];
            if (!file) {
                dbResult.textContent = 'Please upload a CSV file first';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const csvData = e.target.result;
                    const data = parseCSV(csvData);
                    const transformedData = transformData(data);
                    
                    // Store data in database
                    database.data.sales_data = transformedData;
                    
                    dbResult.textContent = `Inserted ${transformedData.length} rows into 'sales_data' table`;
                    addLogEntry(`SQL: INSERT INTO sales_data VALUES (...) - ${transformedData.length} rows affected`);
                } catch (error) {
                    dbResult.textContent = `Error: ${error.message}`;
                    addLogEntry(`Error: ${error.message}`);
                }
            };
            reader.readAsText(file);
        }

        function clearData() {
            database.data.sales_data = [];
            dbResult.textContent = 'All data cleared from sales_data table';
            addLogEntry('SQL: DELETE FROM sales_data - All data cleared');
        }

        function runQuery() {
            if (!database.data.sales_data || database.data.sales_data.length === 0) {
                queryResult.textContent = 'No data available. Please insert data first.';
                return;
            }

            const query = sqlQuery.value.trim();
            addLogEntry(`SQL Query: ${query}`);
            
            // Simple query parsing simulation
            if (query.toUpperCase().startsWith('SELECT')) {
                // Very basic SELECT query simulation
                let results = [...database.data.sales_data];
                
                // Simple WHERE clause simulation
                if (query.toUpperCase().includes('WHERE')) {
                    const whereClause = query.split('WHERE')[1].trim();
                    
                    if (whereClause.includes('>')) {
                        const [column, value] = whereClause.split('>').map(part => part.trim());
                        results = results.filter(row => row[column] > parseFloat(value));
                    } else if (whereClause.includes('<')) {
                        const [column, value] = whereClause.split('<').map(part => part.trim());
                        results = results.filter(row => row[column] < parseFloat(value));
                    } else if (whereClause.includes('=')) {
                        const [column, value] = whereClause.split('=').map(part => part.trim());
                        results = results.filter(row => row[column] == value);
                    }
                }
                
                queryResult.textContent = `Query returned ${results.length} rows`;
                displayResults(results);
            } else {
                queryResult.textContent = 'Only SELECT queries are supported in this simulation';
            }
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
            let csvContent = 'product_id,product_name,quantity,price,date\n';
            for (let i = 0; i < 20; i++) {
                const productId = i + 1;
                const productName = ['Widget', 'Gadget', 'Tool', 'Device'][Math.floor(Math.random() * 4)] + ' ' + (i + 1);
                const quantity = Math.floor(Math.random() * 100) + 1;
                const price = (Math.random() * 100).toFixed(2);
                const date = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                csvContent += `${productId},${productName},${quantity},${price},${date}\n`;
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
            sampleLink.download = 'sales_data.csv';
            sampleLink.textContent = 'Download sample CSV file';
            sampleLink.style.display = 'block';
            sampleLink.style.marginTop = '15px';
            sampleLink.style.textAlign = 'center';
            
            uploadResultDiv.appendChild(sampleLink);
        };
    </script>
</body>
</html>
