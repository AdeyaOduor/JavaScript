// implement a difference function which subtracts one list from another and returns the result
function array_diff(a, b) {
  return a.filter(function(x) { return b.indexOf(x) == -1; });
}

console.log(array_diff([1, 2], [1]));  // Output: [2]
console.log(array_diff([3, 4], [3]));  // Output: [4]
// -----------------------------------------------------------------------------------------------------------------------------------
/*Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, 
return the symmetric difference of the two arrays. diffArray function takes two arrays as input and returns an array containing 
the elements that are unique to each input array. */
function diffArray(arr1, arr2) {
  return [...diff(arr1, arr2), ...diff(arr2, arr1)];

  function diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1);
  }
}
const array1 = [1, 2, 3, 5];
const array2 = [1, 2, 3, 4, 6];
console.log(diffArray(array1, array2));
// Output: [4, 5, 6] in data comparison and synchronization

/*
Real-World Application: Inventory Management

Imagine you are managing inventory for a retail store and you want to find out which items are unique to each of two suppliers' lists.

    Supplier A's Inventory:
        array1: [101, 102, 103, 105] (IDs of items supplied by Supplier A)

    Supplier B's Inventory:
        array2: [101, 102, 103, 104, 106] (IDs of items supplied by Supplier B)

    Using diffArray:
        You want to identify items that are unique to each supplier, which helps you understand what additional products you might need to source from either supplier.
*/
const supplierA = [101, 102, 103, 105];
const supplierB = [101, 102, 103, 104, 106];
const uniqueItems = diffArray(supplierA, supplierB);
console.log(uniqueItems); // Output: [105, 104, 106]


const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(diffArray(array1, array2));
// Output: [1, 2, 6, 7] in filtering and transformation

console.log(array1.filter(item => array2.includes(item)));
// Output: [3, 4, 5] in filtering and transformation
// --------------------------------------------------------------------------------------------------------------------------------------
/*destroyer function is designed to remove specified values from an array. 
It takes an array as its first argument and any number of additional values to remove.
*/
function destroyer(arr, ...valsToRemove) {
  return arr.filter(elem => !valsToRemove.includes(elem));
}
const result = destroyer([1, 2, 3, 1, 2, 3], 2, 3);
console.log(result); // Output: [1, 1]

/*
Real-World Application: Cleaning Up User Input

Imagine you have a list of items that a user has selected, and you want to remove certain unwanted items (like banned items) from their 
selection before processing it further.
Example Scenario

    User's Selected Items:
        arr: ["apple", "banana", "orange", "grape", "banana"]

    Items to Remove:
        valsToRemove: ["banana", "grape"]

    Using destroyer:
        You can use the function to clean the user's selection by removing the unwanted items.
*/

const userSelection = ["apple", "banana", "orange", "grape", "banana"];
const cleanedSelection = destroyer(userSelection, "banana", "grape");
console.log(cleanedSelection); // Output: ["apple", "orange"]
// ---------------------------------------------------------------------------------------------------------------------------------------
/*an algorithm that will take an array for the first argument and return an array with all the 
objects that matches all the properties and values in the Object passed as second parameter.

Applied where you need to filter or search through a collection of objects based on specific criteria in effective data processing .*/
function whatIsInAName(collection, source) {
  const sourceKeys = Object.keys(source);

  return collection
    .filter(obj => sourceKeys
      .every(key => obj.hasOwnProperty(key) &&
        obj[key] === source[key]));
}

//Example Filtering and Searching in User Interfaces:
const whatIsInAName = (collection, source) => {
  const sourceKeys = Object.keys(source);
  return collection.filter(obj =>
    sourceKeys.every(key => obj.hasOwnProperty(key) && obj[key] === source[key])
  );
};

const items = [
  { id: 1, name: 'Item A', category: 'electronics', price: 9.99 },
  { id: 2, name: 'Item B', category: 'clothing', price: 19.99 },
  { id: 3, name: 'Item C', category: 'electronics', price: 14.99 },
  { id: 4, name: 'Item D', category: 'books', price: 7.99 },
];

// Filtering and searching in a UI
const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = whatIsInAName(items, { name: searchTerm });
  resultsContainer.innerHTML = '';

  filteredItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.textContent = item.name;
    resultsContainer.appendChild(itemElement);
  });
});

// =================================================================================================================================

 /*Implement the function unique_in_order which takes as argument a sequence and returns 
  a list of items without any elements with the same value next to each other and preserving the original order of elements.
*/

var uniqueInOrder=function(iterable){
 
   const result = []
  
  for(let i = 0; i < iterable.length; i++){
    if(iterable[i] !== iterable[i + 1]){
      result.push(iterable[i])
    }
  }
  
  return result
}
// ----------------------------------------------------------------------------

var uniqueInOrder=function(iterable){
    return [...iterable].filter((a, i) => a !== iterable[i-1])
}


// -------------------------------------------------------------------------------------------------------------------
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

/*
1. Data Cleaning in Analytics
When analyzing datasets, it’s common to encounter mixed data types. Filtering out non-numeric values ensures that only valid numbers are processed.
*/ 

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

/*
2. User Input Validation
In applications that accept user input, you may want to filter out invalid inputs (e.g., strings, special characters) 
before performing calculations or storing data.
*/ 

// Example:
const userInput = [10, 'hello', 20, 'world', 30];
const validNumbers = filter_list(userInput);
console.log(validNumbers); // Output: [10, 20, 30]

/*
3. Processing Financial Transactions
When handling financial transactions, you might receive a list of amounts that may include erroneous entries. 
Filtering helps in keeping only valid transaction amounts for processing.
*/  

// Example:
const transactions = [100, 'error', 250, null, 300];
const validTransactions = filter_list(transactions);
console.log(validTransactions); // Output: [100, 250, 300]

/*
4. Generating Statistics
 When computing statistics like averages or sums, you need to ensure that only numeric values are included in the calculations.
*/ 
// Example:
const scores = [85, 'N/A', 90, 78, 'missing', 88];
const validScores = filter_list(scores);
const averageScore = validScores.reduce((a, b) => a + b, 0) / validScores.length;
console.log(averageScore); // Output: 85.25

/*
5. Filtering Sensor Data
// In IoT applications, sensor readings might be mixed with error messages or invalid data points. 
Filtering these out ensures that only valid readings are analyzed.
*/ 
// Example:
const sensorReadings = [23.5, 'error', 24.1, 25.0, 'offline', 22.9];
const validReadings = filter_list(sensorReadings);
console.log(validReadings); // Output: [23.5, 24.1, 25.0, 22.9]

/*
6. Preparing Data for Machine Learning
In machine learning preprocessing, it’s important to filter out non-numeric features from the dataset to ensure that only relevant 
numerical data is used for model training.
*/ 

// Example:
const dataset = [3.5, 'string', 2.1, 'text', 4.8];
const filteredDataset = filter_list(dataset);
// Use filteredDataset for training a model
console.log(filteredDataset); // Output: [3.5, 2.1, 4.8]


// -------------------------------------------------------------------------------------------------------------
// The firstNonConsecutive function is designed to find the first non-consecutive number in a sorted array of integers.
function firstNonConsecutive (arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] + 1 !== arr[i]) return arr[i];
    }
    return null;
}
console.log(firstNonConsecutive([1, 2, 2, 3, 4, 4, 5])); //2
/*
Real-World Application: Analyzing Sequential Data

Imagine you are processing a sequence of timestamps or IDs that should follow consecutively, such as in an event log or a list of user IDs.
Example Scenario

    Event Log Entries:
        You have an array representing event sequence numbers: [1001, 1002, 1003, 1005, 1006].
        You want to identify the first missing event number.

    Using firstNonConsecutive:
        You can apply the function to find the first non-consecutive event number.
*/
const eventNumbers = [1001, 1002, 1003, 1005, 1006];
const missingEvent = firstNonConsecutive(eventNumbers);
console.log(missingEvent); // Output: 1005
// ------------------------------------------------------------------------------------------------------------
// Split a String into an Array Using the split Method
function splitify(str) {
  
  return str.split(/\W/);
  
}

console.log(splitify("Hello World,I-am code")); //[ 'Hello', 'World', 'I', 'am', 'code' ]
// -----------------------------------------------------------------------------------------------------------------

//program to filter out the non-unique values in an array.
const filter_Non_Unique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

console.log(filter_Non_Unique([1, 2, 2, 3, 4, 4, 5]));  // Outputs: [1, 3, 5]
console.log(filter_Non_Unique([1, 2, 3, 4]));            // Outputs: [1, 2, 3, 4]  

/* The function filters an array to return only the elements that are unique (i.e., appear exactly once).
    It checks each element's first occurrence (indexOf) against its last occurrence (lastIndexOf). If they are the same, the element is unique.

 Example Scenario
Context: Product Inventory Management

    Inventory List:
        A retail store maintains a list of product IDs in its inventory. Each ID represents a unique product. However, due to various reasons (returns, restocking, etc.), some IDs may appear multiple times.

    Objective:
        The store manager wants to identify which products are truly unique in the inventory to ensure they are listed correctly for sales and stock tracking.
*/
const productIDs = [101, 202, 202, 303, 404, 404, 505];

const uniqueProducts = filter_Non_Unique(productIDs);
console.log(uniqueProducts);  // Outputs: [101, 303, 505]

/*
Explanation of Output

    Input IDs:
        The input array [101, 202, 202, 303, 404, 404, 505] contains product IDs where 202 and 404 are duplicates.

    Filtered Unique IDs:
        After applying the filter_Non_Unique function, we get [101, 303, 505].
        These IDs are unique, meaning they only appear once in the inventory list.

Real-World Application

    Stock Management: The output can be used to generate reports for stock availability, ensuring only unique items are considered for sales.
    Sales Reporting: Unique product IDs can be prioritized in sales reports to analyze which products are not duplicated in stock.
    Inventory Audits: During inventory audits, focusing on unique IDs helps to streamline the verification process, reducing confusion over duplicates.
*/

// =========================================================================================================================================================

const LinkedList = require("../util/LinkedListX");

function removeDuplicates(list) {
    const seenValues = new Set();
    let currentNode = list.head;
    let previousNode = null;

    while (currentNode) {
        if (seenValues.has(currentNode.value)) {
            // Duplicate found; remove it from the list
            previousNode.next = currentNode.next;
            currentNode.next = null; // Clean up reference
        } else {
            // Add value to the set and move previous pointer
            seenValues.add(currentNode.value);
            previousNode = currentNode;
        }
        currentNode = currentNode.next; // Move to the next node
    }

    return list;
}

// Example usage in a real-world application: cleaning up user input
function cleanUserInput(inputArray) {
    const uniqueList = new LinkedList();
    inputArray.forEach(item => uniqueList.append(item));
    return removeDuplicates(uniqueList)._toArray();
}

// Quick test
const userInput = [1, 5, 1, 6, 8, 6, 8, 8, 8, 8];
const cleanedInput = cleanUserInput(userInput);
console.log(cleanedInput); // Output: [1, 5, 6, 8]

/*
Real-World Application Example
Use Case: Cleaning User Input

In applications where user input is collected (e.g., survey responses, user preferences), duplicates can often arise. 
For example, when users submit their favorite items, they might accidentally select the same item multiple times. This could 
skew results or create unnecessary redundancy in a database.

By using the removeDuplicates function, we can ensure that we only store unique items. This is crucial for data integrity and can help in:

    Surveys: Ensuring unique responses.
    Shopping Carts: Preventing the same item from being added multiple times.
    User Preferences: Maintaining a clean list of chosen options.
*/
// A survey example
// Node class for the linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// LinkedList class to manage survey responses
class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Method to convert linked list to array for easy testing and output
    _toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }
}

// Function to remove duplicates from a linked list
function removeDuplicates(list) {
    const seenValues = new Set();
    let currentNode = list.head;
    let previousNode = null;

    while (currentNode) {
        if (seenValues.has(currentNode.value)) {
            // Duplicate found; remove it from the list
            previousNode.next = currentNode.next;
            currentNode.next = null; // Clean up reference
        } else {
            // Add value to the set and move previous pointer
            seenValues.add(currentNode.value);
            previousNode = currentNode;
        }
        currentNode = currentNode.next; // Move to the next node
    }

    return list;
}

// Function to clean user input from an array
function cleanUserInput(inputArray) {
    const uniqueList = new LinkedList();
    inputArray.forEach(item => uniqueList.append(item));
    return removeDuplicates(uniqueList)._toArray();
}

// Example usage
const surveyResponses = [
    "Alice",
    "Bob",
    "Alice", // Duplicate
    "Charlie",
    "Bob",   // Duplicate
    "David"
];

const cleanedResponses = cleanUserInput(surveyResponses);
console.log(cleanedResponses); // Output: [ 'Alice', 'Bob', 'Charlie', 'David' ]


