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

// Example:
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

// 2. User Input Validation

// In applications that accept user input, you may want to filter out invalid inputs (e.g., strings, special characters) before performing calculations or storing data.

// Example:
const userInput = [10, 'hello', 20, 'world', 30];
const validNumbers = filter_list(userInput);
console.log(validNumbers); // Output: [10, 20, 30]

// 3. Processing Financial Transactions

// When handling financial transactions, you might receive a list of amounts that may include erroneous entries. Filtering helps in keeping only valid transaction amounts for processing.

// Example:
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
