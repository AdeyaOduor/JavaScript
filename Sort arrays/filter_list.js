//function taking a list of non-negative integers,strings and returns a new list with the strings filtered out.
function filter_list(l) {
    // Return a new array with the strings filtered out
    var filt = l.filter(function(x) {
      if (typeof(x) === 'number')
        return x;
    });
    return filt;
  }
console.log(filter_list([1, 2, 2, 3, 4, 4, 5]));  /*[ 1, 2, 2, 3, 4, 4, 5]*/

// 1. Data Cleaning in Analytics

// When analyzing datasets, it’s common to encounter mixed data types. Filtering out non-numeric values ensures that only valid numbers are processed.

// Example 1:
const data = [1, 'apple', 2, 'banana', 3, null, 4];
const numericData = filter_list(data);

function filter_list(l) {
    // Return a new array with the strings filtered out
    var filt = l.filter(function(x) {
      if (typeof(x) === 'number')
        return x;
    });
    return filt;
  }
  
console.log(numericData);// Output: [1, 2, 3, 4]

// Example 2:
const surveyResponses = [5, 'not answered', 4, 'skip', 3, 2];
const validResponses = filter_list(surveyResponses);
// Use validResponses to create a bar chart
console.log(validResponses); // Output: [5, 4, 3, 2]

// 2. User Input Validation

// In applications that accept user input, you may want to filter out invalid inputs (e.g., strings, special characters) before performing calculations or storing data.

// Example:
const userInput = [10, 'hello', 20, 'world', 30];
const validNumbers = filter_list(userInput);
console.log(validNumbers); // Output: [10, 20, 30]

// 3. Processing Financial Transactions

// When handling financial transactions, you might receive a list of amounts that may include erroneous entries. Filtering helps in keeping only valid transaction amounts for processing.

// Example:
const transactions = [100, 'error', 250, null, 300];
const validTransactions = filter_list(transactions);
console.log(validTransactions); // Output: [100, 250, 300]

// 4. Generating Statistics

// When computing statistics like averages or sums, you need to ensure that only numeric values are included in the calculations.

// Example:
const scores = [85, 'N/A', 90, 78, 'missing', 88];
const validScores = filter_list(scores);
const averageScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;
console.log(averageScore); // Output: 85.25

// 5. Filtering Sensor Data

// In IoT applications, sensor readings might be mixed with error messages or invalid data points. Filtering these out ensures that only valid readings are analyzed.

// Example:
const sensorReadings = [23.5, 'error', 24.1, 25.0, 'offline', 22.9];
const validReadings = filter_list(sensorReadings);
console.log(validReadings); // Output: [23.5, 24.1, 25.0, 22.9]

// 6. Preparing Data for Machine Learning

// In machine learning preprocessing, it’s important to filter out non-numeric features from the dataset to ensure that only relevant numerical data is used for model training.

// Example:
const dataset = [3.5, 'string', 2.1, 'text', 4.8];
const filteredDataset = filter_list(dataset);
// Use filteredDataset for training a model
console.log(filteredDataset); // Output: [3.5, 2.1, 4.8]


// -------------------------------------------------------------------------------------------------------------
// find first non consecutive number in an array
function firstNonConsecutive (arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] + 1 !== arr[i]) return arr[i];
    }
    return null;
}
console.log(firstNonConsecutive([1, 2, 2, 3, 4, 4, 5])); //2
// ------------------------------------------------------------------------------------------------------------
// Split a String into an Array Using the split Method
function splitify(str) {
  
  return str.split(/\W/);
  
}

console.log(splitify("Hello World,I-am code")); //[ 'Hello', 'World', 'I', 'am', 'code' ]
